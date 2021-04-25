import {SET_ACTIVE_LOOK_CATEGORY} from "../types";

const initialState = {
    activeCategories: [],
    currentLook: {
        slot1: null,
        slot2: null,
        slot3: null,
        slot4: null,
        slot5: null
    },
    savedLooks: []
}

export const looksReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTIVE_LOOK_CATEGORY:
            return {
                ...state,
                activeCategories: [...state.activeCategories, {...action.category}]
            }
        default: return state
    }
}