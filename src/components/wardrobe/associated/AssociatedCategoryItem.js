import React, {useEffect} from 'react'
import {View, ImageBackground, StyleSheet, Text, TouchableOpacity, Dimensions} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentAssociatedCategory, setAssociatedCategoriesHistory} from "../../../store/actions";
import i18n from "i18n-js";

export const AssociatedCategoryItem = ({title,  itemId, length,  numberOfAllCategories, index, selectedItemId, finalItem, setSortOption}) => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items).items
    const item = itemId ? items.find(item => item.id === itemId) : null

    const itemAssociatedArrayIds = finalItem.associated
    const associatedItems = items.filter(i => i.id === itemAssociatedArrayIds.find(p => p === i.id))

    const associatedItemsWithSelectedCategory =
        associatedItems.filter(k => k.category === selectedItemId).length ||
        associatedItems.filter(k => k.type === selectedItemId).length

    const image = item ? item.img : null

    useEffect(() => {
        setSortOption(selectedItemId, associatedItemsWithSelectedCategory)
    }, [])

    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width

    const reminder = numberOfAllCategories % 2

    let width
    let height

    // console.log('length', title, length)
    // console.log('itemHasAssociated',  associatedItems, selectedItemId)
    // console.log('associatedItemsWithSelectedCategory',  associatedItemsWithSelectedCategory)

    let actualLength = typeof length === 'number' ? length : length.reduce((prev, current) => prev + current)

    if (numberOfAllCategories === 1) {
        width = windowWidth
        height = 250
    }
    else if(numberOfAllCategories === 2) {
        width = windowWidth/2
        height = 250
    }
    else {
        width = windowWidth/2
        height = windowWidth/2
    }

    const handlePress = () => {
        dispatch(setCurrentAssociatedCategory(selectedItemId))
        // dispatch(setAssociatedCategoriesHistory(selectedItemId))
        // console.log('clicked category', selectedItemId)
    }

    return(
        <TouchableOpacity onPress={handlePress} activeOpacity={0.2}>
            <ImageBackground
                source={{ uri: image }}
                style={[styles.image, {
                    width: numberOfAllCategories >2 && reminder === 1 && index === numberOfAllCategories - 1 ? windowWidth : width,
                    height: numberOfAllCategories >2 && reminder === 1 && index === numberOfAllCategories - 1 ? height : height,
                    // opacity: associatedItemsWithSelectedCategory === 0 ? 0.5 : 1
                },
                    ]}
            >
                <Text style={styles.length}>{associatedItemsWithSelectedCategory}/{length ? actualLength : null}</Text>
                <Text style={styles.title}>{i18n.t(selectedItemId)}</Text>
                <View style={styles.shade}></View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },
    length: {
        color: 'white',
        fontWeight: '600',
        fontSize:20,
        marginBottom: 10,
        zIndex: 1,
        // position: 'absolute',
        // top: 15,
        // right: 15
    },
    title: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        zIndex: 1,
        position: 'absolute',
        left: 15,
        top: 15
    },
    shade: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        position: 'absolute',
        zIndex: 0
    }
})