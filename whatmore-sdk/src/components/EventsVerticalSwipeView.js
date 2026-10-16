import * as React from 'react';
import { Modal, View, AppState } from "react-native";
import VerticalPager from './commons/VerticalPager';
import EventShoppingView from './EventShoppingView.js';
import { setGlobalState } from '../globals/useAppState_APP.js';

export default function EventsVerticalSwipeView(props) {
    var events = props.events;
    // sync the active index for the event actually opened — otherwise a stale
    // value from a previous session decides which page's video plays
    React.useEffect(() => {
        setGlobalState('verticalSwiperViewActiveIndex', props.initialEventIndex);
    }, []);
    // clear any stale pause each time the reels open fresh
    React.useEffect(() => {
        if (props.isModalOpen) setGlobalState('pausedForNavigation', false);
    }, [props.isModalOpen]);
    // resume the video when returning from the product page. Covers hosts that
    // present the product screen as a separate activity (AppState fires 'active'
    // on return); the swipe path below covers same-activity presentation.
    React.useEffect(() => {
        const sub = AppState.addEventListener('change', (s) => {
            if (s === 'active') setGlobalState('pausedForNavigation', false);
        });
        return () => sub.remove();
    }, []);
    return (
            <Modal
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%'
                }}
                animationType="slide"
                transparent={false}
                visible={props.isModalOpen}
                onRequestClose={() => props.setIsModalOpen(false)}
            >
                <VerticalPager
                    data={events}
                    loop
                    initialIndex={props.initialEventIndex}
                    onScrollBegin={() => setGlobalState('pausedForNavigation', false)}
                    onIndexChanged={(index) => {
                        setGlobalState('pausedForNavigation', false);
                        setGlobalState('verticalSwiperViewActiveIndex', index);
                    }}
                    renderPage={(event, eventIndex) => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <EventShoppingView setIsModalOpen={props.setIsModalOpen} onAction={props.onAction} event={event} eventIndex={eventIndex} />
                        </View>
                    )}
                />
            </Modal>
      );
}
