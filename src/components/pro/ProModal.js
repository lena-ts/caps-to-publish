import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Modal, TouchableOpacity, Text} from "react-native";
import {ProContent} from "./ProContent";
import { AntDesign } from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {setAddButtonsModal, setCurrentItem, setProModalShow} from "../../store/actions";
import i18n from "i18n-js";

export const ProModal = () => {
    const dispatch = useDispatch()
    const proModal = useSelector(state => state.settings.proModalShow)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(proModal) {
            setModalVisible(!modalVisible)
            dispatch(setProModalShow(false))
            dispatch(setAddButtonsModal(false))
            dispatch(setCurrentItem({}))
        }
    }, [proModal])
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <TouchableOpacity style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{color: 'white', marginRight: 5}}>{i18n.t("Not now, thanks")}</Text>
                    <AntDesign name="close" size={14} color="white" />
                </TouchableOpacity>
                <ProContent text={i18n.t("You've Reached 20 Items Free Limit")}/>
            </Modal>
    )
}

const styles = StyleSheet.create({
    close: {
        position: "absolute",
        top: 30,
        right: 20,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});