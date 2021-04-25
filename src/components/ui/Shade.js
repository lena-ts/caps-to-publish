import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {StyleSheet} from "react-native";

export const Shade = ({type}) => {
    const colors = type === 'bottom' ? ['transparent',  'rgba(0,0,0,0.8)' ] : ['rgba(0,0,0,0.8)', 'transparent' ]
    const height = type === 'bottom' ? 100 : 100
    const position = type === 'bottom' ? {bottom: 0} : {top: 0}
    return(
        <LinearGradient
            colors={colors}
            style={[styles.background, {height: height}, position]}
        />
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        position: 'absolute',
        zIndex: 0
    }
})