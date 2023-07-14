import React, { useEffect } from "react";
import { View } from "native-base";
import { Platform } from "react-native";
import { Composer } from "react-native-gifted-chat";
import { useSelector } from "react-redux";

export default function Text_Composer({ props }) {
    const { botTyping } = useSelector((state) => state.chat);

    useEffect(() => {
    }, [])

    return (
        <Composer
            {...props}
            disableComposer={botTyping}
            textInputStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#E4E9F2',
                alignItems: "center",
                justifyContent: "center",
                paddingTop: Platform.select({ ios: 10 }),
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginHorizontal: 10,
                overflow: "hidden",
                backgroundColor:"#fff"
            }}
        >
            <View width={"100%"}></View>
        </Composer>
    )
}   