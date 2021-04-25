import React from 'react'
import {View, Text, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image} from 'react-native'
import {DARK_SHADE} from "../../theme";
import i18n from 'i18n-js';

export const CategoryItem = ({title, image, length, totalLength, index, navigation, id}) => {

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
            finalHeight = windowHeight/3
            finalWidth = windowWidth/2
        }
        else if(totalLength > 5) {
            finalHeight = windowHeight/3
            finalWidth = windowWidth/2
        }
        else if(totalLength >= 8) {
            finalHeight = windowHeight/4
            finalWidth = windowWidth/2
        }
        else {
            finalHeight = windowHeight
            finalWidth = windowWidth
        }

    const handlePress = () => {
        navigation.navigate('Category', {
            catId: id,
            length: length
        })
    }


    return(
        <TouchableOpacity onPress={handlePress} activeOpacity={0.2}>
            <ImageBackground
                source={{ uri: image }}
                style={[styles.image, {
                    width: totalLength >4 && reminder === 1 && index === 0 ? windowWidth : finalWidth,
                    height: totalLength >4 && reminder === 1 && index === 0 ? finalHeight + 50 : finalHeight
                }
                    ]}
            >
                <View style={styles.description}>
                    <Text style={styles.title}>{i18n.t(id)}</Text>
                    <Text style={styles.length}>{length}</Text>
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
        fontSize: 16
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        // position: 'absolute',
        // bottom: 15,
        // left: 15
    }
})