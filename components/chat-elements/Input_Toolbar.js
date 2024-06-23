import { useTheme } from "native-base";
import React, { useEffect } from "react";
import { InputToolbar } from "react-native-gifted-chat";

export default function Input_Toolbar({ props }) {
    const { colors } = useTheme();
    useEffect(() => {
    }, [])

    return (
        <InputToolbar
            {...props}            
            containerStyle={{
                backgroundColor: colors.gray[100],                
                borderTopColor: colors.gray[200],
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}
            primaryStyle={{ alignItems: 'center' }}
        />
    )
}   