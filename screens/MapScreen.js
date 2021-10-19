/**
 * Info :
 * Affiche la carte sur les differentes pages
 * Affiche la partie en dessous de la carte
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import MapView from 'react-native-maps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";


const MapScreen = () => {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();

    return (
        <View>

            <TouchableOpacity style={tw `border-red-400 absolute top-16 left-8 z-50 rounded-full`} onPress={() => navigation.navigate('HomeScreen')}>
                <Icon name="home" color='#FFFFFF'/>
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <Map/>
            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigationCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen;

const styles = StyleSheet.create({})
