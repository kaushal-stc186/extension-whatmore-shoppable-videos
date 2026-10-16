import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ChevronUpIcon from '../../icons/icon-components/ChevronUp';
import ChevronDownIcon from '../../icons/icon-components/ChevronDown';
import { getPriceStringWithCurrency } from '../../utils/PriceUtils';

// Collapsible product drawer over the bottom of a video tile (web-neo
// "productDrawer" parity). Collapsed: a pill with the first product
// thumbnails + an expand chevron. Expanded: a translucent panel listing
// product rows (thumb / title / price) with a collapse chevron.
// Look comes from `tileSkin` (skins/productTiles.js); the carousel `skin`
// only contributes behaviour knobs (drawerMaxRows).
// Owns its expanded state so the carousel's renderItem stays memoizable;
// auto-collapses whenever the tile leaves the viewport.
export default function ProductDrawer({ products, skin, tileSkin, fontFamily, fontSize, scale = 1, active, onRowPress }) {
    const [expanded, setExpanded] = React.useState(false);
    React.useEffect(() => { if (!active) setExpanded(false); }, [active]);

    const items = (products || []).filter(p => p?.title);
    if (items.length === 0) return null;

    const s = tileSkin.styles;
    const font = { fontSize: fontSize * 0.5 * scale, fontFamily };
    const maxRows = skin.drawerMaxRows ?? 4;
    const rows = items.slice(0, maxRows);
    // skins are authored at scale 1 (~320dp-wide tile); sz() shrinks their
    // fixed metrics in step with the tile so the overlay never dwarfs a small
    // tile. Overrides touch SIZE/INSET metrics only — colors, borders and the
    // panel's own look stay whatever the skin says.
    const sz = (n) => Math.round(n * scale);

    if (!expanded) {
        return (
            <TouchableOpacity
                style={[s.drawerPill, { bottom: sz(12), padding: sz(4), paddingRight: sz(10) }]}
                onPress={() => setExpanded(true)}
                activeOpacity={0.85}>
                {items.slice(0, 2).map((p, i) => (
                    <Image
                        key={i}
                        source={{ uri: p.thumbnail_image }}
                        style={[
                            s.drawerPillThumb,
                            { width: sz(36), height: sz(36), borderRadius: sz(18) },
                            i > 0 && { marginLeft: sz(-14) },
                        ]}
                    />
                ))}
                <View style={s.drawerPillChevron}>
                    <ChevronUpIcon width={sz(20)} height={sz(20)} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[s.drawerPanel, { bottom: sz(12), left: sz(12), right: sz(12) }]}>
            {rows.map((p, i) => {
                const price = Math.round(+p?.price);
                return (
                    <TouchableOpacity
                        key={i}
                        style={[s.drawerRow, i > 0 && s.drawerRowSeparator]}
                        onPress={() => onRowPress?.(p)}
                        activeOpacity={0.7}>
                        <Image source={{ uri: p.thumbnail_image }} style={[s.drawerRowThumb, { width: sz(36), height: sz(36) }]} />
                        <View style={{ flex: 1, gap: 2 }}>
                            <Text style={[s.drawerRowTitle, font]} numberOfLines={1} ellipsizeMode="tail">
                                {p.title}
                            </Text>
                            {!isNaN(price) &&
                                <Text style={[s.drawerRowPrice, font]} numberOfLines={1}>
                                    {getPriceStringWithCurrency(price, " ", p?.currency)}
                                </Text>}
                        </View>
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity style={s.drawerCollapse} onPress={() => setExpanded(false)} activeOpacity={0.85}>
                <ChevronDownIcon width={sz(20)} height={sz(20)} />
            </TouchableOpacity>
        </View>
    );
}
