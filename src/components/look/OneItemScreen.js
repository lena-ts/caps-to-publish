import React from 'react'
import {View, ImageBackground, Text, StyleSheet} from "react-native";
import {windowHeight, windowWidth} from "../../theme";
import {useSelector} from "react-redux";
import {commonStyles} from "../../styles/styles";
import i18n from "i18n-js";
import {ImagePickerButtons} from "../ui/buttons/ImagePickerButtons";
import {Shade} from "../ui/Shade";

export const OneItemScreen = () => {
    const items = useSelector(state => state.items).items

    const image = items[0].img

    return(
        <View>
            <ImageBackground source={{ uri: image }}  style={[styles.image, {width:windowWidth, height: windowHeight}]}>
                <View style={commonStyles.darkShade}>
                    <Text style={styles.text}>{i18n.t('add_more_items_to_play_looks')}</Text>
                    <ImagePickerButtons/>
                    <Shade/>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles=StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    }
})