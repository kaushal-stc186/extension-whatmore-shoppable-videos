
import { getGlobalState, setGlobalState } from "../../globals/useAppState_APP.js";
import { isAppBrew, isAppMaker, isPlobalApps } from "../partners/PartnerUtils.js";
import { appbrewNavigateToProductPageCommand } from "../partners/appbrew/AppbrewCommands.js";

function handleClick(product, props){
    // keep the reels modal open while the product page presents (Appmaker's
    // product screen renders above the RN Modal) so Android back returns INTO
    // the fullscreen view, not the carousel. Pause the video/audio so it doesn't
    // keep playing behind the product page — EventsVerticalSwipeView resumes it
    // on return.
    setGlobalState('pausedForNavigation', true);
    props.onAction({
        action: "OPEN_PRODUCT",
        params:{
            productId: 'gid://shopify/Product/' + product.client_product_id
        }
    })
}

export async function navigateToProductPage(product, brandDomainContext, whatmoreShopId, props, navigation) {
    const _ACTIVATE_MOCK_ = getGlobalState("activateMock");
    if (_ACTIVATE_MOCK_) {
        return Promise.resolve(true);
    }

    if(isAppBrew(brandDomainContext)){
        return await appbrewNavigateToProductPageCommand(product, whatmoreShopId);
    }

    if(isAppMaker(brandDomainContext)){
        return handleClick(product, props);
    }
    else {
        const parts = product?.product_link?.split('/');
        const sku = parts?.[parts?.length - 1];
        if(!sku)
            return;
        // navigation is host-owned: prefer an explicitly passed navigator
        // (legacy callers), else the host's commandsObject — the SDK itself
        // carries no navigation dependency
        const commands = getGlobalState('commandsObject');
        if (navigation?.navigate) {
            navigation.navigate('ProductDetail', { url: sku });
        } else if (commands?.navigate) {
            commands.navigate({ screen: 'ProductDetail', params: { url: sku } });
        }
        props.setIsModalOpen(false);
    }
    return Promise.resolve(false);
}