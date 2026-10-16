import { StyleSheet } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT TILE SKINS
//
// Second, independent skin registry: styles the product surfaces drawn OVER
// the media (today: the collapsible ProductDrawer pill/panel), while
// skins/index.js owns carousel geometry. The two compose freely — any
// carousel skin can pair with any product tile skin (web-neo parity: the
// drawer is a registry component, skins only restyle it).
//
// ADD A NEW TILE SKIN = add one entry to PRODUCT_TILE_SKINS. No engine changes.
//
// Note on "glass": true background blur needs a native module (expo-blur /
// react-native-blur) in every client host app — the glass look here is
// approximated with translucency + hairline light borders instead, so the
// SDK stays free of native dependencies.
// ─────────────────────────────────────────────────────────────────────────────

// iOS-style translucent glass over the video (web-neo drawer look).
const glass = {
    key: 'glass',
    label: 'Glass',
    styles: StyleSheet.create({
        drawerPill: {
            position: 'absolute', bottom: 12, alignSelf: 'center',
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: 'rgba(240,240,242,0.78)',
            borderRadius: 999, padding: 4, paddingRight: 10,
            borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.65)',
        },
        drawerPillThumb: {
            width: 36, height: 36, borderRadius: 18,
            borderWidth: 2, borderColor: 'rgba(255,255,255,0.9)',
            backgroundColor: 'rgba(255,255,255,0.6)',
        },
        drawerPillThumbOverlap: { marginLeft: -14 },
        drawerPillChevron: { marginLeft: 6 },
        drawerPanel: {
            position: 'absolute', bottom: 12, left: 12, right: 12,
            backgroundColor: 'rgba(238,238,240,0.80)',
            borderRadius: 16, paddingTop: 2,
            borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.6)',
        },
        drawerRow: {
            flexDirection: 'row', alignItems: 'center', gap: 10,
            paddingHorizontal: 12, paddingVertical: 9,
        },
        drawerRowSeparator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(60,60,67,0.29)' },
        drawerRowThumb: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.7)' },
        drawerRowTitle: { color: '#111111', fontWeight: '600' },
        drawerRowPrice: { color: '#111111', fontWeight: '700' },
        drawerCollapse: { alignItems: 'center', paddingVertical: 6 },
    }),
    // fullscreen shopper's product tile (ProductTileV1)
    fullscreen: StyleSheet.create({
        card: {
            borderRadius: 16, overflow: 'hidden',
            borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.65)',
        },
        infoRow: { backgroundColor: 'rgba(240,240,242,0.80)' },
        ctaWrap: { backgroundColor: 'rgba(240,240,242,0.80)' },
        title: { color: '#111111' },
    }),
};

// Warm opaque card (the original focused-skin drawer look).
const cream = {
    key: 'cream',
    label: 'Cream',
    styles: StyleSheet.create({
        drawerPill: {
            position: 'absolute', bottom: 12, alignSelf: 'center',
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: 'rgba(250,247,240,0.85)',
            borderRadius: 999, padding: 4, paddingRight: 10,
        },
        drawerPillThumb: {
            width: 36, height: 36, borderRadius: 18,
            borderWidth: 2, borderColor: '#ffffff', backgroundColor: '#e8e4dc',
        },
        drawerPillThumbOverlap: { marginLeft: -14 },
        drawerPillChevron: { marginLeft: 6 },
        drawerPanel: {
            position: 'absolute', bottom: 12, left: 12, right: 12,
            backgroundColor: 'rgba(248,244,236,0.94)',
            borderRadius: 14, paddingTop: 2,
        },
        drawerRow: {
            flexDirection: 'row', alignItems: 'center', gap: 10,
            paddingHorizontal: 12, paddingVertical: 8,
        },
        drawerRowSeparator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(0,0,0,0.12)' },
        drawerRowThumb: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#e8e4dc' },
        drawerRowTitle: { color: '#1a1a1a', fontWeight: '500' },
        drawerRowPrice: { color: '#1a1a1a', fontWeight: '700' },
        drawerCollapse: { alignItems: 'center', paddingVertical: 6 },
    }),
    // fullscreen: the original opaque white tile look
    fullscreen: StyleSheet.create({
        card: { borderRadius: 5, overflow: 'hidden' },
        infoRow: { backgroundColor: '#ffffffdd' },
        ctaWrap: { backgroundColor: '#ffffff' },
        title: { color: '#000000' },
    }),
};

// Solid white rounded card with a dark pill CTA (client reference look).
const card = {
    key: 'card',
    label: 'Card',
    styles: StyleSheet.create({
        drawerPill: {
            position: 'absolute', bottom: 12, alignSelf: 'center',
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 999, padding: 4, paddingRight: 10,
            shadowColor: '#000', shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3,
        },
        drawerPillThumb: {
            width: 36, height: 36, borderRadius: 18,
            borderWidth: 2, borderColor: '#f2f2f2', backgroundColor: '#f2f2f2',
        },
        drawerPillThumbOverlap: { marginLeft: -14 },
        drawerPillChevron: { marginLeft: 6 },
        drawerPanel: {
            position: 'absolute', bottom: 12, left: 12, right: 12,
            backgroundColor: '#ffffff',
            borderRadius: 20, paddingTop: 2,
            shadowColor: '#000', shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 4,
        },
        drawerRow: {
            flexDirection: 'row', alignItems: 'center', gap: 10,
            paddingHorizontal: 12, paddingVertical: 9,
        },
        drawerRowSeparator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(0,0,0,0.10)' },
        drawerRowThumb: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f2f2f2' },
        drawerRowTitle: { color: '#111111', fontWeight: '600' },
        drawerRowPrice: { color: '#111111', fontWeight: '700' },
        drawerCollapse: { alignItems: 'center', paddingVertical: 6 },
    }),
    fullscreen: StyleSheet.create({
        card: { backgroundColor: '#ffffff', borderRadius: 24, overflow: 'hidden' },
        // metrics sized to the fullscreen overlay's fixed 180px tile slot;
        // even 12px rhythm, title TOP-ALIGNED with the image (reference look) —
        // flex-start + row paddingTop instead of the engine's centered row
        infoRow: { backgroundColor: '#ffffff', alignItems: 'flex-start', paddingTop: 12 },
        ctaWrap: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingBottom: 12 },
        title: { color: '#111111', fontWeight: '600' },
        // 12+88+12 row + ~45 CTA + 12 pad = ~169, inside the slot's 170 usable px
        image: { width: 88, height: 88, borderRadius: 14, marginLeft: 12, marginBottom: 12 },
        ctaButton: { backgroundColor: '#2b2b2b', borderRadius: 16 },
        ctaText: { color: '#ffffff', fontWeight: '700', letterSpacing: 1 },
    }),
};

const PRODUCT_TILE_SKINS = { glass, cream, card };

// 'default'/absent → cream: the pre-skin look, so existing clients see no
// change on upgrade. New looks (glass/card) are explicit dashboard opt-ins.
export function resolveProductTileSkin(key) {
    if (!key || key === 'default') return PRODUCT_TILE_SKINS.cream;
    return PRODUCT_TILE_SKINS[key] || PRODUCT_TILE_SKINS.cream;
}

export const PRODUCT_TILE_SKIN_KEYS = Object.keys(PRODUCT_TILE_SKINS);

export default PRODUCT_TILE_SKINS;
