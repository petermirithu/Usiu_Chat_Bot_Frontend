import React, { useEffect } from "react";
import {
    Box,
    View,    
    Image,
} from "native-base";
import { Send } from "react-native-gifted-chat";
import { useSelector } from "react-redux";

export default function Right_Buttons({ props, imageUri }) {

    const { botTyping } = useSelector((state) => state.chat);

    useEffect(() => {

    }, [])

    return (
        <Box>
            <Send
                {...props}
                disabled={!props.text || botTyping}
                containerStyle={{
                    width: 45,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                }}
            >
                <View
                    width={35} height={35} background={"primary.600"}
                    borderRadius={100} justifyContent={"center"} alignItems={"center"}>
                    <Image source={imageUri} alt="Send message" width={25} height={25} />
                </View>
            </Send>
        </Box>
    )
}