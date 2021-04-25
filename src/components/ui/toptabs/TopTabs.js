import React from 'react'
import {View, FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {TopTab} from "./TopTab";
import {Shade} from "../Shade";
import {PlusButton} from "./PlusButton";

export const TopTabs = () => {
    const categories = useSelector(state => state.categories)
    // console.log('categories', categories.categories.filter(i => i.subcategories.find(p => p.items.length)))

    let categoriesPresented = categories.categories.filter(i => i.subcategories.find(p => p.items.length))

    const all = {
        id: "all",
        title: "All"
    }

    categoriesPresented = [all, ...categoriesPresented]

    // console.log('categoriesPresented', categoriesPresented.length)
    return(
        <View style={styles.tabs}>
            <View style={styles.tabsInner}>
                <FlatList
                    data={categoriesPresented}
                    renderItem={({item}) =>
                        <TopTab
                            text={item.title}
                            id={item.id}
                            initialActiveId="all"
                            />
                    }
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                />
                <View style={{marginTop: -10}}>
                    <PlusButton/>
                </View>
            </View>
            <Shade type='top'/>
        </View>
    )
}

const styles=StyleSheet.create({
    tabs: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        width: '100%',
        paddingTop: 50,
    },
    tabsInner: {
        paddingLeft: 20,
        paddingRight: 5,
        paddingBottom: 10,
        zIndex: 1,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    list: {
        width: '100%',
        zIndex: 2,
    }
})