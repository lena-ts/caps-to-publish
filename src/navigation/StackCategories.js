import React from 'react'
import {View, Text, TouchableOpacity} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import {CategoryScreen} from "../screens/CategoryScreen";
import {WardrobeScreen} from "../screens/WardrobeScreen";
import {ItemScreen} from "../screens/ItemScreen";
import {PlusButton} from "../components/ui/toptabs/PlusButton";
import {Entypo} from "@expo/vector-icons";
import i18n from "i18n-js";
import {DeleteItemButton} from "../components/wardrobe/DeleteItemButton";
import {BackButton} from "../components/ui/buttons/BackButton";

export const StackCategories = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen
                name={i18n.t('wardrobe')}
                component={WardrobeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={({ route }) => ({
                    title: i18n.t(route.params.catId) + ', ' + route.params.length,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Entypo name="chevron-small-left"
                                size={32}
                                color="white"
                                style={{
                                    // paddingTop: 17,
                                    paddingLeft: 5
                                }} />
                    ),
                    headerRight: () => <View style={{marginRight: 5}}><PlusButton prestate={route.params.catId}/></View>
                })}
            />
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                options={({ route, navigation }) => ({
                    title: '',
                    // ...TransitionPresets.ModalSlideFromBottomIOS,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerLeft: () => <BackButton navigation={navigation} itemToDealWith={route.params.itemId}/>,
                    // headerBackImage: () => (
                    //     <Entypo name="chevron-small-left"
                    //             size={32}
                    //             color="white"
                    //             style={{
                    //                 // paddingTop: 17,
                    //                 paddingLeft: 5
                    //             }} />
                    // ),
                    headerRight: () => <View style={{marginRight: 15}}><DeleteItemButton id={route.params.itemId} navigation={navigation}/></View>
                })}
            />
        </Stack.Navigator>
    )
}