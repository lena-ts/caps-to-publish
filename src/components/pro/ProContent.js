import React from 'react'
import {View, Text, ImageBackground, StyleSheet} from "react-native";
import {ProButton} from "./ProButton";
import {BLACK_COLOR, PINK_COLOR} from "../../theme";
import i18n from "i18n-js";

export const ProContent = ({text, navigation}) => {
    const image = require('../../../assets/pro_bg3_min.png')
    return(
        <View style={{backgroundColor: BLACK_COLOR}}>
            <ImageBackground
                source={image}
                style={styles.bg}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{i18n.t(text)}</Text>
                    <Text style={styles.subtitle}>{i18n.t("upgrade_to_pro")}:</Text>
                    <View style={styles.features}>
                        <View style={styles.feature}>
                            <View style={styles.dot}></View>
                            <Text style={styles.feature_text}>{i18n.t("unlimited_items_to_add")}</Text>
                        </View>
                        <View style={styles.feature}>
                            <View style={styles.dot}></View>
                            <Text style={styles.feature_text}>{i18n.t("remove_ads")}</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <ProButton
                            navigation={navigation}
                            text={
                            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                                {i18n.t("forever")} $1.99</Text>
                        }/>
                        {/*<ProButton text={*/}
                        {/*    <View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
                        {/*        <View><Text style={{fontWeight: '600', color: 'white', fontSize: 20}}>$1.99 / Month</Text></View>*/}
                        {/*        <View><Text style={{color: 'white'}}>Renews automatically</Text></View>*/}
                        {/*    </View>*/}
                        {/*}/>*/}
                    </View>
                    <View style={styles.footer}>
                        <View><Text style={styles.footer_restore}>{i18n.t("restore_purchases")}</Text></View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.footer_link}>EULA</Text>
                            <Text style={styles.footer_link}>{i18n.t("privacy_policy")}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '80%',
    },
    title: {
        fontSize: 33,
        color: 'white',
        fontWeight: '500',
        width: '80%'
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 100,
        backgroundColor: PINK_COLOR,
        marginRight: 10
    },
    features: {
        marginTop: 20
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5
    },
    feature_text: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    star: {
        marginRight: 10
    },
    buttons: {
        marginTop: 30,
        width: '100%'
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    footer_restore: {
        color: 'white',
        marginBottom: 25,
        fontSize: 16,
        fontWeight: '500'
    },
    footer_link: {
        color: 'white',
        textDecorationLine: 'underline',
        margin: 6,
        fontSize: 16,
        fontWeight: '500'
    }
})