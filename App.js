import React from 'react';
import {Provider} from 'react-redux';
import { StatusBar} from 'react-native';
import {store, persistor} from './src/store';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {translations} from "./translations";
import {AppNavigation} from "./src/navigation/AppNavigation";
import { PersistGate } from 'redux-persist/integration/react';
import {Banner} from "./src/components/admob/Banner";

i18n.translations = translations;
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content"/>
          <AppNavigation/>
          <Banner />
          </PersistGate>
      </Provider>
  );
}
