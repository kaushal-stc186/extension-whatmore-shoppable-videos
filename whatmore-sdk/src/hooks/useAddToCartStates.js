import { useRef } from "react";
import { useState } from "react";
import { getGlobalState, setGlobalState, useGlobalState } from "../globals/useAppState_APP";
import { increaseEventProductAddToCartCount } from "../api/whatmore-backend/WhatmoreMetricCommands.js";
import { productDetailsDetailed } from "../api/product-details-commands/ProductDetailsCommands.js";
import { addToCartCommand } from "../api/cart-commands/CartCommands";


/**
 * 
 * @param {*} initialCartCount initial count of product in cart
 * @returns 
 */
function useAddToCartStates(initialCartCount, product, event){
    const whatmoreShopId = getGlobalState('whatmoreShopId');
    const isInDesignMode = getGlobalState('isInDesignMode');
    const isDemoBrand = getGlobalState('isDemoBrand');
    const brandDomainContext = getGlobalState('brandDomainContext');
    
    const [productVariantOptions, setProductVariantOptions] = useState(null);
    const productVariantDetailsRef = useRef(null);

    /**
     * 
     * init -> productVariantDetailsApiCallInProgress -> awaitingVariantSelection -> atcApiCallInProgress -> init(+1)
     *                                                -> errored
     */
    const [cartState, setCartState] = useState(
        {"state" : "init", "cart_count" : initialCartCount}
    );

    function updateCartState(newState, newCartCount){
        setCartState({"state" : newState, "cart_count" : (newCartCount ?? cartState["cart_count"])});

        // disable auto slide according to cart state
        if(!(newState == "init" || newState == "errored")){
            setGlobalState("whatmoreAllowAutoSlide", false);            
        }else{
            setGlobalState("whatmoreAllowAutoSlide", true);
        }
    }

    function _getVariantIdFromSelectedOption(selectedOptions){
        const matchedVariants = productVariantDetailsRef.current.filter(variant => 
            variant.option1 == selectedOptions[0] && variant.option2 == selectedOptions[1] && variant.option3 == selectedOptions[2]);

        if(matchedVariants.length == 0){return null;}
        return matchedVariants[0]['id'];
    }

    function getPriceDetailsFromSelectedOption(selectedOptions){
        const matchedVariants = productVariantDetailsRef.current.filter(variant => 
            variant.option1 == selectedOptions[0] && variant.option2 == selectedOptions[1] && variant.option3 == selectedOptions[2]);

        if(matchedVariants.length == 0){return null;}

        const price = matchedVariants[0]['price'] ?? 0;
        const comparePrice = matchedVariants[0]['compare_at_price'] ?? 0;
        return {
            'price': (price / 100.0),
            'compare_price': (comparePrice / 100.0)
        }
    }

    function _getVariantOptions(result){
        var options1 = [];
        var options2 = [];
        var options3 = [];

        result.variants.forEach(variant => {
            variant.option1 && options1.push({"option" : variant.option1, "available" : variant.available ?? true, "type": result.options[0].name});
            variant.option2 && options2.push({"option" : variant.option2, "available" : variant.available ?? true, "type": result.options[1].name});
            variant.option3 && options3.push({"option" : variant.option3, "available" : variant.available ?? true, "type": result.options[2].name});
        });

        options1 = options1.reduce((result, option, index) => {
            var res = result.filter(_option => _option['option'] == option['option']);
            if(res.length == 0){
                return [...result, option];
            }
            return result;
        }, []);

        options2 = options2.reduce((result, option, index) => {
            var res = result.filter(_option => _option['option'] == option['option']);
            if(res.length == 0){
                return [...result, option];
            }
            return result;
        }, []);

        options3 = options3.reduce((result, option, index) => {
            var res = result.filter(_option => _option['option'] == option['option']);
            if(res.length == 0){
                return [...result, option];
            }
            return result;
        }, []);

        return [options1, options2, options3];
    }

    function _getFirstAvailableOption(options){
        if(options.length == 0){return null;}

        const availableOptions = options.filter(option => option['available']);
        if(availableOptions.length == 0){return null;}

        return availableOptions[0]['option'];
    }

    function _isSingleVariantProduct(variantOptions){
        return variantOptions[0].length <= 1 &&  variantOptions[1].length <= 1 && variantOptions[2].length <= 1;
    }

    function _atleastOneVariantAvailableInStock(){
        if(productVariantDetailsRef.current && productVariantDetailsRef.current.length >= 1){
            const availableVariants = productVariantDetailsRef.current.filter(variant => variant.available);
            return availableVariants.length >= 1;
        }
        return false;
    }

    function initiateVariantSelection(handleAtcCall){
        updateCartState("productVariantDetailsApiCallInProgress", null)
        productDetailsDetailed(product, brandDomainContext, whatmoreShopId)
            .then(result => {
                productVariantDetailsRef.current = result.variants;
                const variantOptions = _getVariantOptions(result);
                setProductVariantOptions(variantOptions);

                if(_isSingleVariantProduct(variantOptions)){
                    if(!_atleastOneVariantAvailableInStock()){
                        updateCartState("errored", null);
                    }else{
                        initiateAtcApiCall([
                            _getFirstAvailableOption(variantOptions[0]), 
                            _getFirstAvailableOption(variantOptions[1]), 
                            _getFirstAvailableOption(variantOptions[2])
                        ], handleAtcCall);
                    }
                }else{
                    updateCartState("awaitingVariantSelection", null);
                }
            })
            .catch(error => {
                updateCartState("errored", null);
            });
    }

    function pushAddToCartMetric(event, product, quantity){
        if(!isInDesignMode && !isDemoBrand){
            (async () => {
                increaseEventProductAddToCartCount(event, product, quantity);
            })();
        }
    }

    function initiateAtcApiCall(selectedOptions){
        const variantId = _getVariantIdFromSelectedOption(selectedOptions);
        if(!variantId){
            updateCartState("init", cartState["cart_count"]);
            return;
        }

        const itemQuantity = 1;

        updateCartState("atcApiCallInProgress", null);

        const res = addToCartCommand(variantId, itemQuantity, product, brandDomainContext, whatmoreShopId);
        res.then((isSuccess) => { 
            if(isSuccess){
                pushAddToCartMetric(event, product, itemQuantity);
                updateCartState("init", cartState["cart_count"] + 1);
                setGlobalState("whatmoreAddedToCart", true);
            }else{
                updateCartState("errored", null);
                console.error('Error while adding to cart:', error);
            }
        })
        .catch((error) => {
            updateCartState("errored", null);
            console.error('Error while adding to cart:', error);
        });
    }

    function initiateAtcCartIconClickAction(){
        return;
    }

    return [cartState, productVariantOptions, initiateVariantSelection, initiateAtcApiCall, getPriceDetailsFromSelectedOption, initiateAtcCartIconClickAction];

}

export default useAddToCartStates;