import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView, Dimensions, Animated, Image } from "react-native";
import Video, { ViewType } from 'react-native-video';
import { useState, useRef, useCallback, useMemo } from 'react';
import ChevronRightIcon from '../../icons/icon-components/ChevronRight';
import ChevronLeftIcon from '../../icons/icon-components/ChevronLeft';
import { getGlobalState } from '../../globals/useAppState_APP';
import { getPriceStringWithCurrency } from '../../utils/PriceUtils';
import ShimmerTile from './ShimmerTile';
import ProductDrawer from './ProductDrawer';
import { navigateToProductPage } from '../../api/navigation-commands/NavigationCommands';
import { resolveSkin } from '../../skins';
import { resolveProductTileSkin } from '../../skins/productTiles';
import { padCropLayout } from '../../utils/VideoScaleUtils';

// Cover shown over the video until it actually plays. Prefers the STATIC
// poster image (needs no hardware decoder) so a real thumbnail shows even when
// the video can't start — Android caps concurrent video decoders (~2-4), so
// with 3 tiles autoplaying at mount the later ones would otherwise stall at
// frame 0 and never clear their shimmer ("only first thumbnail renders").
// Shimmer covers only while the poster loads (or when there is no poster).
function TileCover({ poster, width, height }) {
    const [posterReady, setPosterReady] = React.useState(false);
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, width, height, backgroundColor: '#ececf0' }}>
            {poster ? (
                <Image
                    source={{ uri: poster }}
                    resizeMode="cover"
                    onLoad={() => setPosterReady(true)}
                    style={{ width: '100%', height: '100%' }}
                />
            ) : null}
            {!posterReady && (
                <View style={{ position: 'absolute', top: 0, left: 0, width, height }}>
                    <ShimmerTile width={width} height={height} />
                </View>
            )}
        </View>
    );
}

// Per-tile media: keeps the cover ON TOP of the video until playback has
// actually advanced (not merely first-frame-decoded) — otherwise a frozen
// "preview" frame flashes before autoplay kicks in when scrolling.
// Once loaded a tile stays mounted forever (warm): scrolling away only
// PAUSES it (last frame retained), so scrolling back never re-shimmers.
function VideoTile({ uri, poster, width, height, radius, active, children }) {
    const [playing, setPlaying] = React.useState(false);
    // Decoders that ignore the SPS crop rect render macroblock padding down the
    // right/bottom edge. The <Video> box is left EXACTLY as it was so the player's
    // own layout is unperturbed; instead the clipping parent is shrunk by the
    // padding fraction, so the padding simply falls outside the visible tile.
    // (Resizing the video box was tried and measured on device — it does not
    // work, because the player refits its content into whatever box it is given.)
    const [pad, setPad] = React.useState(null);
    const clipW = pad ? Math.round(width * (1 - pad.widthFraction)) : width;
    const clipH = pad ? Math.round(height * (1 - pad.heightFraction)) : height;
    return (
        // rounding must live on the PARENT with overflow:hidden — Android never
        // clips the TextureView to a borderRadius set on the Video itself
        <View style={{ width: clipW, height: clipH, borderRadius: radius, overflow: 'hidden' }}>
            <Video
                source={{ uri }}
                controls={false}
                repeat
                // volume={0} belt-and-braces: Android has cases where `muted`
                // alone still leaks audio on some player states
                muted
                volume={0}
                paused={!active}
                resizeMode={"cover"}
                // muted ambient tiles must not request Android audio focus:
                // simultaneous players otherwise steal focus from each other
                // and every one of them pauses at frame 0
                disableFocus={true}
                // force TextureView (rnv6 viewType / rnv7 surfaceType) — SurfaceView ignores borderRadius+overflow and bleeds into the next tile
                viewType={ViewType?.TEXTURE ?? 0}
                surfaceType="texture"
                progressUpdateInterval={250}
                onLoad={(d) => setPad(padCropLayout(d?.naturalSize?.width, d?.naturalSize?.height))}
                onProgress={(p) => { if (!playing && p?.currentTime > 0.03) setPlaying(true); }}
                // When clipping, absolute + ORIGINAL width/height on purpose: the
                // video box must not shrink with the clip, or the player refits
                // and drags the padding back into view. When not clipping (iOS and
                // every unaffected Android) fall back to the pre-existing style so
                // those devices run exactly the code that shipped in 1.2.1.
                style={pad
                    ? { position: 'absolute', top: 0, left: 0, width, height }
                    : { width: '100%', height: '100%' }}
            />
            {!playing && <TileCover poster={poster} width={width} height={height} />}
            {/* overlay-skin scrim / badge live inside the media (clipped by radius) */}
            {children}
        </View>
    );
}

// Renders title / price / compare / discount for a skin. Placement-agnostic:
// the caller positions the returned block (below the media or as an overlay).
function ProductInfo({ product, skin, fontFamily, fontSize, brandThemeColor, discount, containerStyle }) {
    const price = Math.round(+product?.price);
    const compare_price = Math.round(+product?.compare_price);
    const font = { fontSize: fontSize * 0.5, fontFamily };
    return (
        <View style={containerStyle} pointerEvents="none">
            {skin.showTitle &&
                <Text style={[skin.styles.title, font]} numberOfLines={1} ellipsizeMode="tail">
                    {product?.title}
                </Text>}
            {skin.showPrice &&
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Text style={[skin.styles.price, font]} numberOfLines={1} ellipsizeMode="tail">
                        {getPriceStringWithCurrency(price, " ", product?.currency)}
                    </Text>
                    {skin.showComparePrice && !isNaN(compare_price) && compare_price > price &&
                        <Text style={[skin.styles.comparePrice, font]} numberOfLines={1} ellipsizeMode="tail">
                            {getPriceStringWithCurrency(compare_price, " ", product?.currency)}
                        </Text>}
                </View>}
        </View>
    );
}

function DiscountBadge({ skin, brandThemeColor, fontFamily, fontSize, discount }) {
    if (isNaN(discount) || discount === 0) return null;
    return (
        <View style={[skin.styles.badge, { backgroundColor: brandThemeColor ?? 'green' }]} pointerEvents="none">
            <Text style={[skin.styles.badgeText, { fontSize: fontSize * 0.5, fontFamily }]}>{`${discount}% Off`}</Text>
        </View>
    );
}

// Viewport-aware, skin-driven carousel. The engine renders every element;
// the active skin (customStyles.skin) decides geometry, placement and look.
export default function EventTileWithProduct(props) {
    const { events, setInitialEventIndex, setIsModalOpen } = props;

    const [activeIndex, setActiveIndex] = useState(0);
    // circular carousel: materialise `events` in whole cycles and append another
    // on end-reached, so scrolling past the last tile wraps back to the first.
    // The tile at absolute index i is source event i % events.length.
    const N = events.length;
    const [cycles, setCycles] = useState(1);
    const loopedEvents = useMemo(() => {
        const out = [];
        for (let c = 0; c < cycles; c++) out.push(...events);
        return out;
    }, [events, cycles]);
    // indexes currently >=40% visible in the viewport — only these play video
    const [visibleIndexes, setVisibleIndexes] = useState(() => new Set([0, 1, 2]));

    const { width } = Dimensions.get('window');
    const customStyles = getGlobalState('customStyles');
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const brandDomainContext = getGlobalState('brandDomainContext');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const skin = resolveSkin(customStyles?.skin);
    const tileSkin = resolveProductTileSkin(customStyles?.productTileSkin);
    // arrow navigation is opt-in (hidden by default)
    const showArrows = customStyles?.showArrows === true;

    // merchant corner-radius knob overrides the skin default when set
    const tileRadius = customStyles?.videoTileRadius != null ? Number(customStyles.videoTileRadius) : skin.borderRadius;
    const ITEM_MARGIN = 3 * (customStyles?.videoTileSpacing ?? 3);
    // "Video tile size" drives HEIGHT; WIDTH is derived from it at the skin's
    // media aspect ratio (0.5625 = 9:16) so tiles never stretch. 'width'
    // sizing skins only use tileWidthFactor as the FALLBACK when the merchant
    // hasn't set videoTileSize — a configured size always wins (Jockey sets 8;
    // ignoring it made the focused tile ~1.4× screen width tall and it
    // overflowed the widget frame).
    const aspectRatio = skin.aspectRatio || 0.5625;
    const sizeByWidth = skin.sizingMode === 'width';
    const snapToCenter = skin.snapToCenter === true;
    let ITEM_WIDTH, CARD_HEIGHT;
    if (sizeByWidth && customStyles?.videoTileSize == null) {
        ITEM_WIDTH = Math.round(width * (skin.tileWidthFactor ?? 0.78));
        CARD_HEIGHT = Math.round(ITEM_WIDTH / aspectRatio);
    } else {
        CARD_HEIGHT = Math.round(40 * (customStyles?.videoTileSize ?? 5.5));
        ITEM_WIDTH = Math.round(CARD_HEIGHT * aspectRatio);
    }
    // center-snap needs the neighbours to peek at the edges: hard-cap the tile
    // so no dashboard size can make it swallow the whole viewport width
    if (snapToCenter) {
        const maxItemWidth = Math.round(width * 0.86) - 2 * ITEM_MARGIN;
        if (ITEM_WIDTH > maxItemWidth) {
            ITEM_WIDTH = maxItemWidth;
            CARD_HEIGHT = Math.round(ITEM_WIDTH / aspectRatio);
        }
    }
    const appMarginBottom = customStyles?.widgetMarginBottom ?? 50;

    // center-snap paging (focused skin): one tile centered, neighbours peeking
    const itemOuterWidth = ITEM_WIDTH + 2 * ITEM_MARGIN;
    const sidePadding = snapToCenter ? Math.max(0, (width - itemOuterWidth) / 2) : 0;
    // tiles are drawn TILE_TOP below the widget's top edge; the container must
    // reserve that room too, or the tile's bottom TILE_TOP px (where the
    // product drawer pill sits) render outside the widget frame
    const TILE_TOP = 20;

    // brand knobs (two-tier: these win over skin defaults)
    const brandThemeColor = customStyles?.brandThemeColor;
    const BASE_FONT_SIZE = customStyles?.fontSize ?? 20;
    const fontFamily = customStyles?.fontFamily ?? whatmorePrimaryFont;

    // the drawer pill/panel skins are styled against a ~320dp-wide reference
    // tile; scale their fixed metrics down with the tile so a small
    // videoTileSize doesn't leave a giant overlay swallowing the media
    const drawerScale = Math.min(1, Math.max(0.55, ITEM_WIDTH / 320));

    const showProduct = customStyles?.showProductDetails !== false && skin.productPlacement !== 'none';
    const belowExtra = (showProduct && skin.productPlacement === 'below') ? (skin.infoHeight ?? 52) : 0;

    const flatListRef = useRef(null);

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: TILE_TOP + CARD_HEIGHT + belowExtra + appMarginBottom,
        },
        arrowContainerRight: {
            position: 'absolute', top: '50%', transform: [{ translateY: -30 }],
            right: 0, width: 28, height: 28, marginHorizontal: 5,
        },
        arrowContainerLeft: {
            position: 'absolute', top: '50%', transform: [{ translateY: -30 }],
            width: 28, height: 28, marginHorizontal: 5,
        },
    });

    const handleClick = (index) => {
        setInitialEventIndex(index);
        setIsModalOpen(true);
    };

    const scrollToIndexSafe = (index) => {
        try {
            flatListRef.current?.scrollToIndex({ index, animated: true });
        } catch (e) { /* index not rendered yet — onEndReached will catch up */ }
    };

    const scrollLeft = () => {
        const newIndex = Math.max(0, activeIndex - 2);
        scrollToIndexSafe(newIndex);
        setActiveIndex(newIndex);
    };

    const scrollRight = () => {
        // grow the loop if we're getting close to the tail of what's materialised
        if (activeIndex + 4 >= loopedEvents.length) setCycles(c => c + 1);
        const newIndex = activeIndex + 2;
        scrollToIndexSafe(newIndex);
        setActiveIndex(newIndex);
    };

    // stable refs: FlatList requires viewability callbacks to never change identity
    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40, minimumViewTime: 80 }).current;
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        setVisibleIndexes(new Set(viewableItems.map(v => v.index).filter(i => i != null)));
    }).current;

    const renderItem = useCallback(({ item, index }) => {
        const product = item.products?.[0];
        const price = Math.round(+product?.price);
        const compare_price = Math.round(+product?.compare_price);
        const discount = (compare_price && compare_price !== 0 && compare_price > price)
            ? Math.round(((compare_price - price) / compare_price) * 100) : NaN;
        const isVisible = visibleIndexes.has(index);
        const infoProps = { product, skin, fontFamily, fontSize: BASE_FONT_SIZE, brandThemeColor, discount };

        return (
            <TouchableOpacity
                style={{ height: CARD_HEIGHT, top: TILE_TOP, width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN }}
                onPress={() => handleClick(index % N)}
                key={index}>
                {/* pointerEvents="none": the native video view must never intercept
                    touches, or the parent TouchableOpacity's onPress silently dies */}
                <View pointerEvents="none">
                    <VideoTile uri={item?.thumbnail_image} poster={item?.poster_image} width={ITEM_WIDTH} height={CARD_HEIGHT} radius={tileRadius} active={isVisible}>
                        {/* OVERLAY skin: product info + badge painted over the media */}
                        {showProduct && skin.productPlacement === 'overlay' && (
                            <>
                                <ProductInfo {...infoProps} containerStyle={skin.styles.scrim} />
                                {customStyles?.showDiscountLabel && <DiscountBadge {...infoProps} />}
                            </>
                        )}
                    </VideoTile>
                </View>

                {/* BELOW skin: product info + badge rendered beneath the media */}
                {showProduct && skin.productPlacement === 'below' && (
                    <View style={skin.styles.info}>
                        <ProductInfo {...infoProps} />
                        {customStyles?.showDiscountLabel && <DiscountBadge {...infoProps} />}
                    </View>
                )}

                {/* DRAWER skin: collapsible product pill/panel over the media.
                    Sits OUTSIDE the pointerEvents="none" wrapper so its own
                    touchables work; row tap deep-links to THAT product's page
                    via the host (same path as the fullscreen product tile). */}
                {showProduct && skin.productPlacement === 'drawer' && (
                    <ProductDrawer
                        products={item.products}
                        skin={skin}
                        tileSkin={tileSkin}
                        fontFamily={fontFamily}
                        fontSize={BASE_FONT_SIZE}
                        scale={drawerScale}
                        active={isVisible}
                        onRowPress={(p) => navigateToProductPage(p, brandDomainContext, whatmoreShopId, props)}
                    />
                )}
            </TouchableOpacity>
        );
    }, [visibleIndexes, customStyles, CARD_HEIGHT, ITEM_WIDTH, ITEM_MARGIN, skin, tileSkin, tileRadius, fontFamily, BASE_FONT_SIZE, brandThemeColor, showProduct, N, brandDomainContext, whatmoreShopId]);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                horizontal
                data={loopedEvents}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderItem}
                contentInsetAdjustmentBehavior="never"
                decelerationRate="fast"
                snapToInterval={snapToCenter ? itemOuterWidth : undefined}
                disableIntervalMomentum={snapToCenter}
                contentContainerStyle={snapToCenter ? { paddingHorizontal: sidePadding } : undefined}
                scrollEnabled={true}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                initialNumToRender={4}
                // keep every rendered tile mounted (paused when offscreen) so
                // scrolling back never unmounts → reloads → re-shimmers
                windowSize={21}
                removeClippedSubviews={false}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
                onEndReached={() => { if (N > 0) setCycles(c => c + 1); }}
                onEndReachedThreshold={0.5}
                onMomentumScrollEnd={(e) => {
                    const itemOuterWidth = ITEM_WIDTH + 2 * ITEM_MARGIN;
                    setActiveIndex(Math.max(0, Math.round(e.nativeEvent.contentOffset.x / itemOuterWidth)));
                }}
                ref={flatListRef}
            />
            {showArrows && (
                <>
                    <TouchableOpacity style={styles.arrowContainerLeft} onPress={scrollLeft}>
                        <ChevronLeftIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowContainerRight} onPress={scrollRight}>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
}
