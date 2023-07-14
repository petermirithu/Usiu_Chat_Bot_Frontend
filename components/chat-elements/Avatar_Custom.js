import React, { useEffect } from "react";
import {
    Image
} from "native-base";

export default function Avatar_Custom({ imageUri }) {

    useEffect(() => {
    }, [])

    return (
        <Image source={imageUri} alt="Bot logo" width={35} height={35}/>
    )
}   