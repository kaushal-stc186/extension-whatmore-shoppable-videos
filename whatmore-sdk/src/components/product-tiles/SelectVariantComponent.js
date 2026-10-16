import React, { useState } from "react";
import { useEffect } from "react";
import { getGlobalState, useGlobalState } from "../../globals/useAppState_APP";
import { View, Text, TouchableOpacity } from 'react-native';
// import { Divider } from 'react-native-paper';

function SelectVariantComponent(props){
    const product = props.product;
    const event = props.event;
    const productVariantOptions = props.productVariantOptions;
    const width = props.width ?? '100%';
    const height = props.height ?? 'auto';
    const baseFontSize = props.baseFontSize ?? 10;
    const onOptionSelected = props.onOptionSelected;
    const optionTitleColor = props.optionTitleColor ?? "black";

    const isInDesignMode = getGlobalState('isInDesignMode');
    const isDemoBrand = getGlobalState('isDemoBrand');
    const whatmorePrimaryColor = getGlobalState('whatmorePrimaryColor');
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    function _getFirstAvailableOption(options){
        if(options.length == 0){return null;}

        const availableOptions = options.filter(option => option['available']);
        if(availableOptions.length == 0){return null;}

        return availableOptions[0]['option'];
    }

    const [selectedOptions, setSelectedOptions] = useState(
        [
            _getFirstAvailableOption(productVariantOptions[0]),
            _getFirstAvailableOption(productVariantOptions[1]), 
            _getFirstAvailableOption(productVariantOptions[2])
        ]
    );

    useEffect(()=>{
        onOptionSelected(selectedOptions);
    }, [selectedOptions]);

    function _getPaddingForOption(optionName){
        return optionName.length >= 3 ? 0 : (baseFontSize * 0.5);
    }

    return (
        <View style={{flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
            {productVariantOptions.map((options, index) => {
                if(options.length === 0) return null;

                return (
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%'}} key={index}>
                        <View 
                            style={{
                                width: '30%',  height: 2, alignItems: 'center', 
                                backgroundColor: 'gray', marginTop: 10, marginBottom: 10
                        }}></View>
                        <Text
                            style={{
                                fontSize: baseFontSize * 1.2,
                                color: optionTitleColor,
                                fontFamily: whatmorePrimaryFont,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            &nbsp;{options[0]['type']}&nbsp;
                        </Text>
                        <View 
                            style={{
                                flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap',
                                marginTop: 5
                            }}
                        >
                            {options.map(option => (
                                <TouchableOpacity key={option['option']}
                                    style={{
                                        borderRadius: 2,
                                        padding: 2,
                                        backgroundColor: option['option'] === selectedOptions[index] ? whatmorePrimaryColor : 'white',
                                        marginLeft: 5, marginRight: 5
                                    }}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        option['available'] && setSelectedOptions([
                                            index === 0 ? option['option'] : selectedOptions[0],
                                            index === 1 ? option['option'] : selectedOptions[1],
                                            index === 2 ? option['option'] : selectedOptions[2]
                                        ]);
                                    }}
                                >
                                    <Text
                                        style={{
                                            textDecorationLine: option['available'] ? 'none' : 'line-through',
                                            fontSize: baseFontSize,
                                            color: option['available'] ? (option['option'] === selectedOptions[index] ? 'white' : 'black') : 'gray',
                                            fontFamily: whatmorePrimaryFont,
                                            textAlign: 'center',
                                            paddingHorizontal: _getPaddingForOption(option['option'])
                                        }}
                                    >
                                        &nbsp;{option['option']}&nbsp;
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            })}
        </View>
    );

}

export default SelectVariantComponent;