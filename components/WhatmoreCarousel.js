import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// SDK is vendored into this extension (see whatmore-sdk/, synced from
// packages/whatmore-reactnative-sdk) — no npm registry involved
import { WhatmoreBase } from "../whatmore-sdk";
import { getSettings } from '../config.js';

const WhatmoreCarousel = (props) => {
    const settings = getSettings();
    const shopId = settings?.shop_id;
    const customStyles = {
        // look: which carousel skin — 'standard' | 'card' | 'overlay'
        // (default 'standard' when unset). See whatmore-sdk/src/skins.
        skin: settings?.skin,
        // look: product tile / drawer styling — 'glass' | 'cream' | 'card'
        // (default 'cream' = the pre-skin look). See whatmore-sdk/src/skins/productTiles.
        productTileSkin: settings?.productTileSkin,
        // navigation arrows over the carousel — opt-in, hidden by default
        showArrows: settings?.showArrows,
        videoTileSize: settings?.videoTileSize,
        videoTileSpacing: settings?.videoTileSpacing,
        // corner radius for the tiles — when set, overrides the skin's default
        videoTileRadius: settings?.videoTileRadius,
        brandThemeColor: settings?.brandThemeColor,
        showProductDetails: settings?.showProductDetails,
        widgetMarginBottom: settings?.widgetMarginBottom,
        showDiscountLabel: settings?.showDiscountLabel,
        fontSize: settings?.fontSize,
        fontFamily: settings?.fontFamily
    }
    const { attributes, onAction } = props;

    return (
        <View>
            <WhatmoreBase
                shopId={shopId}
                customStyles={customStyles}
                domainContext={'appmaker'}
                commandsObject={{
                navigate: function(_navigateObject: Object){
                    console.debug("CommandsObject " + JSON.stringify(_navigateObject));
                },
                addToCart: function(variantId: string, quantity: number){
                    console.debug("CommandsObject -> " + variantId + " :: " + quantity);
                }
                }}
                template={"template-swipe-a"}
                activateMock={false}
                modalUsed={true}
                onAction={onAction}
            />
        </View>
    );
};

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default WhatmoreCarousel;