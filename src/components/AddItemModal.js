import {Modal, Text, View, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Shade} from "./ui/Shade";
import {DoneTopButton} from "./ui/buttons/DoneTopButton";
import {useDispatch, useSelector} from "react-redux";
import {addItem, editItem, setAddItemModal, setCurrentItem} from "../store/actions";
import {TopActions} from "./ui/buttons/TopActions";
import {AddBrand} from "./add_item/AddBrand";
import {AddCategories} from "./add_item/AddCategories";
import i18n from "i18n-js";

export const AddItemModal = () => {
    const dispatch = useDispatch()

    const [modalMain, setModal] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const img = useSelector(state => state.settings.transferImage)
    const currentItem = useSelector(state => state.settings.currentItem)
    const addItemModal = useSelector(state => state.settings.addItemModal)

    console.log('CURRENT ITEM', currentItem)
    // console.log('showCategories', showCategories)

    useEffect(() => {
        setShowCategories(false)
    }, [])

    useEffect(() => {
        if (addItemModal.value) {
            setModal(true)
        }
        else {
            setModal(false)
        }

        if (addItemModal.type === 'edit') {
            setShowCategories(true)
        }

        if (addItemModal.type === 'add') {
            if (currentItem.brand != i18n.t("brand_name") && currentItem.brand) {
                //hide categories when while adding inside category
                if (currentItem.category) {
                    setShowCategories(false)
                } else {
                    setShowCategories(true)
                }
            } else {
                setShowCategories(false)
            }
        }

    }, [addItemModal, currentItem.brand])

    const handleDone = () => {
        let item = {
            brand: currentItem.brand ? currentItem.brand : i18n.t("brand_name"),
            img: img,
            color: "",
            type: currentItem.subcategory ? currentItem.subcategory : "uncategorized",
            category: currentItem.category  ? currentItem.category : "uncategorized",
            associated: [],
            id: currentItem.id ? currentItem.id : null
        }

        if (addItemModal.type === 'add') {
            dispatch(addItem(item))
        }
        if (addItemModal.type === 'edit') {
            dispatch(editItem(currentItem.id, item))
        }
        dispatch(setCurrentItem({}))
        setShowCategories(false)
        dispatch(setAddItemModal(false, null))

        // console.log('DONE CLICKED')

        console.log('CURRENT ITEM', currentItem)
    }

    // console.log('addItemModal', addItemModal)
    // console.log('showCategories', showCategories)

    const categoriesContent = showCategories ? <AddCategories/> : null


    const handleCancel = () => {
        dispatch(setAddItemModal(false, null))
        dispatch(setCurrentItem({}))
        setShowCategories(false)
    }

    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalMain}
        >
            <TopActions>
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={styles.cancel}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <View></View>
                <DoneTopButton pressDone={handleDone}/>
            </TopActions>
            <ImageBackground source={{ uri: img }} style={styles.image}>
                 <AddBrand/>
                {categoriesContent}
                <Shade type="bottom"/>
            </ImageBackground>
        </Modal>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    cancel: {
        color: 'white',
        fontSize: 16
    }
})