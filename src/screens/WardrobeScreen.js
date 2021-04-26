import React  from 'react'
import {View} from "react-native";
import {commonStyles} from '../styles/styles'
import {useSelector} from "react-redux";
import {MainList} from "../components/wardrobe/MainList";
import {EmptyScreen} from "../components/EmptyScreen";
import {AddItemModal} from "../components/AddItemModal";
import {AddButtonsModal} from "../components/modals/AddButtonsModal";

export const WardrobeScreen = ({navigation}) => {
    const items = useSelector(state => state.items)
    const addButtonsModalState = useSelector(state => state.settings.addButtonsModal)

    const content = items.items.length ? <MainList navigation={navigation}/> :
        <EmptyScreen
            text="wardrobe_empty"
            />

    const addButtonsModal = addButtonsModalState ? <AddButtonsModal/> : null

    return(
        <View style={commonStyles.view}>
            {addButtonsModal}
            <AddItemModal />
            {content}
        </View>
    )
}