import React, {useState, useEffect} from 'react'
import {View, FlatList, StyleSheet, ScrollView} from 'react-native'
import {useSelector} from "react-redux";
import {CategoryItem} from "./CategoryItem";
import {TopTabs} from "../ui/toptabs/TopTabs";
import {AddButtonsModal} from "../modals/AddButtonsModal";
import {ImagePickerButtons} from "../ui/buttons/ImagePickerButtons";

export const MainList = ({navigation}) => {

    const categories = useSelector(state => state.categories)
    // console.log('CATEGORIES', categories.categories)
    const data = categories.categories.map(item => item.subcategories)
    // console.log('data', data)
    const arraySliced = data.slice(1, data.length)
    const final = data[0].concat(...arraySliced).filter(item => item.items)
    const items = useSelector(state => state.items).items
    const finalArray = final.filter(i => i.items.length)
    const addButtonModal = useSelector(state => state.settings.addButtonsModal)

    const currentWardrobeTab = useSelector(state=>state.settings.currentWardrobeTab)
    // console.log('currentWardrobeTab', currentWardrobeTab)

    // console.log('categories', categories)

    const categoriesPresented = categories.categories.filter(i => i.subcategories.find(p => p.items.length))
    let categoryWithTab
       if (currentWardrobeTab != 'all') {
           categoryWithTab = categories.categories.find(i => i.id === currentWardrobeTab).subcategories.filter(p => p.items.length)
       }


    const content = currentWardrobeTab === 'all' ? finalArray.map((item, index) =>  <CategoryItem
        key={item.id}
        title={item.title}
        length={item.items ? item.items.length : null}
        image={item.items ? items.find(p => p.id === item.items[0]).img : null}
        totalLength={finalArray.length}
        index={index}
        id={item.id}
        navigation={navigation}
    />) : categoryWithTab.map((item, index) => <CategoryItem
            key={item.id}
            title={item.title}
            length={item.items ? item.items.length : null}
            image={item.items ? items.find(p => p.id === item.items[0]).img : null}
            totalLength={categoryWithTab.length}
            index={index}
            id={item.id}
            navigation={navigation}
        />)


    // const content = finalArray.map((item, index) =>  <CategoryItem
    //     key={item.id}
    //     title={item.title}
    //     length={item.items ? item.items.length : null}
    //     image={items.find(p => p.id === item.items[0]).img}
    //     totalLength={finalArray.length}
    //     index={index}
    // />)

    const modal = addButtonModal ? <AddButtonsModal/> : null

    const topTabs = categoriesPresented.length >=2 ? <TopTabs/> : null

    const imageButtons = categoriesPresented.length <2 ?  <ImagePickerButtons/> : null

    return(
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
                {topTabs}
                {imageButtons}
                {/*{modal}*/}
                <ScrollView>
                    <View style={{width: '100%', flex: 1, flexDirection: 'row',  flexWrap: 'wrap'}}>
                        {content}
                    </View>
                </ScrollView>
            {/*<FlatList*/}
            {/*    data={finalArray}*/}
            {/*    renderItem={({item}) =>*/}
            {/*        <CategoryItem*/}
            {/*            key={item.id}*/}
            {/*            title={item.title}*/}
            {/*            length={item.items ? item.items.length : null}*/}
            {/*            image={items.find(p => p.id === item.items[0]).img}*/}
            {/*            totalLength={finalArray.length}*/}
            {/*        />*/}
            {/*    }*/}
            {/*    keyExtractor={item => item.id}*/}
            {/*    style={styles.list}*/}
            {/*/>*/}
        </View>
    )
}

const styles=StyleSheet.create({
    list: {
        width: '100%'
    }
})