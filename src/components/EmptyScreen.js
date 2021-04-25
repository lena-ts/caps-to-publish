import React from 'react'
import {View, Text, StyleSheet, ImageBackground} from "react-native";
import {commonStyles} from '../styles/styles'
import i18n from 'i18n-js';
import {BG_COLOR} from "../theme";
import {ImagePickerButtons} from "./ui/buttons/ImagePickerButtons";
import {Shade} from "./ui/Shade";
import {useSelector} from "react-redux";

export const EmptyScreen = ({text}) => {
    const wardrobe_type = useSelector(state=>state.settings.wardrobeType)
    const image = wardrobe_type === "woman" ? require('../../assets/pro_bg3_min.png') : require('../../assets/man_wardrobe_bg.png')
    return(
        <View style={[commonStyles.view, {backgroundColor:  BG_COLOR}]}>
            <ImageBackground
                source={image}
                style={styles.bg}
            >
            <Text style={styles.title}>
                {i18n.t(text)}
            </Text>
            <ImagePickerButtons/>
            {/*<Shade type="bottom"/>*/}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6B6D6E'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '500',
        zIndex: 1,
        marginTop: -50,
        color: 'white'
    },
})