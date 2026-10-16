export const removeInvalidEvents = function(data, brandId){
    if(data == null){
        return;
    }

    return data.filter((event) => {
        return event.products.length > 0;
    });
}

export const extractEvents = function(data, isCollectionsTemplate){
    if(data == null){
        return;
    }

    if(isCollectionsTemplate){
        return (data[0]['events']);
    }

    return data;
}
