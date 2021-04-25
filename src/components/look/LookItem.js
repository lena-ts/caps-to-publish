import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";

export const LookItem = ({image, brand}) => {
    return(
        <ImageBackground source={{ uri: image }} style={styles.image}>
            <Text style={styles.text}>{brand}</Text>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    image: {
        // flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%'
        // width: '100%'
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    }
})