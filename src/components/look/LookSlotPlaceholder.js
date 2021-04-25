
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setAddButtonsModal, setAddItemModal} from "../../store/actions";

export const LookSlotPlaceholder = ({text}) => {
    const dispatch = useDispatch()
    const handlePress = () => {
        dispatch(setAddButtonsModal(true))
        // dispatch(setAddItemModal(true, 'add'))
    }
    return(
        <View style={styles.wrap}>
            <TouchableOpacity
                style={styles.link}
                onPress={handlePress}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    wrap: {
        backgroundColor: '#A3A3A3',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    link: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})