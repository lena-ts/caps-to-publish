import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {PINK_COLOR} from "../../theme";
import {useDispatch} from "react-redux";
import {setBuyPro} from "../../store/actions";
import i18n from "i18n-js";

export const ProButton = ({text, navigation}) => {
    const dispatch = useDispatch()
    const handlePress = () => {
        dispatch(setBuyPro())
        navigation.navigate(i18n.t('wardrobe'))
    }
    return(
        <View>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handlePress}
            >
                <View style={styles.text}>{text}</View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: PINK_COLOR,
        borderRadius: 10,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        color: 'white'
    }
})