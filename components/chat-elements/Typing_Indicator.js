import React, { useEffect } from "react";
import {
    View,        
} from "native-base";
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator";
import { useSelector } from "react-redux";

export default function Typing_Indicator({props}) {    
    const { botTyping } = useSelector((state) => state.chat);

    useEffect(() => {
    }, [])

    return (
        <View marginLeft={5} marginBottom={3}>
            <TypingIndicator
                {...props} 
                isTyping={botTyping}
            />
        </View>
    )
}   