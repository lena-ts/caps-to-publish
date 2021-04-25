import React, {useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {AssociatedCategoryItem} from "./AssociatedCategoryItem";
import {AssociatedItem} from "./AssociatedItem";

export const AssociatedCategories = ({finalItem}) => {
    const categories = useSelector(state => state.categories).categories
    const selectedCategories = finalItem ? categories.filter(item => item.subcategories.find(i => i.items.length)).filter(i => i.id != finalItem.category) : null
    const currentAssociatedCategory = useSelector(state => state.settings.currentAssociatedCategory)
    const items = useSelector(state => state.items).items

    // const itemAssociatedArrayIds = finalItem.associated
    // const associatedItems = items.filter(i => i.id === itemAssociatedArrayIds.find(p => p === i.id))
    //
    // const associatedItemsWithSelectedCategory =
    //     associatedItems.filter(k => k.category === selectedItemId).length ||
    //     associatedItems.filter(k => k.type === selectedItemId).length

    const selectedSubcategory = categories.filter(item => item.id === currentAssociatedCategory)

    const secondLevelCategory = selectedSubcategory.length ? selectedSubcategory[0].subcategories.filter(i=>i.items.length) : null

    const thirdLevelCategory = items.filter(item => item.type === currentAssociatedCategory)

    // console.log('currentAssociatedCategory', currentAssociatedCategory)
    // console.log('thirdLevelCategory', thirdLevelCategory)
    // console.log('ITEMS', items)


    const handleSetSortOption = (selectedItemId, option) => {
        // console.log('NUMBER', selectedItemId, option)
        // selectedCategories.map(i => i.sort = 2)
        selectedCategories.map(i => {
            if(i.id === selectedItemId) {
                i.sortOption = option
            }
            return i
        }
        )

        // secondLevelCategory.map(i => {
        //         if(i.id === selectedItemId) {
        //             i.sortOption = option
        //         }
        //         return i
        //     }
        // )
    }

    useEffect(() => {
        selectedCategories.sort(function (a, b) {
            if (a.sortOption > b.sortOption) {
                return -1;
            }
            if (a.sortOption < b.sortOption) {
                return 1;
            }
            return 0;
        });
    }, [selectedCategories, handleSetSortOption])

    selectedCategories.sort(function (a, b) {
        if (a.sortOption > b.sortOption) {
            return -1;
        }
        if (a.sortOption < b.sortOption) {
            return 1;
        }
        return 0;
    });

    // secondLevelCategory.sort(function (a, b) {
    //     if (a.sortOption > b.sortOption) {
    //         return -1;
    //     }
    //     if (a.sortOption < b.sortOption) {
    //         return 1;
    //     }
    //     return 0;
    // });

    // console.log('selectedCategories', selectedCategories)

    const FirstLevel = selectedCategories.map((item, index) =>
        <AssociatedCategoryItem
            key={item.id}
            title={item.title}
            itemId={item.subcategories.filter(i => i.items.length)[0].items[0]}
            selectedItemId={item.id}
            length={item.subcategories.filter(i => i.items.length).map(i => i.items.length)}
            numberOfAllCategories={selectedCategories.length}
            index={index}
            finalItem={finalItem}
            setSortOption={handleSetSortOption}
        />
    )


    const SecondLevel = secondLevelCategory ? secondLevelCategory.map((item, index) =>
        <AssociatedCategoryItem
            key={item.id}
            title={item.title}
            itemId={item.items[0]}
            selectedItemId={item.id}
            length={item.items.length}
            numberOfAllCategories={secondLevelCategory.length}
            index={index}
            finalItem={finalItem}
            setSortOption={handleSetSortOption}
        />
    ) : null

    const ThirdLevel = thirdLevelCategory ? thirdLevelCategory.map((item, index) =>
        <AssociatedItem
            key={item.id}
            title={item.brand}
            image={item.img}
            length={thirdLevelCategory.length}
            index={index}
            finalItem={finalItem}
            id={item.id}
        />
    ) : null

    const categoryToRender = currentAssociatedCategory === 'all' ? FirstLevel : !ThirdLevel.length ? SecondLevel : ThirdLevel

    return(
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
            <ScrollView>
                <View style={{width: '100%', flex: 1, flexDirection: 'row',  flexWrap: 'wrap'}}>
                    {categoryToRender}
                </View>
            </ScrollView>
        </View>
    )
}