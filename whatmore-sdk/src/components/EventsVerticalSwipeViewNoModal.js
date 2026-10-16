import * as React from 'react';
import { View } from "react-native";
import VerticalPager from './commons/VerticalPager';
import EventShoppingView from './EventShoppingView.js';
import { setGlobalState } from '../globals/useAppState_APP.js';

export default function EventsVerticalSwipeViewNoModal(props) {
    var events = props.events;
    React.useEffect(() => {
        setGlobalState('verticalSwiperViewActiveIndex', props.initialEventIndex ?? 0);
    }, []);
    return (
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%'
                }}
            >
                <VerticalPager
                    data={events}
                    loop
                    initialIndex={props.initialEventIndex ?? 0}
                    onIndexChanged={(index) => {
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
                            <EventShoppingView event={event} eventIndex={eventIndex} />
                        </View>
                    )}
                />
            </View>
      );
}
