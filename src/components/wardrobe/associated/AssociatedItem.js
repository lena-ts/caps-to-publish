import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions} from "react-native";
import { Feather } from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {setAssociatedItem} from "../../../store/actions";

export const AssociatedItem = ({title, image, length, index, id, finalItem}) => {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)

    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width

    const reminder = length % 2

    let width
    let height

    if (length === 1) {
        width = windowWidth
        height = 250
    }
    else if(length === 2) {
        width = windowWidth/2
        height = 250
    }
    else {
        width = windowWidth/2
        height = windowWidth/2
    }

    useEffect(() => {
        if(finalItem.associated.find(i=> i === id)) {
            setChecked(true)
        }
        else {
            setChecked(false)
        }
    }, [])


    const handlePress = () => {
        if(!checked) {
            setChecked(true)
            dispatch(setAssociatedItem(finalItem.id, id, 'set'))
            console.log('item to associate', id)
        }
        else {
            setChecked(false)
            dispatch(setAssociatedItem(finalItem.id, id, 'unset'))
        }

    }

    // console.log('finalItem', finalItem, 'id2:', id, typeof id)


    return(
        <TouchableOpacity  onPress={handlePress} activeOpacity={0.9} >
            <ImageBackground
                source={{ uri: image }}
                style={[styles.image, {
                    width: length >2 && reminder === 1 && index === length - 1 ? windowWidth : width,
                    height: length >2 && reminder === 1 && index === length - 1 ? height : height}]}
            >
                <View
                    style={[styles.checkPoint, {backgroundColor: checked ? 'white' : 'transparent'}]}
                >
                    {checked ? <Feather name="check" size={24} color="black" /> : null}
                </View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.shade}></View>
            </ImageBackground>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: 200,
        height: 200
    },
    title: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        zIndex: 1,
        position: 'absolute',
        left: 15,
        top: 15,
        width: '70%'
    },
    shade: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        position: 'absolute',
        zIndex: 0
    },
    checkPoint: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 2,
        position: 'absolute',
        borderColor: 'white',
        top: 15,
        right: 15,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})