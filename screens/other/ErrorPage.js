import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    useTheme,
    Box,
    VStack,
    Image,
} from "native-base";
import { Global } from "../../styles/Global";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../redux/ErrorHandlerSlice";
import { Linking } from "react-native";

export default function ErrorPage({ navigation }) {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const { errorMessage } = useSelector((state) => state.errorHandler);

    const [imagesLoading, setImagesLoading] = useState({ started: [], finished: [], pageLoading: true });

    
    const restartApp = () => {
        dispatch(setErrorMessage(""));        
    }


    const openEmailApp = () => {
        Linking.openURL('mailto:engage@izola.life');
    }

    useEffect(() => {
    }, [imagesLoading])

    return (
        <Box safeArea safeAreaBottom={0} style={Global.container}>
            {(imagesLoading.pageLoading == true) ?
                <View position={"absolute"} zIndex={999} top={0} bottom={0} left={0} right={0} alignItems="center" justifyContent="center" flex="1" backgroundColor={colors['lavenderWeb']}>
                    <Loader></Loader>
                </View>
                :
                <></>
            }

            <View height={250} mt={50}>
                {/* <Image alignSelf={"center"} source={{ uri: errorAssets[0] }} alt="Error image" width={"100%"} height={"100%"} /> */}
            </View>

            <View backgroundColor={colors.gray[100]} padding={5} mt={10} pt={3} flex={1} borderTopRadius={50}>
                <View mt="5">
                    <Text style={Global.title} textAlign={"center"}>Oops Sorry...</Text>
                    <Text color={"coolGray.500"} textAlign={"center"}>
                        {/* Something unexpected happened while */}
                        {errorMessage}
                    </Text>
                    <Text color={"coolGray.500"} textAlign={"center"} mt={3}>Please reload the app and wait a few minutes before trying again. If the problem persists, please contact support at:- <Text color={"primary.600"} onPress={openEmailApp}>engage@izola.life</Text></Text>                    
                </View>

                <VStack space={3} mt="5">
                    <Button mt="5" colorScheme={"primary"} onPress={restartApp}>Reload App</Button>
                </VStack>
            </View>
        </Box>
    )
}