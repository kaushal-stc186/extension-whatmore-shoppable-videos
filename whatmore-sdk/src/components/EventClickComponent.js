import * as React from 'react';
import { SafeAreaView, StatusBar, View } from "react-native";
import EventsVerticalSwipeView from './EventsVerticalSwipeView';
import { getGlobalState } from '../globals/useAppState_APP';
import EventsVerticalSwipeViewNoModal from './EventsVerticalSwipeViewNoModal';

export default function EventClickComponent(props) {
    const modalUsed = getGlobalState('modalUsed');

    return (
        <SafeAreaView  style={{
            width: '100%',
            height: '100%'
        }}>
            <StatusBar
                animated={true}
                backgroundColor='black'
                barStyle={"default"}
                hidden={false}
                showHideTransition={"fade"}
            />
            {
                modalUsed
                ?
                    <EventsVerticalSwipeView setIsModalOpen={props.setIsModalOpen} isModalOpen={props.isModalOpen} events={props.events} onAction={props.onAction} initialEventIndex={props.initialEventIndex} />
                :
                    <EventsVerticalSwipeViewNoModal events={props.events} initialEventIndex={props.initialEventIndex} />
            }
        </SafeAreaView>
      );
}