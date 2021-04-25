import {
    ADD_ITEM,
    SET_ADD_ITEM_MODAL,
    SET_TRANSFER_IMAGE,
    SET_CURRENT_ITEM,
    SET_ADD_BUTTONS_MODAL,
    SET_CURRENT_WARDROBE_TAB,
    EDIT_ITEM,
    SET_CURRENT_ASSOCIATED_CATEGORY,
    SET_ASSOCIATED_ITEM,
    SET_ASSOCIATED_CATEGORY_HISTORY,
    DELETE_ITEM,
    SET_PRO_MODAL_SHOW,
    SET_BUY_PRO,
    SET_IMAGE_BROWSER_MODAL_SHOW,
    SET_ACTIVE_LOOK_CATEGORY, SET_WARDROBE_TYPE
} from "../types";
import {UUID} from "../data/UUID";

export const setWardrobeType = (wardrobe) => {
    return{
        type: SET_WARDROBE_TYPE,
        wardrobe
    }
}

export const setAddItemModal = (payload, modal_type) => {
    return{
        type: SET_ADD_ITEM_MODAL,
        payload,
        modal_type
    }
}

export const setAddButtonsModal = (payload) => {
    return{
        type: SET_ADD_BUTTONS_MODAL,
        payload
    }
}

export const setProModalShow = (payload) => {
    return {
        type: SET_PRO_MODAL_SHOW,
        payload
    }
}

export const setBuyPro = () => {
    return {
        type: SET_BUY_PRO
    }
}

export const setImageBrowserModal = (payload) => {
    return {
        type: SET_IMAGE_BROWSER_MODAL_SHOW,
        payload
    }
}

export const setTransferImage = (payload) => {
    return{
        type: SET_TRANSFER_IMAGE,
        payload
    }
}

export const setCurrentItem = (item) => {
    return{
        type: SET_CURRENT_ITEM,
        item
    }
}

export const addItem = (item) => {
    const id = UUID().toString();
    item.id = id
    if (item.category === "") {
        item.category = "uncategorized"
    }
    return{
        type: ADD_ITEM,
        item
    }
}

export const editItem = (id, item) => {
    return {
        type: EDIT_ITEM,
        id,
        item
    }
}

export const deleteItem = (id) => {
    return{
        type: DELETE_ITEM,
        id
    }
}

export const setCurrentWardrobeTab = (payload) => {
    return{
        type: SET_CURRENT_WARDROBE_TAB,
        payload
    }
}

export const setCurrentAssociatedCategory = (categoryID) => {
    return{
        type: SET_CURRENT_ASSOCIATED_CATEGORY,
        categoryID
    }
}

let array = []
export const setAssociatedCategoriesHistory = (item, type) => {
    if(type === "push") {
        if (!array.find(i => i === item)) {
            array.push(item)
        }
    }
    if (item === "clear") {
        array = []
    }
    if (type === "pop") {
       array = array.slice(0,1)
    }
    return{
        type: SET_ASSOCIATED_CATEGORY_HISTORY,
        payload: array
    }
}

export const setAssociatedItem = (id1, id2, method) => {
    return{
        type: SET_ASSOCIATED_ITEM,
        id1,
        id2,
        method
    }
}

export const setActiveLookCategory = (category) => {
    return{
        type: SET_ACTIVE_LOOK_CATEGORY,
        category
    }
}
