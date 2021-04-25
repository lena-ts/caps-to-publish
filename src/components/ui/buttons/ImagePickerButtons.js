import React, {useEffect} from 'react'
import {View, StyleSheet} from "react-native";
import {ImagePickerButton} from "./ImagePickerButton";
import {useDispatch} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {setAddButtonsModal, setAddItemModal, setImageBrowserModal} from "../../../store/actions";
import {setTransferImage} from "../../../store/actions";

export const ImagePickerButtons = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync() && await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleUploadImagePressed = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            allowsMultipleSelection: true
        });

        dispatch(setAddButtonsModal(false))

        if (!result.cancelled) {
            dispatch(setAddItemModal(true, 'add'))
            dispatch(setTransferImage(result.uri))
        }
        // dispatch(setImageBrowserModal(true))
    }

    const handleCameraPressed = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.cancelled) {
            dispatch(setAddItemModal(true, 'add'))
            dispatch(setAddButtonsModal(false))
            dispatch(setTransferImage(result.uri))
        }

    }

    const cameraImg = require('../../../../assets/camera.png')
    const galleryImg = require('../../../../assets/gallery.png')
    return(
        <View style={styles.wrapper}>
            <ImagePickerButton uploadImagePressed={handleCameraPressed} text='take_photo_btn' img={cameraImg}/>
            <ImagePickerButton uploadImagePressed={handleUploadImagePressed} text='gallery_btn' img={galleryImg}/>
        </View>
    )
}

const styles=StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        zIndex: 20,
        position: 'absolute',
        bottom: 100
    }
})