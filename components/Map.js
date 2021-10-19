/**
 * Info :
 * permet de créer le carte
 */

import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import {selectDestination, selectOrigin, setTravelTimeInformation} from "../slices/NavSlice";
import {useDispatch, useSelector} from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_APIKEY} from "@env";


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // zoom and to markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            const URL = fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?
                
                &origins=${origin.description}
                &destinations=${destination.description}&units=metric
                &key=${GOOGLE_MAPS_APIKEY}`)


                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                })

        }
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            userInterfaceStyle="dark"
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin?.location?.lat,
                longitude: origin?.location?.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    apikey={GOOGLE_MAPS_APIKEY}
                    origin={origin.description}
                    destination={destination.description}
                    strokeWidth={5}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                        title="Title"
                        description={origin.description}
                        identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                        title="Title"
                        description={destination.description}
                        identifier="destination"
                />
            )}
        </MapView>

    );
};

export default Map;

const styles = StyleSheet.create({})
