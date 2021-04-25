import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {BubbleTab} from "../ui/BubbleTab";
import i18n from "i18n-js";

export const AddCategories = () => {
    const categories = useSelector(state => state.categories).categories

    const currentCategory = useSelector(state => state.settings.currentItem)

    const subcategories = currentCategory.category ? categories.find(item => item.id === currentCategory.category).subcategories : null


    const subCategoriesWrapper = subcategories ?  <ScrollView>
        <View style={[styles.categories, {paddingBottom: 40}]}>
        {subcategories.map(item => <BubbleTab key={item.id} id={item.id} text={item.title} type={'subcategory'}/>)}
        </View>
    </ScrollView> : null

    return(
        <View style={styles.wrapper}>
            <Text style={styles.text}>{i18n.t("choose_category")}</Text>
            <View style={styles.categories}>
                {categories.map(item => <BubbleTab key={item.id} text={item.title} id={item.id} type={'category'}/>)}
            </View>
            <Text style={styles.text}>{i18n.t("choose_subcategory")}</Text>
            {subCategoriesWrapper}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        paddingBottom: 40
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    categories: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})