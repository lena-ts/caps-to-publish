import React, {useRef} from 'react'
import {TouchableOpacity, Text, StyleSheet, View, ScrollView, FlatList} from "react-native";
import {Swipeable} from 'react-native-gesture-handler'
import {windowWidth} from "../../theme";
import i18n from "i18n-js";

export const LookSection = ({section, style, handler, categories, activeCategory, categoryCallback, largeSection}) => {
    // console.log('activeCategory', activeCategory)
    // console.log('categories', categories)
    const swipeRef = useRef(null);

    const handleCallbackPress = (item) => {
        categoryCallback(item)
        swipeRef.current.close()
    }

    const RightAction = () => (
            <View style={styles.total_wrapper}>
                <ScrollView style={styles.scrollView}>
                <View style={[styles.total_wrapper_inner, largeSection ? {paddingTop: 90} : null]}>
                {categories.map(item =>
                    <TouchableOpacity
                        style={styles.wrapper}
                        key={item.id}
                        onPress={() => handleCallbackPress(item)}
                    >
                        <View style={[styles.wrap, item.id === activeCategory.id ? styles.wrap_active : null]}>
                            <Text style={[styles.text, item.id === activeCategory.id ? styles.text_active : null]}>{i18n.t(item.title)}</Text>
                        </View>
                    </TouchableOpacity>)}
                </View>
                </ScrollView>
            </View>
               )
    return(
        //Categories to choose
        <Swipeable
            style={style}
            renderRightActions={categories && categories.length > 1 ? RightAction : null}
            ref={swipeRef}
        >
            <View style={style}>
                <TouchableOpacity
                onPress={handler}
                style={{width: '100%'}}
                >
                {section}
                </TouchableOpacity>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    total_wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        flex: 1
    },
    total_wrapper_inner: {
        marginTop: 20,
        // paddingLeft: 20,
        // paddingRight: 20,
        // backgroundColor: 'red',
        // flex: 1,
        // flexDirection: 'column',
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: '100%',
        paddingBottom: 100
    },
    // scrollView: {
    //     backgroundColor: 'pink'
    // },
    wrapper: {
        // position: 'absolute',
        // zIndex: 20,
        // bottom: 10,
        // left: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // padding: 20
    },
    wrap: {
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 100,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333'
    },
    wrap_active: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white'
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    },
    text_active: {
        color: 'black'
    }
})
