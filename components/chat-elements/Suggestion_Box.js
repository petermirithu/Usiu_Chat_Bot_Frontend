import React, { useEffect } from "react";
import {
    View,
    Image,
    Text,
    Button
} from "native-base";
import { Global } from "../../styles/Global";

export default function Suggestion_Box({ imageUri, sendPrompt }) {

    useEffect(() => {
    }, [])

    return (
        <View
            alignItems={"center"}
            borderColor={"gray.200"}
            borderWidth={0}
            m={3}
            borderRadius={30}
            p={3}
            bg={"white"}
            position={"absolute"} bottom={5}
            left={0} right={0}            
            style={Global.shadowEffect}
        >
            <Image source={imageUri} alt="Suggestion logo" width={35} height={35}/>
            <Text fontFamily={"Poppins-Bold"} fontSize={25} color="primary.600" marginBottom={3}>Suggestions</Text>
            <Button onPress={() => sendPrompt("Tell me about USIU?")} variant={"subtle"} colorScheme={"gray"} size={"sm"} marginBottom={3}>Tell me about USIU?</Button>
            <Button onPress={() => sendPrompt("Who is Dr.Collins from USIU?")} variant={"subtle"} colorScheme={"gray"} size={"sm"} marginBottom={3}>Who is Dr.Collins from USIU?</Button>
            <Button onPress={() => sendPrompt("How can I check for my fee balance?")} variant={"subtle"} colorScheme={"gray"} size={"sm"} marginBottom={3}>How can I check for my fee balance?</Button>
            <Button onPress={() => sendPrompt("How can I register for a course on CX?")} variant={"subtle"} colorScheme={"gray"} size={"sm"} marginBottom={3}>How can I register for a course on CX?</Button>
            <Button onPress={() => sendPrompt("How can I check my grades on blackboard?")} variant={"subtle"} colorScheme={"gray"} size={"sm"} marginBottom={3}>How can I check my grades on blackboard?</Button>
        </View>
    )
}   