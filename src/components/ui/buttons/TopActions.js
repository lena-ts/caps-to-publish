import React from 'react'
import {View, StyleSheet} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const TopActions = (props) => {
    return(
            <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'transparent' ]}
                style={styles.wrapper}
            >
            {props.children}
            </LinearGradient>
    )
}

const styles=StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingTop: 55,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1
    }
})