import { getGlobalState } from "../../../globals/useAppState_APP";
import { getProductHandle } from "../../../utils/ProductUtils";


export async function appbrewNavigateToProductPageCommand(product, whatmoreShopId){
    const appbrewCommands = getGlobalState("commandsObject");
    if(appbrewCommands && appbrewCommands.navigate){
        appbrewCommands.navigate({
            kind: 'screen',
            screenId: 'product',
            options: {
                productHandle: getProductHandle(product)
            }
        });
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

export async function appbrewAddToCartCommand(productVariantId, itemQuantity, product, whatmoreShopId){
    const appbrewCommands = getGlobalState("commandsObject");
    if(appbrewCommands && appbrewCommands.addToCart){
        appbrewCommands.addToCart(productVariantId,itemQuantity);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}