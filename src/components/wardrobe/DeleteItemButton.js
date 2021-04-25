import React from 'react'
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert} from "react-native";
import { Feather } from '@expo/vector-icons';
import i18n from "i18n-js";
import {useDispatch} from "react-redux";
import {deleteItem, setCurrentWardrobeTab} from "../../store/actions";

export const DeleteItemButton = ({id, navigation}) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        navigation.navigate(i18n.t('wardrobe'))
        dispatch(deleteItem(id))
        dispatch(setCurrentWardrobeTab("all"))
    }

    const handlePress = () => {
        Alert.alert(
            i18n.t('delete_item'),
            i18n.t('delete_item_message'),
            [
                {
                    text: i18n.t('cancel'),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: i18n.t('ok'), onPress: () => handleDelete() }
            ],
            { cancelable: false }
        );
    }

    return(
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Feather name="trash-2" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}
