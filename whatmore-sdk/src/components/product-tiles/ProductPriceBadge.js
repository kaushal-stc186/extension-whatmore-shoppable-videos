import * as React from 'react';
import { useGlobalState } from '../../globals/useAppState_APP.js';
import { Text, View } from 'react-native';
import { getPriceStringWithCurrency } from '../../utils/PriceUtils.js';

export default function ProductPriceBadge(props) {
    const event = props.event;
    const product = props.product;
    const fontSize = props.fontSize;
    const color = props.color;

    return (
        <View
            style={{
                width: 'auto', height: 'auto',
                backgroundColor: '#00000022',
                flexDirection: 'row', 
                justifyContent: 'space-between', alignItems: 'center',
                borderRadius: 20, overflow: 'hidden',
                paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5
            }}
        >
            <Text
                numberOfLines={1} 
                style={{
                    fontWeight: 'bold',
                    fontSize: fontSize,
                    fontFamily: props.fontFamily,
                    color: color
                }}
            >
                {getPriceStringWithCurrency(product.price, "",product.currency ?? "INR")}
            </Text>
            <Text
                numberOfLines={1} 
            >
                {'    '}
            </Text>
            <Text
                numberOfLines={1} 
                style={{
                    fontWeight: 'normal',
                    fontFamily: props.fontFamily,
                    textDecorationLine: 'line-through',
                    fontSize: fontSize
                }}
            >
                {getPriceStringWithCurrency(product.compare_price, "", product.currency ?? "INR")}
            </Text>
            
        </View>
    );
                                    
}