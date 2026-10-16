
import getSymbolFromCurrency from './currencySymbols'
import { getGlobalState } from '../globals/useAppState_APP';

function priceWithCommas(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roundedPrice(price){
    // is decimal more than 0.1
    if(price % 1 >= 0.1){
        // if decimal value is more than 0.1 but not significant in that currency
        const priceAsString = price.toString();
        if(priceAsString.split('.')[0].length >= 4){
            return parseInt(price);
        }
        return parseFloat(price)?.toFixed(2);
    }

    return parseInt(price);
}

export function getPriceStringWithCurrency(price, spaceString = "", currencyCode = "INR"){
    if(!price || typeof price == undefined){
        return "";
    }
    const whatmoreShopId = getGlobalState('whatmoreShopId')
    // sanitize: backend sometimes sends the literal strings "undefined"/"null"
    // (truthy, so they'd slip past `|| "INR"` and print verbatim as the symbol)
    const cleanCode = (currencyCode && currencyCode !== 'undefined' && currencyCode !== 'null')
        ? currencyCode : 'INR';
    // trailing ?? keeps the raw code for genuinely unknown real currencies
    const finalCurrency = whatmoreShopId == "68234805419" ? "QAR": (getSymbolFromCurrency(cleanCode) ?? cleanCode ?? "")

    return finalCurrency + spaceString + priceWithCommas(roundedPrice(price));
}