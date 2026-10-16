const WHATMORE_BACKEND_BASE_URL = "https://api.whatmore.live";
// Platform slug the backend keys per-platform metrics on (views_platform,
// like_platform, clicks_platform) and uses to route app beacons to the
// analytics stream. Absent => backend defaults to "web" and drops the
// stream twin, so Appmaker engagement would be misattributed as web.
const PLATFORM_SOURCE = "am";

export function registerUser(eventId, userName, phoneNumber) {
    const requestBody = {
        "event_id": eventId,
        "customer_name": userName,
        "customer_phone": phoneNumber 
    }
    const response = fetch(WHATMORE_BACKEND_BASE_URL + "/notification/register", {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        },
    ).then(response => {
        console.debug("user registration response : HTTP " + response.status);
        return response.json();
    }).then(data => {
        console.debug("user registration response : " + JSON.stringify(data));
    }).catch(error => {
        console.error("error while registering user for event : ", error);
    });
}


export function increaseViewCount(event) {
    console.debug("updating user view count for event.");
    const requestBody = {
        "event_id": event.event_id,
        "increase_by": 1,
        "source": PLATFORM_SOURCE
    }
    const response = fetch(WHATMORE_BACKEND_BASE_URL + "/event/metrics/views", {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        },
    ).then(response => {
        console.debug("updating user view count response : HTTP " + response.status);
        return response.json();
    }).then(data => {
        console.debug("updating user view count response : " + JSON.stringify(data));
    }).catch(error => {
        console.error("error updating user view count user for event : ", error);
    });
}


export function increaseEventProductClickCount(event, product) {
    console.debug("updating event-product click count for event {} and product {}.", event.event_id, product.product_id);
    const requestBody = {
        "event_id": event.event_id,
        "product_id": product.product_id,
        "increase_by": 1,
        "source": PLATFORM_SOURCE
    }
    const response = fetch(WHATMORE_BACKEND_BASE_URL + "/event/metrics/clicks", {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        },
    ).then(response => {
        console.debug("updating user event-product click count response : HTTP " + response.status);
        return response.json();
    }).then(data => {
        console.debug("updating user event-product click count response : " + JSON.stringify(data));
    }).catch(error => {
        console.error("error updating user event-product click count for event {} : ", event.event_id, error);
    });
}

export function increaseEventProductAddToCartCount(event, product, quantity) {
    console.debug("updating event-product add to cart count for event {} and product {}.", event.event_id, product.product_id);
    const requestBody = {
        "event_id": event.event_id,
        "product_id": product.product_id,
        "increase_by": quantity,
        "source": PLATFORM_SOURCE
    }
    const response = fetch(WHATMORE_BACKEND_BASE_URL + "/event/metrics/add_to_cart", {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        },
    ).then(response => {
        console.debug("updating user event-product add to cart count response : HTTP " + response.status);
        return response.json();
    }).then(data => {
        console.debug("updating user event-product add to cart count response : " + JSON.stringify(data));
    }).catch(error => {
        console.error("error updating user event-product add to cart count for event {} : ", event.event_id, error);
    });
}

export function increaseEventProductBuyNowCount(event, product) {
    console.debug("updating event-product buy now count for event {} and product {}.", event.event_id, product.product_id);
    const requestBody = {
        "event_id": event.event_id,
        "product_id": product.product_id,
        "increase_by": 1,
        "source": PLATFORM_SOURCE
    }
    const response = fetch(WHATMORE_BACKEND_BASE_URL + "/event/metrics/buy_now", {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        },
    ).then(response => {
        console.debug("updating user event-product buy now count response : HTTP " + response.status);
        return response.json();
    }).then(data => {
        console.debug("updating user event-product buy now count response : " + JSON.stringify(data));
    }).catch(error => {
        console.error("error updating user event-product buy now count for event {} : ", event.event_id, error);
    });
}

export async function orderTrackingAddToCartEvent(
    {storeId = '', eventId = 0, productId = '', variantId = '', cartToken = '', checkoutToken = '', quantity = 0, price = '', actionType = '', trackingId = ''} = {}
) {
    let data = {
        'event_id': eventId,
        'product_id': productId,
        'cart_token': cartToken,
        'checkout_token': checkoutToken,
        'quantity': quantity,
        'price': price,
        'variant_id': variantId,
        'action_type': actionType,
        'tracking_id' : trackingId
    };
    console.debug("initiating ATC metadata event for eventId {}, productId {}, variantId {} ", eventId, productId, variantId);
    const res = await fetch(WHATMORE_BACKEND_BASE_URL + '/cart-metadata/' + storeId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.debug("initiating ATC metadata event for eventId {}, productId {}, variantId {} : HTTP " + response.status);
        return response.json();
    }).catch(error => {
        console.error("error initiating ATC metadata event for eventId {}, productId {}, variantId {} : ", eventId, productId, variantId);
    });        

    return res
}

