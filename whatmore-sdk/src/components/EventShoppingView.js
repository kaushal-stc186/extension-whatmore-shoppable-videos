import * as React from 'react';
import { View } from "react-native";
import AppVideoPlayer from './video-player/AppVideoPlayer.js'
import { useGlobalState } from '../globals/useAppState_APP.js';
import EventShoppingOverlay from './EventShoppingOverlay.js';
import { useState, useEffect, useRef } from 'react';
import { getGlobalState } from '../globals/useAppState_APP.js';
import { increaseViewCount } from '../api/whatmore-backend/WhatmoreMetricCommands.js';

export default function EventShoppingView(props) {
    const [activeSwiperIndex, setActiveSwiperIndex] = useGlobalState('verticalSwiperViewActiveIndex');
    // paused globally while a product page is presented over the reels modal
    const [pausedForNavigation] = useGlobalState('pausedForNavigation');
    const [isLoading, setIsLoading] = useState(true);
    var event = props.event;
    var eventIndex = props.eventIndex;
    const isActivePage = activeSwiperIndex == eventIndex;
    const isPaused = !isActivePage || pausedForNavigation;
    const viewCounted = useRef(false);
    useEffect(() => {
        if (viewCounted.current || isPaused) return;
        if (getGlobalState('isInDesignMode') || getGlobalState('isDemoBrand')) return;
        viewCounted.current = true;
        increaseViewCount(event);
    }, [isPaused, event]);
    // NOTE: do not re-arm isLoading on page change — an already-loaded video
    // never fires onLoad again, leaving the spinner up over playing video.
    // AppVideoPlayer clears it from onLoad AND first onProgress tick.
    return (
        <View 
            style={{
                width: '100%', height: '100%', backgroundColor: 'gray',
                // only bites now the player renders as a TextureView
                overflow: 'hidden',
            }}
        >
            {/* paused (not just muted) when this page isn't the active one:
                previously EVERY event streamed simultaneously, starving the
                visible video's bandwidth and fighting over audio focus */}
            <AppVideoPlayer videoUrl={event.event_hls_url} isMuted={!isActivePage}
            paused={isPaused}
            poster={event.poster_image}
            isLoading={isLoading} setIsLoading={setIsLoading}
            />
            <View
                style={{
                    width: '100%', height: '100%',
                    position: 'relative', zIndex: 1, 
                    backgroundColor: 'transparent',
                }}
            >
                <EventShoppingOverlay setIsModalOpen={props.setIsModalOpen} event={event} onAction={props.onAction} />
            </View>
        </View>
    );
                                    
}