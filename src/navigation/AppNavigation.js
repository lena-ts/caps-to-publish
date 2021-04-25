import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {TabNavigator} from "./TabNavigator";
import {useSelector} from "react-redux";
import {IntroNavigator} from "./IntroNavigator";
import {StackCategories} from "./StackCategories";

export const AppNavigation = () => {
    const wardrobe_type = useSelector(state => state.settings.wardrobeType)
    return(
        <NavigationContainer>
            {wardrobe_type ? <StackCategories/> : <IntroNavigator/> }
        </NavigationContainer>
    )
}