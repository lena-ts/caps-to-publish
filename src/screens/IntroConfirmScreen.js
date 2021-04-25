import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import {ImageButton} from "../components/ui/buttons/ImageButton";
import i18n from 'i18n-js';
import {commonStyles} from "../styles/styles";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {setWardrobeType} from "../store/actions";

export const IntroConfirmScreen = ({route, navigation}) => {
    const dispatch = useDispatch()
    const {wardrobe} = route.params
    const image = wardrobe === "woman" ? require('../../assets/pro_bg3_min.png') : require('../../assets/man_wardrobe_bg.png')

    const handlePress = (type) => {
        if(type === "back") {
            navigation.navigate("Intro")
        }
        else if (type === "confirm") {
            dispatch(setWardrobeType(wardrobe))
        }
    }

    return(
        <View style={commonStyles.view}>
            <ImageBackground
                source={image}
                style={styles.bg}
            >
            <Text style={styles.title}>{i18n.t(wardrobe)}</Text>
            <View style={styles.wrapper}>
                <ImageButton
                    imageButtonAction={() => handlePress("back")}
                    text="back"
                    img={null}
                    icon= {<Ionicons name="ios-arrow-back" size={16} color="black" style={{marginRight: 5}}/>}
                />
                <ImageButton
                    imageButtonAction={() => handlePress("confirm")}
                    text="confirm"
                    img={null}
                    icon={<AntDesign name="check" size={16} color="black" style={{marginRight: 5}}/>}
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
        fontSize: 50,
        textAlign: 'center',
        fontWeight: '500',
        width: '80%',
        color: 'white'
    }
})