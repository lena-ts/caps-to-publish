import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setAddButtonsModal, setCurrentItem} from "../../../store/actions";
import {categories_woman} from "../../../store/data/categories_woman";

export const PlusButton = ({prestate}) => {
    const dispatch = useDispatch()

    const prestateCurrent = {
        brand: null,
        subcategory: prestate ? prestate : null,
        category: prestate ? categories_woman.categories.find(item => item.subcategories.find(p=>p.id === prestate)).id : null
    }

    const handlePress = () => {
       dispatch(setAddButtonsModal(true))

        if(prestate) {
            dispatch(setCurrentItem(prestateCurrent))
        }
    }

    return(
        <TouchableOpacity style={styles.plus} onPress={handlePress}>
            <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    plus: {
        width: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: -10
    },
    plusText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600'
    },
})
