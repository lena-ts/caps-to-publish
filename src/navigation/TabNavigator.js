import React from 'react'
import {View, Text, TouchableOpacity} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import i18n from "i18n-js";
import {PINK_COLOR} from "../theme";
import {LookScreen} from "../screens/LookScreen";
import {StackCategories} from "./StackCategories";
import {ProScreen} from "../screens/ProScreen";
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";

export const TabNavigator = () => {
    // const pro = useSelector(state => state.settings.proPurchased)
    const Tab =  createBottomTabNavigator()
    return(
        <Tab.Navigator
            initialRouteName={i18n.t('wardrobe')}
            tabBarOptions={{
                style: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopColor: "transparent"
                },
                labelStyle: {
                    fontSize: 16,
                    paddingBottom: 20,
                    fontWeight: '600',
                    color: 'white'
                }
            }}
            screenOptions={{
                tabBarIcon: ({ focused, color, size }) => {
                    const activeStyle = focused ? PINK_COLOR : 'transparent';
                    return <View
                        style={{
                            width: 8,
                            height: 8,
                            backgroundColor: activeStyle,
                            borderRadius: 100,
                            marginBottom: 20
                        }}
                    ></View>;
                }
            }}
        >
            <Tab.Screen name={i18n.t('look')} component={LookScreen} />
            <Tab.Screen name={i18n.t('wardrobe')} component={StackCategories} />
            {/*{pro ? null : <Tab.Screen name="Pro" component={ProScreen} /> }*/}
        </Tab.Navigator>
    )
}