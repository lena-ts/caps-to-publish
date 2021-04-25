import React, {useEffect, useState} from 'react'
import {View, Text} from "react-native";
import {commonStyles} from '../styles/styles'
import {useSelector} from "react-redux";
import {EmptyScreen} from "../components/EmptyScreen";
import {Shade} from "../components/ui/Shade";
import {OneItemScreen} from "../components/look/OneItemScreen";
import {FiveItemsGrid} from "../components/look/FiveItemsGrid";
import {AddButtonsModal} from "../components/modals/AddButtonsModal";
import {AdMobInterstitial} from "expo-ads-admob";

export const LookScreen = () => {
    const items = useSelector(state => state.items)
    const addButtonsModalState = useSelector(state => state.settings.addButtonsModal)
    const [time, setTime] = useState(false)
    const pro = useSelector(state => state.settings.proPurchased)

    const addButtonsModal = addButtonsModalState ? <AddButtonsModal/> : null

    // useEffect(() => {
    //     if (time) {
    //         const timer = setTimeout(() => {
    //             setTime(false)
    //         }, 35000);
    //         return () => clearTimeout(timer);
    //     }
    //
    //     const showBanner = async () => {
    //         // await AdMobInterstitial.setAdUnitID('ca-app-pub-3485393765261217/8637141953'); //Real ID
    //         await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910'); //Test ID
    //         await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    //         await AdMobInterstitial.showAdAsync();
    //     }
    //     if (!pro) {
    //         if (!time) {
    //             showBanner()
    //             setTime(true)
    //         }
    //     }
    // }, [time])

    const content = items.items.length ?
        items.items.length <= 1 ? <OneItemScreen/> :
        <FiveItemsGrid/> :
        <EmptyScreen text="look_empty"/>

    const shade = items.items.length > 1 ? <Shade type='bottom'/> :  null
    return(
        <View style={commonStyles.view}>
            {addButtonsModal}
            {content}
            {shade}
        </View>
    )
}