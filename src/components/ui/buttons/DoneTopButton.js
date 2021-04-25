import React from 'react'
import {View, Text, TouchableWithoutFeedback, StyleSheet} from "react-native";
import i18n from 'i18n-js';

export const DoneTopButton = ({pressDone}) => {
    return(
        <View>
            <TouchableWithoutFeedback onPress={() => pressDone()}>
                <Text style={styles.text}>{i18n.t('done_btn')}</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
       color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
})