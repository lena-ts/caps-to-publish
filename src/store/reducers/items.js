import {ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SET_ASSOCIATED_ITEM} from "../types";

const initialState = {
    items: []
}

export const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, {...action.item}]
            }
        case EDIT_ITEM:
            return {
                ...state,
                items: [...state.items.map(item => item.id === action.id ? action.item : item)]
            }
        case DELETE_ITEM:
            return  {
                ...state,
                items: [...state.items.filter(item => item.id != action.id)]
            }
        case SET_ASSOCIATED_ITEM:
            const setItems = (item, addedId) => {
                if(action.method === 'set') {
                    if(!item.associated.find(i => i === addedId)) {
                        item.associated.push(addedId)
                    }
                }
                else {
                    item.associated = item.associated.filter(p => p != addedId)
                }
            }
            return  {
                ...state,
                items: [...state.items.map(item => {
                    if(item.id === action.id1) {
                        setItems(item, action.id2)
                    }
                    else if(item.id === action.id2) {
                        setItems(item, action.id1)
                    }
                    return item
                })
               ]
            }
        default: return state
    }
}