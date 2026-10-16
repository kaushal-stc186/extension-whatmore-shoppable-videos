
import { useState, useRef, useEffect } from "react";
import { getGlobalState } from "../../globals/useAppState_APP";
import { Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import { shadeColorHex } from "../../utils/ColorUtils";
import LoadingIcon from "../../icons/icon-components/LoadingIcon";
import CartIcon from "../../icons/icon-components/CartIcon";
import PlusIcon from "../../icons/icon-components/PlusIcon";

// dependency-free replacement for Animatable's infinite "rotate"
function SpinningView({ children, duration = 400 }) {
    const spin = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(spin, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })
        );
        loop.start();
        return () => loop.stop();
    }, [spin, duration]);
    const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    return <Animated.View style={{ transform: [{ rotate }] }}>{children}</Animated.View>;
}

function LabelledButton(props){
    const whatmorePrimaryColor = getGlobalState('whatmorePrimaryColor');
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const event = props.event;
    const product = props.product;
    const BASE_FONT_SIZE = props.baseFontSize ?? 10;
    const onClick = props.onClick;
    const width = props.width;
    const height = props.height;
    const title = props.title;
    const showInProgressIcon = props.showInProgressIcon;

    const BOX_PADDING = 2;

    return (            
        <TouchableOpacity 
            style={{
                width: width, height: height,
                padding: BOX_PADDING,
                backgroundColor: (showInProgressIcon ? shadeColorHex(whatmorePrimaryColor, 8) : whatmorePrimaryColor)
            }}
            onPress={(e)=>{
                e.stopPropagation();
                onClick();
            }}
        >
            <View 
                style={{
                    width: '100%', height: height,
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    paddingVertical: 4
                }}
            >   
                    {
                        title
                        ?
                            <Text
                                style={{
                                    fontSize: BASE_FONT_SIZE * 4,
                                    fontFamily: whatmorePrimaryFont,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >
                                &nbsp;{title}&nbsp;
                            </Text>
                        :
                            <></>
                    }
                    {
                        showInProgressIcon
                        ?
                            <SpinningView duration={400}>
                                <LoadingIcon
                                    color={"#F5F5F5"}
                                    size={BASE_FONT_SIZE * 8}
                                />
                            </SpinningView>
                        :
                            <></>
                    }                    
            </View>
        </TouchableOpacity>  
    );
}



function AddToCartInitialButton(props){
    const whatmorePrimaryColor = getGlobalState('whatmorePrimaryColor');
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const event = props.event;
    const product = props.product;
    const BASE_FONT_SIZE = props.baseFontSize ?? 10;
    const onClick = props.onClick;
    const width = props.width;
    const height = props.height;

    const BOX_PADDING = 2;

    return (
        <TouchableOpacity
            style={{
                width: '100%',
                height: height,
                padding: BOX_PADDING,
                backgroundColor: whatmorePrimaryColor
            }}
            onPress={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <View 
                style={{
                    width: '100%',
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 5
                }}
            >
                <Text
                    style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        fontFamily: whatmorePrimaryFont,
                        color: 'white'
                    }}
                >
                    &nbsp;{"ADD TO CART"}&nbsp;
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function SoldOutButton(props){
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const event = props.event;
    const product = props.product;
    const BASE_FONT_SIZE = props.baseFontSize ?? 10;
    const width = props.width;
    const height = props.height;

    const BOX_PADDING = 2;

    return (            
        <TouchableOpacity 
            style={{
                width: width, height: height,
                padding: BOX_PADDING, backgroundColor: 'white',
                borderColor: 'gray', borderWidth: 1
            }}
            onPress={(e)=>{
                e.stopPropagation();
            }}
        >
            <View 
                style={{
                    width: '100%', height: height,
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    paddingVertical: 4, paddingHorizontal: 5
                }}
            >
                <Text
                    style={{
                        fontSize: BASE_FONT_SIZE * 4,
                        fontWeight: 'bold',
                        fontFamily: whatmorePrimaryFont,
                        color: 'gray'
                    }} 
                >
                    &nbsp;{' Sold Out '}&nbsp;
                </Text>
            </View>
        </TouchableOpacity>  
    );
}

function AddedToCartButton(props){
    const whatmorePrimaryColor = getGlobalState('whatmorePrimaryColor');
    const whatmorePrimaryFont = getGlobalState('whatmorePrimaryFont');
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const event = props.event;
    const product = props.product;
    const BASE_FONT_SIZE = props.baseFontSize ?? 10;
    const onClick = props.onClick;
    const cartCount = props.cartCount;
    const width = props.width;
    const height = props.height;
    const onCartIconClick = props.onCartIconClick;

    const BOX_PADDING = 2;

    return (
        <TouchableOpacity 
            style={{
                width: width, height: height,
                padding: BOX_PADDING, 
                backgroundColor: 'white', borderColor: whatmorePrimaryColor, borderWidth: 1
            }}
            onPress={(e)=>{
                e.stopPropagation();
            }}
        >
            <View 
                style={{
                    width: '100%', height: height,
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    paddingLeft: 4, paddingRight: 4,
                }}
            >
                <TouchableOpacity
                    onPress={()=>{onCartIconClick();}}
                >
                    <CartIcon 
                        color={whatmorePrimaryColor} 
                        size={BASE_FONT_SIZE * 6} 
                    />
                </TouchableOpacity>

                <Animatable.Text 
                    animation="bounceInUp"
                    duration={500} iterationCount={1}
                    style={{
                        fontSize: BASE_FONT_SIZE * 4,
                        fontWeight: 'bold',
                        fontFamily: whatmorePrimaryFont,
                        color: whatmorePrimaryColor,
                        marginHorizontal: 20
                    }}
                >
                    {cartCount}
                </Animatable.Text >

                <TouchableOpacity
                    onPress={(e)=>{
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    <PlusIcon 
                        color={whatmorePrimaryColor} 
                        size={BASE_FONT_SIZE * 6} 
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>  
    );
}

function AddToCartButton(props){
    const whatmoreShopId = getGlobalState('whatmoreShopId');

    const event = props.event;
    const product = props.product;
    const BASE_FONT_SIZE = props.baseFontSize ?? 10;
    const showAddedToCart = props.showAddedToCart ?? true;
    const cartState = props.cartState;
    const cartCount = props.cartCount;
    const onClickAtc = props.onClickAtc;
    const onCartIconClick = props.onCartIconClick;

    function _handleAddToCartClick() {
        onClickAtc();
    }

    const width = props.width ?? '100%';
    const height = props.height ?? 'auto';

    if(cartState == "errored"){
        return (
            <Animatable.View
                animation="fadeIn" 
                duration={500} iterationCount={1}
                easing="ease-in-out"
                style={{
                    height: height, width: width
                }}
            >
                <SoldOutButton 
                    event={event} product={product} baseFontSize={BASE_FONT_SIZE}  
                    width={width} height={height}
                />
            </Animatable.View>
        );    
    }

    if(cartState == 'init'){
        if(cartCount == 0){
            return(
                <AddToCartInitialButton 
                    onClick={_handleAddToCartClick} 
                    event={event} product={product} baseFontSize={BASE_FONT_SIZE}  
                    width={width} height={height}
                />
            );
        }else{
            if(showAddedToCart){
                return (
                    <Animatable.View
                        animation="fadeIn" 
                        duration={500} iterationCount={1}
                        easing="ease-in-out"
                        style={{
                            height: height, width: width
                        }}
                    >
                        <AddedToCartButton 
                            onClick={_handleAddToCartClick} 
                            event={event} product={product} baseFontSize={BASE_FONT_SIZE} 
                            cartCount={cartCount} 
                            width={width} height={height}
                            onCartIconClick={onCartIconClick}
                        />
                    </Animatable.View>
                );
            }else{
                return(
                    <AddToCartInitialButton 
                        onClick={_handleAddToCartClick} 
                        event={event} product={product} baseFontSize={BASE_FONT_SIZE}  
                        width={width} height={height}
                    />
                );
            }
        }
    }

        return(
            <LabelledButton 
                onClick={_handleAddToCartClick}  
                event={event} product={product} baseFontSize={BASE_FONT_SIZE}  
                width={width} height={height}
                title={cartState == "awaitingVariantSelection" ? "Done" : ""}
                showInProgressIcon={cartState == "atcApiCallInProgress" || cartState == "productVariantDetailsApiCallInProgress"}
            />
        );
}

export default AddToCartButton;