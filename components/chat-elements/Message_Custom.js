import React, { useEffect } from "react";
import { Message } from "react-native-gifted-chat";

export default function Message_Custom({ props }) {

    useEffect(() => {
    }, [])

    return (
        <Message
            {...props}
            containerStyle={{
                left: { paddingBottom: 3 },
                right: { paddingBottom: 3 },
            }}
        />
    )
}   