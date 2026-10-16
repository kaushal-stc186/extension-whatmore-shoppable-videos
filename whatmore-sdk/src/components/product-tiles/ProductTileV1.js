import { getGlobalState } from '../../globals/useAppState_APP.js';
import { Image, Text} from 'react-native';
import ProductPriceBadge from './ProductPriceBadge.js';

import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import useAddToCartStates from '../../hooks/useAddToCartStates.js';
import ShopNow from '../cta-buttons/ShopNowButton.jsx';
import { navigateToProductPage } from '../../api/navigation-commands/NavigationCommands.js';
import { resolveProductTileSkin } from '../../skins/productTiles.js';

export default function ProductTileV1(props) {
    // navigation flows through the host via commandsObject / onAction —
    // the SDK carries no navigation library of its own
    const tileScale = useRef(new Animated.Value(1)).current;
    const event = props.event;
    const product = props.product;
    const [tileTapAnimate, setTileTapAnimate] = useState(false);
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const brandDomainContext = getGlobalState('brandDomainContext');
    const whatmoreShopId = getGlobalState('whatmoreShopId');
    const customStyles= getGlobalState('customStyles');
    const PRODUCT_TILE_TOTAL_HEIGHT = Dimensions.get('window').height * 0.2;
    const BASE_FONT_SIZE = customStyles?.fontSize ?? 20;
    const fontFamily = customStyles?.fontFamily ?? whatmorePrimaryFont
    // surface look (card/info/CTA backgrounds) comes from the product tile skin
    const fs = resolveProductTileSkin(customStyles?.productTileSkin).fullscreen;

    useEffect(() => {
        if(tileTapAnimate){
            // 1 → 0.9 → 1 pulse, ~100ms total (same as the old Animatable keyframes)
            Animated.sequence([
                Animated.timing(tileScale, { toValue: 0.9, duration: 50, useNativeDriver: true }),
                Animated.timing(tileScale, { toValue: 1, duration: 50, useNativeDriver: true }),
            ]).start();
            setTimeout(() => {
                setTileTapAnimate(false);
            }, 1000);
        }
    }, [tileTapAnimate]);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setTileTapAnimate(true);
                navigateToProductPage(product, brandDomainContext, whatmoreShopId, props);
            }}
        >
            <Animated.View
                style={[{
                    transform: [{ scale: tileScale }],
                    width: '85%', // Adjust width as needed, e.g., '80%'
                    alignSelf: 'center',
                     height: 'auto',
                    flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
                    shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width: 0, height: 0},
                    shadowRadius: 20, elevation: 2
                }, fs.card]}
            >
            <View
                style={[{
                    width: '100%', height: 'auto',
                    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                }, fs.infoRow]}
            >
                <Image
                    style={[{
                        width: 120, height: 120
                    }, fs.image]}
                    source={{
                        uri: product.thumbnail_image,
                    }}
                >

                </Image>
                <View

                    style={{
                        width: '100%', height: 'auto',
                        maxWidth: '100%',
                        flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
                        paddingLeft: 10, paddingRight: 10, overflow: 'hidden',flex: 1, flexWrap: 'wrap'
                    }}
                >
                    <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={[{

                            fontWeight: 'normal',
                            fontFamily: fontFamily,
                            fontSize: BASE_FONT_SIZE * 0.8,
                            overflow: 'hidden',

                        }, fs.title]}
                    >
                    {product.title.toString()}
                    </Text>
                    
                    <View
                        style={{
                            height: 10, width: 'auto'
                        }}
                    ></View>

                    <ProductPriceBadge fontFamily={fontFamily} product={product} event={event} fontSize={BASE_FONT_SIZE * 0.75} color={'black'} /> 
                </View>


            </View>

            <View
                style={[{
                    width: '100%', height: 'auto',
                    overflow: 'hidden'
                }, fs.ctaWrap]}

            >

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ShopNow
                        height={PRODUCT_TILE_TOTAL_HEIGHT * 0.28}
                        fontSize={BASE_FONT_SIZE}
                        fontFamily={fontFamily}
                        ctaStyle={fs.ctaButton}
                        ctaTextStyle={fs.ctaText}
                    />
                </View>
            </View>            
            </Animated.View>
        </TouchableWithoutFeedback>
    );
                                    
}