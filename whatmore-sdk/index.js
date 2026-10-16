import { useEffect } from "react";
import WhatmoreRootComponent from "./src/components/WhatmoreRootComponent.js";
import { setGlobalState } from "./src/globals/useAppState_APP.js";
import { View } from "react-native";

export function WhatmoreBase(props){

    useEffect(() => {
        setGlobalState('whatmoreShopId', props.shopId);
        setGlobalState('brandDomainContext', props.domainContext);
        setGlobalState('commandsObject', props.commandsObject);
        setGlobalState('template', props.template);
        setGlobalState('modalUsed', props.modalUsed);
        setGlobalState('activateMock', props.activateMock);
        setGlobalState('customStyles', props.customStyles);
        setGlobalState('collectionId', props.collectionId ?? "");
    }, []);
    
    // return (
    //   <View style={{
    //     width: '100%', height: '100%',
    //     backgroundColor: 'red'
    //   }}>

    //   </View>
    // );

    return (
      <WhatmoreRootComponent shopId={props.shopId} onAction={props.onAction} />
    );
}


