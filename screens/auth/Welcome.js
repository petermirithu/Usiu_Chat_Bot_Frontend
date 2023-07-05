import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    useTheme,
    Box,
    Image,
    Button,    
} from "native-base";
import { Global } from "../../styles/Global";
import Loader from "../../components/Loader";
import { useAssets } from 'expo-asset';

export default function Welcome({ navigation }) {
    const { colors } = useTheme();

    const [assets] = useAssets([require('../../assets/icon.png'), require('../../assets/Images/USIU_Africa_Logo.png')])


    useEffect(() => {
    }, [])

    if (!assets) {
        return (
            <View position={"absolute"} zIndex={999} top={0} bottom={0} left={0} right={0} alignItems="center" justifyContent="center" flex="1" backgroundColor={colors['lavenderWeb']}>
                <Loader></Loader>
            </View>
        )
    }

    return (
        <Box safeArea safeAreaBottom={0} style={[Global.container]}>
            <View my={5} flex={1} justifyContent={"center"} alignItems={"center"}>
                <Image alignSelf={"center"} source={assets[0]} alt="App logo" textAlign={"center"} width={250} height={200}/>
            </View>
            <View padding={5} mt="5" pt={5} flex={1}>
                <View>
                    <Text style={Global.title}>Welcome to <Text color={"yellow.500"}>USIU Chat Bot</Text>!</Text>
                    <Text color={"coolGray.500"}>Your virtual companion and guide. Get instant answers, access information, and discover a seamless university experience right at your fingertips</Text>
                </View>
                <Button mt={10} width={"100%"} onPress={() => navigation.navigate("Sign In")}>Get Started</Button>
            </View>
            <Image mb={3} alignSelf={"center"} source={assets[1]} alt="USIU logo" width={100} height={70} />
        </Box>
    )
}