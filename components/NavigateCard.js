/**
 * Info :
 * permet d'afficher le contenu en dessous de la carte
 */

import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import tw from "tailwind-react-native-classnames";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {useDispatch} from "react-redux";
import {setDestination} from "../slices/NavSlice";
import {useNavigation} from "@react-navigation/native";
import {RideOptionCard} from "./RideOptionsCard"
import NavFavorites from "./NavFavorites";
import {Icon} from "react-native-elements";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <Text style={tw`text-center py-5 text-xl`}>Salut Chef</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={InputBox}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: "fr",
                        }}
                        onPress={(data, detail = null) => {
                            dispatch(
                                setDestination({
                                    location: detail.geometry.location,
                                    description: data.description,
                                }))
                            navigation.navigate("RideOptionsCard");
                        }}
                        returnKeyType={"search"}
                        minLength={2}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        placeholder="Where to ?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={200}
                    />
                </View>
                <NavFavorites/>
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>

                    <Icon  name="car"type="font-awesome" color="white" size={16}/>
                    <Text style={tw`text-center text-white`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon  name="fast-food-outline"type="ionicon" color="black" size={16}/>
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard;

const InputBox = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
