import React from 'react'
import {View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet} from "react-native";
import {DARK_SHADE} from "../../theme";

export const ItemInCategory = ({title, image, totalLength, index, navigation, id, category}) => {

    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width

    const reminder = totalLength % 2

    let finalHeight
    let finalWidth

    if(totalLength === 1) {
        finalHeight = windowHeight
        finalWidth = windowWidth
    }
    else if(totalLength === 2) {
        finalHeight = windowHeight/2
        finalWidth = windowWidth
    }
    else if(totalLength === 3) {
        finalHeight = windowHeight/3
        finalWidth = windowWidth
    }
    else if(totalLength === 4 && reminder === 0) {
        finalHeight = windowHeight/2
        finalWidth = windowWidth/2
    }
    else if(totalLength === 5) {
        finalHeight = windowHeight/2
        finalWidth = windowWidth/2
    }
    else if(totalLength === 6) {
        finalHeight = windowHeight/3
        finalWidth = windowWidth/2
    }
    else if(totalLength > 6) {
        finalHeight = windowHeight/4
        finalWidth = windowWidth/2
    }
    else {
        finalHeight = windowHeight
        finalWidth = windowWidth
    }

    // console.log('CAT ITEM IN CAT', category)

    const handlePress = () => {
        navigation.navigate('Item', {
            itemId: id,
            catId: category
        })
    }


    return(
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <ImageBackground
                source={{ uri: image }}
                style={[styles.image, {width: totalLength >4 && reminder === 1 && index === 0 ? windowWidth : finalWidth, height: finalHeight}]}
            >
                <View style={styles.description}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image:{

    },
    description: {
        flex: 1,
        width: '100%',
        backgroundColor: DARK_SHADE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    length: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
})