import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import i18n from "i18n-js";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentItem} from "../../store/actions";
import {BG_COLOR, BLACK_COLOR} from "../../theme";

export const BubbleTab = ({id, text, type}) => {
    const dispatch = useDispatch()
    const currentItem = useSelector(state => state.settings.currentItem)
    const [active, setActive] = useState(false)

    // console.log('Bubble ID', id)
    useEffect(() => {
        if(id != currentItem.category || id != currentItem.subcategory) {
            setActive(false)
        }
        if (id === currentItem.category || id === currentItem.subcategory) {
            setActive(true)
        }
    }, [currentItem.category, currentItem.subcategory])

    let item = currentItem
    const handlePress = () => {
        if(!active) {
            setActive(true)
        }
        else {
            setActive(false)
        }

        if(type === 'category') {
            item.brand = currentItem.brand
            item.category = id
            item.subcategory = null
            dispatch(setCurrentItem(item))
        }
        else {
            item.brand = currentItem.brand
            item.category = currentItem.category
            item.subcategory = id
            dispatch(setCurrentItem(item))
        }
    }
    return(
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.item, {backgroundColor: active ? BLACK_COLOR : BG_COLOR}]}
            activeOpacity={1}
        >
            <Text style={[styles.text, {color: active ? 'white' : BLACK_COLOR}]}>{i18n.t(text)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: BG_COLOR,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 200,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '500'
    }
})