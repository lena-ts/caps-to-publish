import React, {useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {commonStyles} from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import {setAddButtonsModal, setCurrentItem} from "../../store/actions";
import {ImagePickerButtons} from "../ui/buttons/ImagePickerButtons";

export const AddButtonsModal = () => {
    const dispatch = useDispatch()
    const addItemModal = useSelector(state => state.settings.addItemModal)

    useEffect(() => {
        if(addItemModal.value) {
            dispatch(setAddButtonsModal(false))
        }
    }, [addItemModal])

    const handleCancel = () => {
        dispatch(setAddButtonsModal(false))
        dispatch(setCurrentItem({}))
    }

    return(
        <View style={[commonStyles.darkShade, styles.wrapper]}>
                <TouchableOpacity onPress={handleCancel} style={styles.touchableArea}>
                    <View style={styles.modalView}>
                        <ImagePickerButtons/>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: 'rgba(0,0,0, 0.4)',
        zIndex: 1000,
        position: 'absolute',
        height: '100%'
    },
    modal: {
        flex: 1,
    },
    touchableArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView:{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
})