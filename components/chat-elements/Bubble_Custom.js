import React, { useEffect } from "react";
import {
    useTheme
} from "native-base";
import { Bubble } from "react-native-gifted-chat";

export default function Bubble_Custom({ props }) {
    const { colors } = useTheme();

    useEffect(() => {
    }, [])

    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: colors.white,
                },
                right: {
                    backgroundColor: colors.primary[600],
                },
            }}
            textStyle={{
                right: {
                    color: '#fff',
                },
            }}
        />
    )
}

