import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";
import i18n from 'i18n-js';

export const ImageButton = ({imageButtonAction, text, img, icon}) => {
    const handlePress = () => {
        imageButtonAction()
    }

    return(
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                {img ?
                <Image
                    style={styles.icon}
                    source={img}
                /> : null}
                {icon ? icon : null}
                <Text style={styles.text}>{i18n.t(text)}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 100,
        margin: 6
    },
    button: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    icon: {
        width: 23,
        height: 23,
        marginRight: 8
    }
})