import * as React from 'react';
import { getGlobalState, setGlobalState, useGlobalState } from '../../globals/useAppState_APP.js';
import { Text, TouchableOpacity, View } from "react-native";
import UnmuteIcon from '../../icons/icon-components/UnmuteIcon.jsx';
import MuteIcon from '../../icons/icon-components/MuteIcon.jsx';

export default function AppMuteUnmuteIcon(props) {
    const [isAppMuted] = useGlobalState("isAppMuted");
    
    return (
        isAppMuted
        ?
            <TouchableOpacity
                style={{
                    padding: 10
                }}
                onPress={()=>{
                    setGlobalState("isAppMuted", false);
                }}
            >
                <MuteIcon color={"#F5F5F5"} size={40} />
            </TouchableOpacity>
        :
            <TouchableOpacity
                style={{
                    padding: 10
                }}
                onPress={()=>{
                    setGlobalState("isAppMuted", true);
                }}
            >
                <UnmuteIcon color={"#F5F5F5"} size={40} />
            </TouchableOpacity>
    );
                                    
}