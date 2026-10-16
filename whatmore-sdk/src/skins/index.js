import { StyleSheet } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// CAROUSEL SKINS
//
// A skin is a self-contained style/layout object — the RN analogue of the web
// widget's per-skin CSS file. The tile engine (EventTileWithProduct) renders
// every element and each skin decides geometry, placement and look.
//
// ADD A NEW SKIN = add one entry to SKINS below. No engine changes needed.
//
// Shape (all fields optional except key/label):
//   key, label
//   tileWidthFactor    fraction of screen width for one tile
//   sizingMode         'height' (default: videoTileSize knob drives height) |
//                      'width'  (tileWidthFactor drives width; height derived —
//                      FALLBACK only: a merchant-set videoTileSize still wins)
//   snapToCenter       center-snap paging with neighbours peeking at the edges
//   aspectRatio        media width/height (0.5625 = 9:16 portrait)
//   borderRadius       media corner radius (px)
//   productPlacement   'below' | 'overlay' | 'drawer' | 'none'
//   infoHeight         reserved px below the media for 'below' placement
//   drawerMaxRows      max product rows in the expanded drawer
//   showTitle / showPrice / showComparePrice   element visibility
//   styles: { info, title, price, comparePrice, badge, badgeText, scrim }
//
// The drawer's LOOK lives in the separate product-tile skin registry
// (./productTiles.js, selected via customStyles.productTileSkin) so carousel
// geometry and product-tile styling compose independently.
//
// Two-tier theming (web parity): merchant "brand" knobs (brandThemeColor,
// fontSize, fontFamily) are layered ON TOP of these skin defaults at runtime,
// so the brand override always wins. Skins carry the look; knobs re-theme it.
// ─────────────────────────────────────────────────────────────────────────────

const standard = {
    key: 'standard',
    label: 'Standard',
    tileWidthFactor: 0.33,
    aspectRatio: 0.5625,
    borderRadius: 0,
    productPlacement: 'below',
    infoHeight: 52,
    showTitle: true, showPrice: true, showComparePrice: true,
    styles: StyleSheet.create({
        info: { paddingTop: 10, gap: 4 },
        title: { color: '#1a1a1a', fontWeight: '400' },
        price: { color: '#1a1a1a', fontWeight: 'bold' },
        comparePrice: { color: '#808191', textDecorationLine: 'line-through' },
        badge: { alignSelf: 'flex-start', borderRadius: 3, paddingVertical: 2.5, paddingHorizontal: 4 },
        badgeText: { color: '#ffffff', fontWeight: '600' },
    }),
};

// Product info floats in a raised white card overlapping the video's bottom.
const card = {
    key: 'card',
    label: 'Product Card',
    tileWidthFactor: 0.42,
    aspectRatio: 0.5625,
    borderRadius: 0,
    productPlacement: 'below',
    infoHeight: 86,
    showTitle: true, showPrice: true, showComparePrice: true,
    styles: StyleSheet.create({
        info: {
            marginTop: -22, marginHorizontal: 8, padding: 10, gap: 4,
            backgroundColor: '#ffffff', borderRadius: 14,
            shadowColor: '#000', shadowOpacity: 0.12,
            shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 4,
        },
        title: { color: '#1a1a1a', fontWeight: '600' },
        price: { color: '#1a1a1a', fontWeight: 'bold' },
        comparePrice: { color: '#9a9aa5', textDecorationLine: 'line-through' },
        badge: { alignSelf: 'flex-start', borderRadius: 4, paddingVertical: 2.5, paddingHorizontal: 6 },
        badgeText: { color: '#ffffff', fontWeight: '700' },
    }),
};

// Product info sits over the video on a dark scrim; discount pill top-left.
const overlay = {
    key: 'overlay',
    label: 'Overlay',
    tileWidthFactor: 0.46,
    aspectRatio: 0.5625,
    borderRadius: 0,
    productPlacement: 'overlay',
    infoHeight: 0,
    showTitle: true, showPrice: true, showComparePrice: false,
    styles: StyleSheet.create({
        scrim: {
            position: 'absolute', left: 0, right: 0, bottom: 0,
            paddingHorizontal: 10, paddingTop: 26, paddingBottom: 10, gap: 2,
            backgroundColor: 'rgba(0,0,0,0.45)',
        },
        title: { color: '#ffffff', fontWeight: '600' },
        price: { color: '#ffffff', fontWeight: 'bold' },
        comparePrice: { color: '#e0e0e0', textDecorationLine: 'line-through' },
        badge: { position: 'absolute', top: 8, left: 8, borderRadius: 4, paddingVertical: 3, paddingHorizontal: 6 },
        badgeText: { color: '#ffffff', fontWeight: '700' },
    }),
};

// One large center-snapped tile with neighbours peeking; products live in a
// collapsible drawer over the media (web-neo "focused" + productDrawer look).
const focused = {
    key: 'focused',
    label: 'Focused',
    tileWidthFactor: 0.78,
    sizingMode: 'width',
    snapToCenter: true,
    aspectRatio: 0.5625,
    borderRadius: 16,
    productPlacement: 'drawer',
    infoHeight: 0,
    drawerMaxRows: 4,
    showTitle: true, showPrice: true, showComparePrice: false,
    styles: StyleSheet.create({
        title: { color: '#1a1a1a', fontWeight: '500' },
        price: { color: '#1a1a1a', fontWeight: '700' },
        comparePrice: { color: '#808191', textDecorationLine: 'line-through' },
        badge: { position: 'absolute', top: 8, left: 8, borderRadius: 4, paddingVertical: 3, paddingHorizontal: 6 },
        badgeText: { color: '#ffffff', fontWeight: '700' },
    }),
};

const SKINS = { standard, card, overlay, focused };

// 'default'/absent → standard (web parity: skin "a" is the default look)
export function resolveSkin(key) {
    if (!key || key === 'default') return SKINS.standard;
    return SKINS[key] || SKINS.standard;
}

export const SKIN_KEYS = Object.keys(SKINS);

export default SKINS;
