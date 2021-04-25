import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentItem} from "../../store/actions";
import i18n from "i18n-js";

export const AddBrand = () => {
    const dispatch = useDispatch()
    const [placeholderColor, setPlaceholderColor] = useState('white')
    const currentItem = useSelector(state => state.settings.currentItem)

    const [value, setValue] = useState(currentItem.brand ? currentItem.brand : "")

    let item = currentItem
    useEffect(() => {
        item.brand = !currentItem.brand ? i18n.t("brand_name") : currentItem.brand
        dispatch(setCurrentItem(item))
    }, [])

    const handleChangeText = text => {
        setValue(text)
        if (text) {
            item.brand = value
        }
        // dispatch(setCurrentItem(item))
    }
    const handleEndEditing = () => {
        if (value) {
            item.brand = value
        }
        else {
            item.brand = i18n.t("brand_name")
        }
        dispatch(setCurrentItem(item))
        setPlaceholderColor('white')
    }
    return(
        <View>
            <TextInput
                style={styles.text}
                value={value}
                onChangeText={handleChangeText}
                onEndEditing={handleEndEditing}
                placeholder={i18n.t("brand_name")}
                placeholderTextColor={placeholderColor}
                returnKeyType="done"
                onFocus={() => setPlaceholderColor("rgba(255,255,255, 0.5)")}
            />
            <View style={styles.categoryView}>
                <Text style={styles.category}>
                    {currentItem.category != i18n.t("uncategorized") ? currentItem.category : null} {currentItem.subcategory ? '/' : null } {currentItem.subcategory}
                </Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center'
    },
    categoryView: {
        marginTop: 10
    },
    category: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18
    }
})