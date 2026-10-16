import { productDetailsShopify, productDetailsShopifyJS } from "../shopify-commands/ShopifyCommands.js";


function _isAppBrew(brandDomainContext){
   return brandDomainContext == "appbrew";
}

function _isAppMaker(brandDomainContext){
   return brandDomainContext == "appmaker";
}

function _isPlobalApps(brandDomainContext){
   return brandDomainContext == "plobalapps";
}

/**
 * 
 * @returns 
 * 
 * {
   "product":{
      "id":6780184559682,
      "title":"Surkh Shibori Cotton Dress",
      "body_html":"\u003cp\u003eBold, beautiful and glamorous, our Surkh Shibori Cotton Dress is perfect for those who like to make a statement wiith their every day style. \u003cbr\u003eColor: Red\/Blue\u003cbr\u003eDress Fabric: Cotton\u003c\/p\u003e\n\u003cp\u003eNeckline: Shirt Collar\u003cbr\u003eSleeve: Balloon\u003cbr\u003eCARE: Dry Clean Only \u003cbr\u003eModel Size: Model is wearing S Size \u003cbr\u003eModel Height: 5'4\"\u003cbr\u003e \u003cbr\u003eDISCLAIMER: Slight Color variations may occur due to different screen resolutions.\u003c\/p\u003e",
      "vendor":"Aachho",
      "product_type":"Dress",
      "created_at":"2022-07-30T14:57:03+05:30",
      "handle":"surkh-shibori-cotton-dress",
      "updated_at":"2023-03-09T18:22:56+05:30",
      "published_at":"2022-08-04T19:05:13+05:30",
      "template_suffix":"",
      "published_scope":"global",
      "tags":"__label:NEW, category_express shipping, category_high, Category_Womenswear, Collection_Dress, Collection_Phulwari, Color_Blue, Color_Red, dress_collection, Fabric_Cotton, High, Neckline_Shirt Collar, OCCASSION_CASUAL, Pattern_Kalidaar, Phulwari, print_tie-\u0026-dye, Sleeves_Balloon, subcategory_dress, Technique_Tie \u0026 Dye",
      "variants":[
         {
            "id":39873050804290,
            "product_id":6780184559682,
            "title":"XS",
            "price":"3250.00",
            "sku":"ACHSSJUL18-XS",
            "position":1,
            "compare_at_price":"3250.00",
            "fulfillment_service":"manual",
            "inventory_management":"shopify",
            "option1":"XS",
            "option2":null,
            "option3":null,
            "created_at":"2022-07-30T14:57:04+05:30",
            "updated_at":"2023-02-22T18:02:08+05:30",
            "taxable":true,
            "barcode":"6814335325661",
            "grams":800,
            "image_id":null,
            "weight":0.8,
            "weight_unit":"kg",
            "requires_shipping":true
         },
         {
            "id":39873050837058,
            "product_id":6780184559682,
            "title":"S",
            "price":"3250.00",
            "sku":"ACHSSJUL18-S",
            "position":2,
            "compare_at_price":"3250.00",
            "fulfillment_service":"manual",
            "inventory_management":"shopify",
            "option1":"S",
            "option2":null,
            "option3":null,
            "created_at":"2022-07-30T14:57:04+05:30",
            "updated_at":"2023-03-09T18:22:56+05:30",
            "taxable":true,
            "barcode":"3565335325661",
            "grams":800,
            "image_id":null,
            "weight":0.8,
            "weight_unit":"kg",
            "requires_shipping":true
         },
         {
            "id":39873050869826,
            "product_id":6780184559682,
            "title":"M",
            "price":"3250.00",
            "sku":"ACHSSJUL18-M",
            "position":3,
            "compare_at_price":"3250.00",
            "fulfillment_service":"manual",
            "inventory_management":"shopify",
            "option1":"M",
            "option2":null,
            "option3":null,
            "created_at":"2022-07-30T14:57:04+05:30",
            "updated_at":"2023-03-04T13:05:45+05:30",
            "taxable":true,
            "barcode":"1707335325661",
            "grams":800,
            "image_id":null,
            "weight":0.8,
            "weight_unit":"kg",
            "requires_shipping":true
         }
      ],
      "options":[
         {
            "id":8825212633154,
            "product_id":6780184559682,
            "name":"Size",
            "position":1,
            "values":[
               "XS",
               "S",
               "M",
               "L",
               "XL",
               "XXL",
               "XXXL",
               "4XL",
               "5XL"
            ]
         }
      ],
      "images":[
         {
            "id":29273280905282,
            "product_id":6780184559682,
            "position":1,
            "created_at":"2022-08-04T18:51:06+05:30",
            "updated_at":"2022-08-04T22:11:03+05:30",
            "alt":"Surkh Shibori Cotton Dress",
            "width":2702,
            "height":3377,
            "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263",
            "variant_ids":[
               
            ]
         },
         {
            "id":29273280839746,
            "product_id":6780184559682,
            "position":2,
            "created_at":"2022-08-04T18:51:06+05:30",
            "updated_at":"2022-08-04T22:11:03+05:30",
            "alt":"Surkh Shibori Cotton Dress",
            "width":2702,
            "height":3377,
            "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/38_673c4d81-d87f-4260-a819-2c3b93d7b9fa.png?v=1659631263",
            "variant_ids":[
               
            ]
         },
         {
            "id":29273280872514,
            "product_id":6780184559682,
            "position":3,
            "created_at":"2022-08-04T18:51:06+05:30",
            "updated_at":"2022-08-04T22:11:03+05:30",
            "alt":"Surkh Shibori Cotton Dress",
            "width":2702,
            "height":3377,
            "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/39_2e96c511-8984-4576-b6b6-530374b63d47.png?v=1659631263",
            "variant_ids":[
               
            ]
         }
      ],
      "image":{
         "id":29273280905282,
         "product_id":6780184559682,
         "position":1,
         "created_at":"2022-08-04T18:51:06+05:30",
         "updated_at":"2022-08-04T22:11:03+05:30",
         "alt":"Surkh Shibori Cotton Dress",
         "width":2702,
         "height":3377,
         "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263",
         "variant_ids":[
            
         ]
      }
   }
}
 * 
 */

export async function productDetails(product, brandDomainContext, whatmoreShopId){

    if(_isAppBrew(brandDomainContext) || _isAppMaker(brandDomainContext) || _isPlobalApps(brandDomainContext)){
        return productDetailsShopify(product);
    }

    // brandDomainContext == "whatmore"
    return {};
}



/**
 * 
 * @returns 
 * 
 * {
   "id":6780184559682,
   "title":"Surkh Shibori Cotton Dress",
   "handle":"surkh-shibori-cotton-dress",
   "description":"\u003cp\u003eBold, beautiful and glamorous, our Surkh Shibori Cotton Dress is perfect for those who like to make a statement wiith their every day style. \u003cbr\u003eColor: Red\/Blue\u003cbr\u003eDress Fabric: Cotton\u003c\/p\u003e\n\u003cp\u003eNeckline: Shirt Collar\u003cbr\u003eSleeve: Balloon\u003cbr\u003eCARE: Dry Clean Only \u003cbr\u003eModel Size: Model is wearing S Size \u003cbr\u003eModel Height: 5'4\"\u003cbr\u003e \u003cbr\u003eDISCLAIMER: Slight Color variations may occur due to different screen resolutions.\u003c\/p\u003e",
   "published_at":"2022-08-04T19:05:13+05:30",
   "created_at":"2022-07-30T14:57:03+05:30",
   "vendor":"Aachho",
   "type":"Dress",
   "tags":[
      "__label:NEW",
      "category_express shipping",
      "category_high",
      "Category_Womenswear",
      "Collection_Dress",
      "Collection_Phulwari",
      "Color_Blue",
      "Color_Red",
      "dress_collection",
      "Fabric_Cotton",
      "High",
      "Neckline_Shirt Collar",
      "OCCASSION_CASUAL",
      "Pattern_Kalidaar",
      "Phulwari",
      "print_tie-\u0026-dye",
      "Sleeves_Balloon",
      "subcategory_dress",
      "Technique_Tie \u0026 Dye"
   ],
   "price":325000,
   "price_min":325000,
   "price_max":325000,
   "available":true,
   "price_varies":false,
   "compare_at_price":325000,
   "compare_at_price_min":325000,
   "compare_at_price_max":325000,
   "compare_at_price_varies":false,
   "variants":[
      {
         "id":39873050804290,
         "title":"XS",
         "option1":"XS",
         "option2":null,
         "option3":null,
         "sku":"ACHSSJUL18-XS",
         "requires_shipping":true,
         "taxable":true,
         "featured_image":null,
         "available":true,
         "name":"Surkh Shibori Cotton Dress - XS",
         "public_title":"XS",
         "options":[
            "XS"
         ],
         "price":325000,
         "weight":800,
         "compare_at_price":325000,
         "inventory_management":"shopify",
         "barcode":"6814335325661",
         "requires_selling_plan":false,
         "selling_plan_allocations":[
            
         ]
      },
      {
         "id":39873050837058,
         "title":"S",
         "option1":"S",
         "option2":null,
         "option3":null,
         "sku":"ACHSSJUL18-S",
         "requires_shipping":true,
         "taxable":true,
         "featured_image":null,
         "available":true,
         "name":"Surkh Shibori Cotton Dress - S",
         "public_title":"S",
         "options":[
            "S"
         ],
         "price":325000,
         "weight":800,
         "compare_at_price":325000,
         "inventory_management":"shopify",
         "barcode":"3565335325661",
         "requires_selling_plan":false,
         "selling_plan_allocations":[
            
         ]
    }
   ],
   "images":[
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/38_673c4d81-d87f-4260-a819-2c3b93d7b9fa.png?v=1659631263",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/39_2e96c511-8984-4576-b6b6-530374b63d47.png?v=1659631263",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/41_0a2700f3-e376-4d09-a646-9f93bfd44653.png?v=1659619266",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/42_00bb615d-361a-4964-bae2-ff35e8111c25.png?v=1659619266",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/43_26802366-7c42-42db-a467-ba417fde4fe6.png?v=1659619271",
      "\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/44_8d0268e9-e6c7-4913-81f5-a4ba90435199.png?v=1659619271"
   ],
   "featured_image":"\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263",
   "options":[
      {
         "name":"Size",
         "position":1,
         "values":[
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "XXXL",
            "4XL",
            "5XL"
         ]
      }
   ],
   "url":"\/products\/surkh-shibori-cotton-dress",
   "media":[
      {
         "alt":"Surkh Shibori Cotton Dress",
         "id":21594143588418,
         "position":1,
         "preview_image":{
            "aspect_ratio":0.8,
            "height":3377,
            "width":2702,
            "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263"
         },
         "aspect_ratio":0.8,
         "height":3377,
         "media_type":"image",
         "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/40_8146ee2f-7a8a-43b3-9b1d-d170823cf30b.png?v=1659631263",
         "width":2702
      },
      {
         "alt":"Surkh Shibori Cotton Dress",
         "id":21594143522882,
         "position":2,
         "preview_image":{
            "aspect_ratio":0.8,
            "height":3377,
            "width":2702,
            "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/38_673c4d81-d87f-4260-a819-2c3b93d7b9fa.png?v=1659631263"
         },
         "aspect_ratio":0.8,
         "height":3377,
         "media_type":"image",
         "src":"https:\/\/cdn.shopify.com\/s\/files\/1\/2542\/7564\/products\/38_673c4d81-d87f-4260-a819-2c3b93d7b9fa.png?v=1659631263",
         "width":2702
        }
   ],
   "requires_selling_plan":false,
   "selling_plan_groups":[]
}
 */
export async function productDetailsDetailed(product, brandDomainContext, whatmoreShopId){

   if(_isAppBrew(brandDomainContext) || _isAppMaker(brandDomainContext) || _isPlobalApps(brandDomainContext)){
        return productDetailsShopifyJS(product);
    }

    // brandDomainContext == "whatmore"
    return {};
}

/** 
 * Currently used only for external stores
 * 
 * Sample response: 
 * {
 *    'price': 1234,
 *    'compare_at_price': 1355,
 *    'currency_code': USD
 * }
*/
export async function getProductPriceAndCurrencyDetails(product, brandDomainContext, whatmoreShopId){

   if(_isAppBrew(brandDomainContext) || _isAppMaker(brandDomainContext) || _isPlobalApps(brandDomainContext)){
       return {};
   }

   // brandDomainContext == "whatmore"
   return {}
}