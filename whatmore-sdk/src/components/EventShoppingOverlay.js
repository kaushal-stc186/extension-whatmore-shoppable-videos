import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { getGlobalState, setGlobalState, useGlobalState } from '../globals/useAppState_APP.js';
import AppMuteUnmuteIcon from './commons/AppMuteUnmuteIcon.js';
import ProductTileV1 from './product-tiles/ProductTileV1.js';
import CrossIcon from '../icons/icon-components/CloseIcon.jsx';
import { FlatList, Dimensions } from 'react-native';

// Dependency-free horizontal product pager (replaces react-native-swiper):
// full-width pages, 4s autoplay that stops at the last product or on touch.
function ProductPager({ products, renderProduct }) {
    const [layoutWidth, setLayoutWidth] = React.useState(Dimensions.get('window').width);
    const listRef = React.useRef(null);
    const indexRef = React.useRef(0);
    const pausedRef = React.useRef(false);

    React.useEffect(() => {
        if (products.length < 2) return;
        const timer = setInterval(() => {
            if (pausedRef.current) return;
            const next = indexRef.current + 1;
            if (next >= products.length) return;
            indexRef.current = next;
            listRef.current?.scrollToIndex({ index: next, animated: true });
        }, 4000);
        return () => clearInterval(timer);
    }, [products.length]);

    return (
        <View style={{ flex: 1 }} onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}>
            <FlatList
                ref={listRef}
                data={products}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => String(i)}
                getItemLayout={(_, index) => ({ length: layoutWidth, offset: layoutWidth * index, index })}
                renderItem={({ item, index }) => (
                    <View style={{ width: layoutWidth }}>{renderProduct(item, index)}</View>
                )}
                onTouchStart={() => { pausedRef.current = true; }}
                onMomentumScrollEnd={(e) => {
                    indexRef.current = Math.round(e.nativeEvent.contentOffset.x / layoutWidth);
                }}
            />
        </View>
    );
}

export default function EventShoppingOverlay(props) {
    var event = props.event;
    return (
        <View
            style={{
                width: '100%', height: '100%',
                flex: 1, flexDirection: 'column',
                justifyContent: 'flex-start', alignItems: 'center'
            }}
        >
            {/* <Text style={{fontSize: 20, fontWeight: 'bold'}}> ABCD </Text> */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                paddingTop: 10,
            }}>
                <TouchableOpacity onPress={() => props.setIsModalOpen(false)} style={{ paddingLeft: 20 }}>
                    <CrossIcon />
                </TouchableOpacity>

                <AppMuteUnmuteIcon />
            </View>
            <View
                style={{
                    width: '100%',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent'
                }}
            >
                {/* Plain View, NO touch handlers, NO pointerEvents override — this
                    exact configuration is load-bearing:
                    - a Touchable here claims the responder → pager can't swipe
                    - raw onTouch* handlers (Fabric) → same effect
                    - pointerEvents="none" → touches fall through to the native
                      video view, which eats them → pager can't swipe AND the
                      native player controls appear
                    A bare View feeds touches into the RN responder chain where
                    the pager FlatList can claim the drag. Mute lives on the
                    AppMuteUnmuteIcon in the top bar. */}
                <View style={{ width: '100%', flex: 1 }} />
                <View
                    style={{
                        // width must be explicit: parent centers children, and the
                        // pager inside sizes to its container — without this the
                        // two resolve each other to 0 and the card vanishes
                        width: '100%',
                        height: 180,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10
                    }}
                >
                    <ProductPager
                        products={event.products}
                        renderProduct={(product, index) => (
                           <ProductTileV1 setIsModalOpen={props.setIsModalOpen} key={index} onAction={props.onAction} event={event} product={product} />
                        )}
                    />
                </View>
            </View>
        </View>
    );

}