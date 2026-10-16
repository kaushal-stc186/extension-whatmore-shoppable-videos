import { getGlobalState } from "../../globals/useAppState_APP";
import { isAppBrew, isAppMaker, isPlobalApps } from "../partners/PartnerUtils.js";
import { appbrewAddToCartCommand } from "../partners/appbrew/AppbrewCommands";

/**
 * 
 * @param {*} variantId 
 * @param {*} itemQuantity 
 * @param {*} product 
 * @param {*} brandDomainContext 
 * @param {*} whatmoreShopId 
 * @returns Promise => true if command is executed successfully, false otherwise
 */
export async function addToCartCommand(variantId, itemQuantity, product, brandDomainContext, whatmoreShopId){
    const _ACTIVATE_MOCK_ = getGlobalState("activateMock");

    if(_ACTIVATE_MOCK_){
        return Promise.resolve(true);
    }

    if(isAppBrew(brandDomainContext)){
        return await appbrewAddToCartCommand(variantId, itemQuantity, product, whatmoreShopId);
    }

    return Promise.resolve(false);
}
