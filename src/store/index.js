import {createStore, combineReducers, compose} from "redux";
import {categoriesReducer} from "./reducers/categories";
import {settingsReducer} from "./reducers/settings";
import {itemsReducer} from "./reducers/items";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    settings: settingsReducer,
    items: itemsReducer
})

const persistConfig = {
    key: 'root',
    whitelist: [
        'categories',
        'settings',
        'items'
    ],
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer)

let persistor = persistStore(store)

export {
    store,
    persistor,
};

// export default createStore(rootReducer,   compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))