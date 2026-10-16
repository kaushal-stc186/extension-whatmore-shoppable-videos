import React, { useState, useEffect, lazy, Suspense } from 'react';
import { WHATMORE_BACKEND_BASE_URL } from '../constants/AppGlobalVars';
import { extractEvents, removeInvalidEvents } from '../utils/EventSanityUtils';
import { View } from 'react-native';
import { getGlobalState } from '../globals/useAppState_APP';
// import EventTileWithProduct from './carousel-view/EventTileWithProduct.js';
const EventTileWithProduct = lazy(() => import('./carousel-view/EventTileWithProduct.js'));
const EventClickComponent = lazy(() => import('./EventClickComponent'));

const logEventData = false;

function logResponse(data, response = '200'){
    // log response details
    console.log("###=======Whatmore Log start.======####");
    console.log("Fetched Events from Whatmore")
    console.log("response status code : " + response.status)
    console.log("total events received : " + (data && data.length));
    logEventData && console.log("events data : " + JSON.stringify(data));
    console.log("###=======Whatmore Log end.======####")
}

function transformEventData(data, brandId){
    if(data == null){
        return;
    }

    var index = 0;
    data.forEach((event) => {
        event.index = index++;        
    });

}

export default function WhatmoreRootComponent(props) {
    var brandId = props.shopId;
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialEventIndex, setInitialEventIndex] = useState(0)
    const collectionId = getGlobalState('collectionId');
    const isCollectionsTemplate = collectionId != "";

    var eventStatuses = "live,upcoming";
    var isActive = "true";

    var whatmoreBackendEventsUrl = WHATMORE_BACKEND_BASE_URL + "/v1/events/";
    var whatmoreBackendCollectionEventsUrl = WHATMORE_BACKEND_BASE_URL + "v2/collection";
    let url = "";
    if(isCollectionsTemplate){
        url = whatmoreBackendCollectionEventsUrl + "?store_id=" + brandId.toString() + "&client_collection_id=" + collectionId;
    }else{
        url = whatmoreBackendEventsUrl + brandId + "?status=" + eventStatuses.toString() + "&is_active=" + isActive.toString();
    }

    /**
     * external network calls
     */

    // warm the player chunk while the user is still browsing tiles, so the
    // first tap opens the modal without a lazy-load delay
    useEffect(() => {
        import('./EventClickComponent').catch(() => {});
    }, []);

    useEffect(() => {
      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              return extractEvents(data, isCollectionsTemplate);
          })
          .then((data) => {
              logEventData && console.log("initial received events size : " + data.length);
              return removeInvalidEvents(data, brandId);
          })
          .then((data) => {
              setData(data);
          })
          .catch((err) => {
              setError(err.message);
          });
    }, []);

    // show nothing if any errors occurs or if no close events are scheduled or if still loading
    if((data == null || data.length == 0) || error){
        return (
            <View
                style={{
                    width: '100%', 
                    height: '100%'
                }}
            >
            </View>
        );
    }

    logEventData && logResponse(data);
    // transformEventData(data, brandId);
    logEventData && console.log("final transformed events data : " + JSON.stringify(data));
    logEventData && console.log("valid events size : " + data.length);

    return (
        <>
            {/* separate Suspense per lazy child: loading the player chunk must
                never blank the carousel that is already on screen */}
            <Suspense fallback={null}>
                <EventTileWithProduct customStyles={props.customStyles} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} events={data} setInitialEventIndex={setInitialEventIndex} onAction={props.onAction} />
            </Suspense>
            {(isModalOpen) &&
            <Suspense fallback={null}>
                <EventClickComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} events={data} initialEventIndex={initialEventIndex} onAction={props.onAction} />
            </Suspense>}
        </>
      );
}