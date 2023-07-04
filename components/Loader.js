import {
    View,    
    Spinner,    
    useTheme,    
} from "native-base";
import React, { useEffect } from "react";

export default function Loader() {
    const { colors } = useTheme();

    useEffect(() => {

    }, [])

    return (
        <View position="relative" alignItems={"center"}>
            <Spinner color="primary.600" size={"lg"} />                            
        </View>
    )
}   