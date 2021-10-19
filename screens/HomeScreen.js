/**
 * Info :
 * premier ecran avec la voiture et le pot de nouille
 */

import React from "react";
import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import tw from 'tailwind-react-native-classnames';
import NavOptions from "../components/NavOptions";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {useDispatch} from "react-redux";
import {setOrigin, setDestination} from "../slices/NavSlice";
import NavFavorites from "../components/NavFavorites";


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where from ?"
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18,
                        },

                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description : data.description
                        }))

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language:'fr'
                    }}

                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={200}
                />

                <NavOptions/>
                <NavFavorites/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})