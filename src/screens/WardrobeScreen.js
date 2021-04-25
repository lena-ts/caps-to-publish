import React , {useState} from 'react'
import {View, Text, Modal} from "react-native";
import {commonStyles} from '../styles/styles'
import {useSelector} from "react-redux";
import {MainList} from "../components/wardrobe/MainList";
import {EmptyScreen} from "../components/EmptyScreen";
import {AddItemModal} from "../components/AddItemModal";
import {Shade} from "../components/ui/Shade";
import {AddButtonsModal} from "../components/modals/AddButtonsModal";
import {ProModal} from "../components/pro/ProModal";
import {ImageBrowserModal} from "../components/modals/ImageBrowserModal";

export const WardrobeScreen = ({navigation}) => {
    const items = useSelector(state => state.items)
    const addButtonsModalState = useSelector(state => state.settings.addButtonsModal)
    const categories = useSelector(state => state.categories)
    const pro = useSelector(state => state.settings.proPurchased)

    const settings = useSelector(state => state.settings)

    // console.log('settings', settings)

    // console.log('ITEMS', items.items)

    // console.log('addButtonsModalState', addButtonsModalState)

    const content = items.items.length ? <MainList navigation={navigation}/> :
        <EmptyScreen
            text="wardrobe_empty"
            />

    const shade = items.items.length ? <Shade type="bottom"/> : null

    const addButtonsModal = addButtonsModalState ? <AddButtonsModal/> : null

    const proModal = !pro ? <ProModal/> : null

    return(
        <View style={commonStyles.view}>
            {addButtonsModal}
            <AddItemModal />
            {/*{proModal}*/}
            {content}
            {/*{shade}*/}
            {/*<ImageBrowserModal/>*/}
        </View>
    )
}