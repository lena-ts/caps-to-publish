import React from 'react'
import {View, Text, StyleSheet, Image, ImageBackground} from "react-native";
import {commonStyles} from "../styles/styles";
import {ImageButton} from "../components/ui/buttons/ImageButton";
import i18n from "i18n-js";

export const WardrobeTypeScreen = ({navigation}) => {

    const handleWardrobeType = (type) => {
        navigation.push("IntroConfirm", { wardrobe: type })

    }

    const womanImg = require('../../assets/woman.png')
    const manImg = require('../../assets/man.png')
    const hanger = require('../../assets/hanger_white.png')
    const image = require('../../assets/pro_bg3_min.png')

    return(
        <View style={commonStyles.view}>
            <ImageBackground
                source={image}
                style={styles.bg}
            >
            <Image source={hanger} style={styles.image}/>
            <Text style={styles.title}>{i18n.t("wardrobe_type")}</Text>
            <View style={styles.wrapper}>
                <ImageButton
                    imageButtonAction={() => handleWardrobeType("woman")}
                    text="woman"
                    img={womanImg}
                />
                <ImageButton
                    imageButtonAction={() => handleWardrobeType("man")}
                    text="man"
                    img={manImg}
                />
            </View>
            </ImageBackground>
        </View>
    )
}

const styles=StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6B6D6E'
    },
    wrapper: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '500',
        width: '80%',
        color: 'white',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    subtext: {
        marginTop: 20,
        color: 'gray'
    }
})