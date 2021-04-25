import {StyleSheet} from "react-native";
import {BG_COLOR, DARK_SHADE} from "../theme";

export const commonStyles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: BG_COLOR
    },
    darkShade: {
        flex: 1,
        width: '100%',
        backgroundColor: DARK_SHADE,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    }
})