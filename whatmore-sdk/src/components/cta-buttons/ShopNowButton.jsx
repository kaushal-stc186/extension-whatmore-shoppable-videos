import { getGlobalState } from "../../globals/useAppState_APP";
import { Text, TouchableOpacity, View } from "react-native";

function ShopNow(props){
    const whatmorePrimaryColor = getGlobalState('whatmorePrimaryColor');
    const customStyles= getGlobalState('customStyles');
    // const onClick = props.onClick;
    const height = props.height;

    const BOX_PADDING = 2;

    return (
        <View
            style={[{
                width: '100%',
                height: height,
                padding: BOX_PADDING,
                backgroundColor: customStyles?.brandThemeColor ?? whatmorePrimaryColor
            }, props.ctaStyle]}
            // onPress={(e) => {
            //     e.stopPropagation();
            //     // onClick();
            // }}
        >
            <View 
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // paddingVertical: 5
                }}
            >
                <Text
                    style={[{
                        fontSize: props.fontSize,
                        fontWeight: 'bold',
                        fontFamily: props.fontFamily,
                        color: 'white'
                    }, props.ctaTextStyle]}
                >
                    &nbsp;{"SHOP NOW"}&nbsp;
                </Text>
            </View>
        </View>
    );
}

export default ShopNow