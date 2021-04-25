import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import {WardrobeTypeScreen} from "../screens/WardrobeTypeScreen";
import {IntroConfirmScreen} from "../screens/IntroConfirmScreen";

export const IntroNavigator = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Intro"
                component={WardrobeTypeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="IntroConfirm"
                component={IntroConfirmScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}