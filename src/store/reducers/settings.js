import {
    SET_ADD_BUTTONS_MODAL,
    SET_ADD_ITEM_MODAL, SET_ASSOCIATED_CATEGORY_HISTORY, SET_BUY_PRO, SET_CURRENT_ASSOCIATED_CATEGORY,
    SET_CURRENT_ITEM,
    SET_CURRENT_WARDROBE_TAB, SET_IMAGE_BROWSER_MODAL_SHOW, SET_PRO_MODAL_SHOW,
    SET_TRANSFER_IMAGE, SET_WARDROBE_TYPE
} from "../types";

const initialState = {
    wardrobeType: null,
    itemsAdded: false,
    addItemModal: {value: false, type: null},
    addButtonsModal: false,
    transferImage: null,
    currentItem: {},
    currentWardrobeTab: 'all',
    currentAssociatedCategory: 'all',
    associatedCategoriesHistory: [],
    proPurchased: false,
    proModalShow: false,
    imageBrowserModal: false
}

export const wardrobeType = initialState.wardrobeType

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_WARDROBE_TYPE:
            return {
                ...state,
                wardrobeType: action.wardrobe
            }
        case SET_ADD_ITEM_MODAL:
            let res = {
                value: action.payload,
                type: action.modal_type
            }
            return {
                ...state,
                addItemModal: res
            }
        case SET_TRANSFER_IMAGE:
            return {
                ...state,
                transferImage: action.payload
            }
        case SET_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.item
            }
        case SET_ADD_BUTTONS_MODAL:
            return  {
                ...state,
                addButtonsModal: action.payload
            }
        case SET_CURRENT_WARDROBE_TAB:
            return  {
                ...state,
                currentWardrobeTab: action.payload
            }
        case SET_CURRENT_ASSOCIATED_CATEGORY:
            return  {
                ...state,
                currentAssociatedCategory: action.categoryID
            }
        case SET_ASSOCIATED_CATEGORY_HISTORY:
                return {
                    ...state,
                    associatedCategoriesHistory: action.payload
                }
        case SET_PRO_MODAL_SHOW:
            return {
                ...state,
                proModalShow: action.payload
            }
        case SET_IMAGE_BROWSER_MODAL_SHOW:
            return {
                ...state,
                imageBrowserModal: action.payload
            }
        case SET_BUY_PRO:
            return {
                ...state,
                proPurchased: true
            }
        default: return state
    }
}