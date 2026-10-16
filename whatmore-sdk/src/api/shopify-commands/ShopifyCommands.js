export async function productDetailsShopify(product){
    const url = product.product_link + '.json';
    const response = await fetch(url , {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export async function productDetailsShopifyJS(product){
    const url = product.product_link + '.js';
    const response = await fetch(url , {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
}