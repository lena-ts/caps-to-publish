import React from 'react'
import {View, Text, TouchableOpacity, ScrollView, FlatList} from "react-native";
import {commonStyles} from "../styles/styles";
import {TopActions} from "../components/ui/buttons/TopActions";
import {useSelector} from "react-redux";
import {Shade} from "../components/ui/Shade";
import {ItemInCategory} from "../components/wardrobe/ItemInCategory";
import {AddButtonsModal} from "../components/modals/AddButtonsModal";

export const CategoryScreen = ({route, navigation}) => {
    const {catId} = route.params

    const addButtonsModalState = useSelector(state => state.settings.addButtonsModal)
    const categories = useSelector(state => state.categories)
    const items = useSelector(state => state.items).items
    const category = categories.categories.map(i => i.subcategories.filter(p => p.id === catId)).filter(k => k.length)[0][0]
    const currentItem = useSelector(state => state.settings.currentItem)

    const categoryitems = items.filter(item => item.type === catId)

    // console.log('catId', catId)
    // console.log('category', category)
    // console.log('categoryitems', categoryitems, categoryitems.length)
    // console.log('CURRENT ITEM IN CATEGORY', currentItem)

    const content = categoryitems.map((item, index) =>  <ItemInCategory
        key={item.id}
        id={item.id}
        title={item.brand}
        length={null}
        image={item.img}
        totalLength={categoryitems.length}
        index={index}
        navigation={navigation}
        category={catId}
    />)

    // const content2 = categoryitems.length >= 4 ? <FlatList
    //     data={categoryitems}
    //     renderItem={({ item, index }) =>
    //         <ItemInCategory
    //             key={item.id}
    //             id={item.id}
    //             title={item.brand}
    //             length={null}
    //             image={item.img}
    //             totalLength={categoryitems.length}
    //             index={index}
    //             navigation={navigation}
    //             numColumns={2}
    //         />
    //     }
    //     keyExtractor={item => item.id}
    // /> : <FlatList
    //     data={categoryitems}
    //     renderItem={({ item, index }) =>
    //         <ItemInCategory
    //             key={item.id}
    //             id={item.id}
    //             title={item.brand}
    //             length={null}
    //             image={item.img}
    //             totalLength={categoryitems.length}
    //             index={index}
    //             navigation={navigation}
    //             numColumns={2}
    //         />
    //     }
    //     keyExtractor={item => item.id}
    // />

    const addButtonsModal = addButtonsModalState ? <AddButtonsModal/> : null

    return(
        <View style={commonStyles.view}>
            <TopActions/>
            {addButtonsModal}
            <ScrollView>
                <View style={{width: '100%', flex: 1, flexDirection: 'row',  flexWrap: 'wrap'}}>
                    {content}
                </View>
            </ScrollView>
            <Shade type="bottom"/>
        </View>
    )
}