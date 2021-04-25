import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Modal} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {setImageBrowserModal} from "../../store/actions";
import {ImageBrowser} from 'expo-image-picker-multiple';
import * as ImagePicker from "expo-image-picker";

export const ImageBrowserModal = () => {
    const dispatch = useDispatch()
    const imageBrowserModal = useSelector(state => state.settings.imageBrowserModal)
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
            setModalVisible(!modalVisible)
    }, [imageBrowserModal])

    console.log('imageBrowser', imageBrowserModal)
    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <ImageBrowser
                            max={10}
                            onChange={(callback) => {

                            }}
                            callback={(num, onSubmit) => {

                            }}
                        />
                        <TouchableOpacity onPress={() => dispatch(setImageBrowserModal(false))}><Text>Close</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black'
    }
});