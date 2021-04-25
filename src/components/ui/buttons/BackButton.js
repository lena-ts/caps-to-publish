import React from 'react'
import {View, Text, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {Entypo} from "@expo/vector-icons";

export const BackButton = ({navigation, itemToDealWith}) => {
    const items = useSelector(state => state.items).items

    const item = items.find(i => i.id === itemToDealWith)

    const handleBack = () => {
        navigation.navigate('Category', {
            catId: item.type
        })
    }
    return(
        <View>
            <TouchableOpacity onPress={handleBack}>
                <Entypo name="chevron-small-left"
                            size={32}
                            color="white"
                            style={{
                                // paddingTop: 17,
                                paddingLeft: 5
                            }} />
            </TouchableOpacity>
        </View>
    )
}