import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {PINK_COLOR} from "../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWardrobeTab} from "../../../store/actions";
import i18n from 'i18n-js';

export const TopTab = ({text, filterTabs, initialActiveId, id}) => {
    const dispatch = useDispatch()

    const currentWardrobeTab = useSelector(state=>state.settings.currentWardrobeTab)

    const handlePress = (event) => {
        dispatch(setCurrentWardrobeTab(id))
    }

    const dot = currentWardrobeTab === id ? <View style={styles.dot}></View> : null
    return(
        <TouchableOpacity onPress={handlePress} style={styles.tab}>
            <Text style={styles.text}>{i18n.t(id)}</Text>
            {dot}
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    tab: {
        alignItems: 'center',
        marginRight: 20,
        paddingBottom: 10
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 17,
    },
    dot: {
        backgroundColor: PINK_COLOR,
        width: 5,
        height: 5,
        borderRadius: 100,
        position: 'absolute',
        bottom: 0

    }
})