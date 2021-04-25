import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import {commonStyles} from "../../styles/styles";
import {windowHeight, windowWidth} from "../../theme";
import {Shade} from "../ui/Shade";
import {useDispatch, useSelector} from "react-redux";
import {LookItem} from "./LookItem";
import {LookSection} from "./LookSection";
import {setActiveLookCategory} from "../../store/actions";
import {LookSlotPlaceholder} from "./LookSlotPlaceholder";
import i18n from "i18n-js";

export const FiveItemsGrid = () => {
    const items = useSelector(state => state.items.items)
    const wardrobeType = useSelector(state => state.settings.wardrobeType)
    const activeCategoriesArray = useSelector(state => state.look)
    const dispatch = useDispatch()

    // console.log('activeCategoriesArray', activeCategoriesArray)

    //Function to get random Item
    const setRandomItem = (array) => {
        if (array) {
            if (array.length > 1) {
                return array[Math.floor(Math.random() * array.length)]
            } else {
                return array[0]
            }
        }
        else {
            return null
        }
    }

    const setRandomItemState = (array, randomItem) => {
        return setRandomItem(array.length  > 1 ? array.filter(a => a != randomItem) : array)
    }

    //CATEGORIES
    //tops
    const tops = useSelector(state => state.categories.categories).find(i => i.id === "tops").subcategories
    const top_cats = tops.filter(i => i.items.length > 0)

    //outerwear
    const outerwear = useSelector(state => state.categories.categories).find(i => i.id === "outerwear").subcategories
    const outerwear_categories = outerwear ? outerwear.filter(i => i.items.length > 0) : null
    const outerwear_cats =  outerwear ? outerwear.filter(i => i.items.length > 0).map(p => p.items) : null
    const outerwear_title = useSelector(state => state.categories.categories).find(i => i.id === "outerwear").title
    const outerwear_array = outerwear_cats.length > 1 ? outerwear_cats[0].concat(outerwear_cats.find((p, index) => index!= 0)) : outerwear_cats[0]
    const outerwear_object_to_include = {
        id: outerwear_title,
        items: outerwear_array,
        title: outerwear_title
    }

    let top_categories = []

    if (top_cats && !outerwear_categories) {
        top_categories = tops.filter(i => i.items.length > 0)
    }
    if (top_cats  && outerwear_categories) {
        top_categories = tops.filter(i => i.items.length > 0).concat(outerwear_categories)
    }
    if (outerwear_categories && !top_cats) {
        top_categories = outerwear_categories
    }

    if (wardrobeType === "woman") {
        //dresses
        const dresses = useSelector(state => state.categories.categories).find(i => i.id === "dresses").subcategories
        const dresses_cats = dresses ? dresses.filter(i => i.items.length > 0).map(p => p.items) : null
        const dresses_title = useSelector(state => state.categories.categories).find(i => i.id === "dresses").title
        const dresses_array = dresses_cats > 1 ? dresses_cats[0].concat(dresses_cats.find((p, index) => index != 0)) : dresses_cats[0]
        const dresses_object_to_include = {
            id: dresses_title,
            items: dresses_array,
            title: dresses_title
        }
        if (dresses_cats.length) {
            top_categories = tops.filter(i => i.items.length > 0).concat(dresses_object_to_include)
        }

        if (dresses_cats.length && outerwear_cats.length) {
            top_categories = tops.filter(i => i.items.length > 0).concat(dresses_object_to_include, outerwear_object_to_include)
        }
    }


    // console.log('top_categories', top_categories)
    // console.log('top_cats', top_cats)
    // console.log('outerwear_cats', outerwear_cats)
    // console.log('outerwear_categories', outerwear_categories)
    // // console.log('dresses_title', dresses_title)
    // console.log('outerwear_array', outerwear_array)
    // console.log('outerwear_object_to_include', outerwear_object_to_include)
    const [random_top_category, setRandTopCats] = useState(setRandomItem(top_categories))

    // let top_categories1 = top_categories.length > 1 ? top_categories.filter(i => i.id != random_top_category.id) : tops.filter(i => i.items.length > 0)
    let top_categories1 = top_categories.length > 1 ? top_categories.filter(i => i.id != random_top_category.id) : null
    const [random_top_category1, setRandTopCats1] = useState(setRandomItem(top_categories1))

    //bottoms
    const bottoms = useSelector(state => state.categories.categories).find(i => i.id === "bottom").subcategories
    const bottom_categories = bottoms.filter(i => i.items.length > 0)
    const [random_bottom_category, setRandBottomCats] = useState(setRandomItem(bottom_categories))

    //shoes
    const shoes = useSelector(state => state.categories.categories).find(i => i.id === "shoes").subcategories
    const shoes_categories = shoes.filter(i => i.items.length != 0)
    const [random_shoes_category, setRandShoesCats] = useState(setRandomItem(shoes_categories))

    // console.log('shoes_categories', shoes_categories)

    //bags
    const bags = useSelector(state => state.categories.categories).find(i => i.id === "bags").subcategories
    const bags_categories = bags.filter(i => i.items.length > 0)
    //accessories
    const accessories = useSelector(state => state.categories.categories).find(i => i.id === "accessories").subcategories
    const accessories_cats = accessories.filter(i => i.items.length > 0)

    // console.log('accessories_cats', accessories_cats)
    // console.log('bags_categories', bags_categories)

    let accessories_categories = []

    if (bags_categories && !accessories_cats) {
        accessories_categories = bags_categories
    }
    if (!bags_categories && accessories_cats) {
        accessories_categories = accessories_cats
    }
    if (bags_categories && accessories_cats) {
        accessories_categories = bags_categories.concat(accessories_cats)
    }
    // console.log('accessories_categories', accessories_categories)

    const [random_accessories_category, setRandAccessoriesCats] = useState(setRandomItem(accessories_categories))

    //Section1
    const [randomSection1, setRandomSection1] = useState(random_top_category ? setRandomItem(random_top_category.items) : null)
    const getRandomSection1 = () => {
        if (random_top_category) {
            setRandomSection1(setRandomItemState(random_top_category.items, randomSection1))
        }
    }

    let item_section1 = items.find(i => i.id === randomSection1)

    //Section2 - tshirts
    const [randomSection2, setRandomSection2] = useState(random_top_category1 ? setRandomItem(random_top_category1.items) : null)
    const getRandomSection2 = () => {
        if (random_top_category1) {
            setRandomSection2(setRandomItemState(random_top_category1.items, randomSection2))
        }
    }

    let item_section2 = items.find(i => i.id === randomSection2)

    //Section3
    const [randomSection3, setRandomSection3] = useState(random_bottom_category ? setRandomItem(random_bottom_category.items) : null)
    const getRandomSection3 = () => {
        if (random_bottom_category) {
            setRandomSection3(setRandomItemState(random_bottom_category.items, randomSection3))
        }
    }

    let item_section3 = items.find(i => i.id === randomSection3)

    //Section4 - shoes
    const [randomSection4, setRandomSection4] = useState(random_shoes_category ? setRandomItem(random_shoes_category.items) : null)
    const getRandomSection4 = () => {
        if (random_shoes_category) {
            setRandomSection4(setRandomItemState(random_shoes_category.items, randomSection4))
        }
    }

    let item_section4 = items.find(i => i.id === randomSection4)

    //Section5 - accessories
    const [randomSection5, setRandomSection5] = useState(random_accessories_category ? setRandomItem(random_accessories_category.items) : null)
    const getRandomSection5 = () => {
        if (random_accessories_category) {
            setRandomSection5(setRandomItemState(random_accessories_category.items, randomSection5))
        }
    }

    let item_section5 = items.find(i => i.id === randomSection5)

    // useEffect(() => {
    //     getRandomSection1()
    //     getRandomSection2()
    //     getRandomSection3()
    //     getRandomSection4()
    //     getRandomSection5()
    // }, [items])

    // useEffect(() => {
    //     setRandTopCats(setRandomItem(top_categories))
    //     setRandTopCats1(setRandomItem(top_categories1))
    //     setRandBottomCats(setRandomItem(bottom_categories))
    //     setRandShoesCats(setRandomItem(shoes_categories))
    //     setRandAccessoriesCats(setRandomItem(accessories_categories))
    //
    //     random_top_category ? setRandomSection1(setRandomItemState(random_top_category.items, randomSection1)) : null
    //     random_top_category1 ? setRandomSection2(setRandomItemState(random_top_category1.items, randomSection2)) : null
    //     random_bottom_category ? setRandomSection3(setRandomItemState(random_bottom_category.items, randomSection3)) : null
    //     random_shoes_category ? setRandomSection4(setRandomItemState(random_shoes_category.items, randomSection4)) : null
    //     random_accessories_category ? setRandomSection5(setRandomItemState(random_accessories_category.items, randomSection5)) : null
    //
    //
    // }, [bottom_categories, shoes_categories, accessories_categories, top_categories, top_categories1])

    // useEffect(() => {
    //     setRandTopCats(setRandomItem(top_categories))
    //     setRandTopCats1(setRandomItem(top_categories1))
    //     setRandBottomCats(setRandomItem(bottom_categories))
    //     setRandShoesCats(setRandomItem(shoes_categories))
    //     setRandAccessoriesCats(setRandomItem(accessories_categories))
    // }, [items])

    // useEffect(() => {
    //     random_top_category ? setRandomSection1(setRandomItemState(random_top_category.items, randomSection1)) : null
    //     random_top_category1 ? setRandomSection2(setRandomItemState(random_top_category1.items, randomSection2)) : null
    //     random_bottom_category ? setRandomSection3(setRandomItemState(random_bottom_category.items, randomSection3)) : null
    //     random_shoes_category ? setRandomSection4(setRandomItemState(random_shoes_category.items, randomSection4)) : null
    //     random_accessories_category ? setRandomSection5(setRandomItemState(random_accessories_category.items, randomSection5)) : null
    //
    //
    // }, [bottom_categories, shoes_categories, accessories_categories, top_categories, top_categories1])

    // useEffect(() => {
    //     // setRandTopCats(setRandomItem(top_categories))
    //     random_top_category ? setRandomSection1(setRandomItemState(random_top_category.items, randomSection1)) : null
    // }, [top_categories])
    // useEffect(() => {
    //     // setRandTopCats1(setRandomItem(top_categories1))
    //     random_top_category1 ? setRandomSection2(setRandomItemState(random_top_category1.items, randomSection2)) : null
    // }, [top_categories1])
    // useEffect(() => {
    //     // setRandBottomCats(setRandomItem(bottom_categories))
    //     random_bottom_category ? setRandomSection3(setRandomItemState(random_bottom_category.items, randomSection3)) : null
    // }, [bottom_categories])
    // useEffect(() => {
    //     // setRandShoesCats(setRandomItem(shoes_categories))
    //     random_shoes_category ? setRandomSection4(setRandomItemState(random_shoes_category.items, randomSection4)) : null
    // }, [shoes_categories])
    // useEffect(() => {
    //     // setRandAccessoriesCats(setRandomItem(accessories_categories))
    //     if(random_accessories_category) {
    //         random_accessories_category ? setRandomSection5(setRandomItemState(random_accessories_category.items, randomSection5)) : null
    //     }
    // }, [accessories_categories])


    //Callbacks
    const getCategoryCallback = (item) => {
        setRandomSection1(setRandomItemState(item.items, randomSection1))
        setRandTopCats(item)
    }

    const getCategoryCallback2 = (item) => {
        setRandomSection2(setRandomItemState(item.items, randomSection2))
        setRandTopCats1(item)
    }

    const getCategoryCallback3 = (item) => {
        setRandomSection3(setRandomItemState(item.items, randomSection3))
        setRandBottomCats(item)
    }

    const getCategoryCallback4 = (item) => {
        setRandomSection4(setRandomItemState(item.items, randomSection4))
        setRandShoesCats(item)
    }

    const getCategoryCallback5 = (item) => {
        setRandomSection5(setRandomItemState(item.items, randomSection5))
        setRandAccessoriesCats(item)
    }


    //Content
    const section_1 = item_section1 ? <LookItem image={item_section1.img} brand={item_section1.brand}/> : <LookSlotPlaceholder text={i18n.t("tops_or_outerwear")} />
    const section_2 = item_section2 ? <LookItem image={item_section2.img} brand={item_section2.brand} /> : <LookSlotPlaceholder text={i18n.t("tops")} />
    const section_3 = item_section3 ? <LookItem image={item_section3.img} brand={item_section3.brand} /> : <LookSlotPlaceholder text={i18n.t("bottom")} />
    const section_4 = item_section4 ? <LookItem image={item_section4.img} brand={item_section4.brand} /> : <LookSlotPlaceholder text={i18n.t("shoes")} />
    const section_5 = item_section5 ? <LookItem image={item_section5.img} brand={item_section5.brand} /> : <LookSlotPlaceholder text={i18n.t("accessories")} />

    return(
        <View style={commonStyles.view}>
            <View style={styles.top}>
                <View><Text style={styles.title}>{i18n.t("look_generator")}</Text></View>
            </View>
            <LookSection
                section={section_1}
                style={styles.itemTop}
                handler={getRandomSection1}
                categories={top_categories}
                activeCategory={random_top_category}
                categoryCallback={getCategoryCallback}
                largeSection={true}
            />
            <View style={styles.smallGrid}>
                <LookSection
                    section={section_2}
                    style={styles.itemSmall}
                    handler={getRandomSection2}
                    categories={top_categories1}
                    activeCategory={random_top_category1}
                    categoryCallback={getCategoryCallback2}
                />
                <LookSection
                    section={section_3}
                    style={styles.itemSmall}
                    handler={getRandomSection3}
                    categories={bottom_categories}
                    activeCategory={random_bottom_category}
                    categoryCallback={getCategoryCallback3}
                />
                <LookSection
                    section={section_4}
                    style={styles.itemSmall}
                    handler={getRandomSection4}
                    categories={shoes_categories}
                    activeCategory={random_shoes_category}
                    categoryCallback={getCategoryCallback4}
                />
                <LookSection
                    section={section_5}
                    style={styles.itemSmall}
                    handler={getRandomSection5}
                    categories={accessories_categories}
                    activeCategory={random_accessories_category}
                    categoryCallback={getCategoryCallback5}
                />
            </View>
            <Shade type="top"/>
        </View>
    )
}

const styles = StyleSheet.create({
    itemTop: {
        width: windowWidth,
        height: windowHeight/2,
        // backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center"
    },
    itemSmall: {
        width: windowWidth/2,
        height: windowHeight/4,
        // backgroundColor: 'blue',
        alignItems: "center",
        justifyContent: "center"
    },
    smallGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    top: {
        position: "absolute",
        top: 50,
        zIndex: 2,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    }
})