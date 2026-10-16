

export function getProductHandle(product){
    const match = product.product_link.match(/\/products\/([^/?&]+)/);
    return match ? match[1] : null;
}