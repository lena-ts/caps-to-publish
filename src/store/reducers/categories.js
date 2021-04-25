import React from 'react'
import {categories} from "../data/categoriesData";
import {ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SET_WARDROBE_TYPE} from "../types";
import {categories_woman} from "../data/categories_woman";
import {categories_man} from "../data/categories_man";

export const initialState = categories_woman

const addItemToCategory = (state, action) => state.map(item => {
    if (item.id === action.item.category) {
        item.subcategories.map(i => {
            if(i.id === action.item.type) {
                i.items.push(action.item.id)
            }
            return i
        })
    }
    return item
})

const deleteItemFromCategory = (state, action) => state.map(item => {
        if (item.subcategories.map(sub => {
            if (sub.items.find(t => t === action.id)) {
                sub.items = sub.items.filter(c => c != action.id)
            }
            return sub
        })
        )
            return item
    }
)

export const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_WARDROBE_TYPE:
            const newstate = action.wardrobe === "woman" ? categories_woman : categories_man
            return {
                ...state = newstate
            }
        case ADD_ITEM:
            return {
                ...state,
                categories: addItemToCategory(state.categories, action)
            }
        case EDIT_ITEM:
            const stateWithDeleted = deleteItemFromCategory(state.categories, action)
            const stateWithAdded = addItemToCategory(stateWithDeleted, action)
            return {
                ...state,
                categories: stateWithAdded
            }
        case DELETE_ITEM:
            return {
                ...state,
                categories: deleteItemFromCategory(state.categories, action)
            }
        default: return state
    }
}