import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {commonStyles} from "../styles/styles";
import {TopActions} from "../components/ui/buttons/TopActions";
import {LinearGradient} from "expo-linear-gradient";
import {Shade} from "../components/ui/Shade";
import {AssociatedCategories} from "../components/wardrobe/associated/AssociatedCategories";
import {
    editItem,
    setCurrentAssociatedCategory,
    setAssociatedCategoriesHistory,
    setAddItemModal, setTransferImage, setCurrentItem
} from "../store/actions";
import {Entypo} from "@expo/vector-icons";
import i18n from "i18n-js";

export const ItemScreen = ({route}) => {
    const dispatch = useDispatch()
    const {itemId} = route.params
    const items = useSelector(state => state.items).items
    const finalItem = items.find(i => i.id === itemId)


    const [brandValue, setBrandValue] = useState(finalItem ? finalItem.brand : "")

    const windowHeight = Dimensions.get('window').height

    const currentAssociatedCategory = useSelector(state => state.settings.currentAssociatedCategory)
    let historyArray = useSelector(state => state.settings.associatedCategoriesHistory).slice(0,2)
    let backCategory

    useEffect(() => {
        if(currentAssociatedCategory != 'all') {
            dispatch(setCurrentAssociatedCategory('all'))
        }
    }, [])

    backCategory = historyArray[historyArray.length - 1]

    useEffect(() => {
        if(currentAssociatedCategory === 'all') {
            dispatch(setAssociatedCategoriesHistory('clear'))
        }
        if(currentAssociatedCategory) {
            dispatch(setAssociatedCategoriesHistory(currentAssociatedCategory, "push"))
        }

        if(finalItem) {
            setBrandValue(finalItem.brand)
        }

    }, [currentAssociatedCategory, finalItem])


    const handleChangeText = text => {
        setBrandValue(text)
    }
    let item = finalItem ? finalItem : {}
    const handleEndEditing = () => {
        item.brand = brandValue
        dispatch(editItem(finalItem.id, item))
    }


    // console.log('currentAssociatedCategory', currentAssociatedCategory)
    // console.log('backCategory', backCategory)

    // console.log('ITEMS', items)

    const handleBack = () => {
        dispatch(setAssociatedCategoriesHistory(null, "pop"))
        dispatch(setCurrentAssociatedCategory(backCategory))
    }

    // console.log('historyArray', historyArray)

    const backButton = currentAssociatedCategory != 'all' ? <TouchableWithoutFeedback onPress={handleBack}>
        <Entypo name="chevron-small-left"
                size={24}
                color="white"/>
    </TouchableWithoutFeedback> : null

    const associatedCategories = finalItem ? <AssociatedCategories
        category={finalItem.category}
        finalItem={finalItem}
    /> : null

    const handleEditItemCategory =() => {
        let category = finalItem ? finalItem.category : null
        let subcategory = finalItem ? finalItem.type : null
        console.log('category + subcategory', category, subcategory)

        let item = {
            brand: finalItem.brand,
            img: finalItem.img,
            color: "",
            subcategory: finalItem.type,
            category: finalItem.category,
            associated: finalItem.associated,
            id: finalItem.id
        }

        dispatch(setAddItemModal(true, 'edit'))
        dispatch(setTransferImage(finalItem.img))
        dispatch(setCurrentItem(item))
    }

    return(
        <View style={commonStyles.view}>
            <TopActions/>
            <ScrollView style={styles.wrapper}>
                <View style={[styles.imageContainer, {height: windowHeight -250}]}>
                    <ImageBackground source={{ uri: finalItem ? finalItem.img : null}} style={styles.image}>
                        <View style={styles.textWrapper}>
                            <TextInput
                                style={styles.brand}
                                value={brandValue}
                                onChangeText={handleChangeText}
                                onEndEditing={handleEndEditing}
                                returnKeyType="done"
                            />
                            <TouchableOpacity onPress={handleEditItemCategory}>
                                <Text style={styles.type}>
                                    {i18n.t(finalItem ? finalItem.category : null)} / {i18n.t(finalItem ? finalItem.type : null)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.wearwith}>
                            {backButton}
                            <Text style={styles.wearwithText}>{i18n.t('Wear It With')} {currentAssociatedCategory != 'all' ? i18n.t(currentAssociatedCategory): null}</Text>
                        </View>
                            <LinearGradient
                                colors={['transparent',  'rgba(0,0,0,0.5)']}
                                style={[styles.shade, {height: 100, bottom: 0}]}
                            />
                    </ImageBackground>
                </View>
                <View style={styles.associated}>
                    {associatedCategories}
                </View>
            </ScrollView>
            <Shade type="bottom"/>
        </View>
    )
}
const styles=StyleSheet.create({
    wrapper: {
        flex: 1,
        // alignItems: 'center',
        // flexDirection: "column",
        width: '100%',
        // position: 'relative'
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        // height: 200
    },
    image: {
        flex: 3,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    brand: {
        // fontSize: 22,
        fontSize: 26,
        fontWeight: '600',
        color: 'white'
    },
    type: {
        color: 'white',
        fontSize: 16,
        marginTop: 10
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    shade: {
        width: '100%',
        position: 'absolute',
        zIndex: 0
    },
    wearwith: {
        position: 'absolute',
        bottom: 30,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    wearwithText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 6
    },
    associated: {
        flex: 1
    }
})