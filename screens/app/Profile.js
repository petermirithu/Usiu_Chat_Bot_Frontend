import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    HStack,
    useTheme,
    Box,
    VStack,
    Avatar,    
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, Linking } from "react-native";
import { reloadAsync } from "expo-updates";
import { globalSignUserOut } from "../../services/CacheService";
import { setIsAuthenticated } from "../../redux/UserProfileSlice";
import ProfileUpdate from "../../components/ProfileUpdate";

export default function Profile({ navigation }) {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const { userProfile } = useSelector((state) => state.userProfile);        

    const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
    
    const openEmailApp = () => {
        Linking.openURL('mailto:pyramyra33@gmail.com');
    }

    const signOut = async () => {
        await globalSignUserOut();
        dispatch(setIsAuthenticated(false));
        reloadAsync();
    }

    useEffect(() => {
    }, [showUpdateProfileForm])


    return (
        <Box style={[Global.container, { backgroundColor: colors.primary[600] }]} height={"100%"}>
            <View justifyContent={"space-between"} alignItems={"center"}>
                <Avatar bg="white" _text={{ color: "primary.600" }} size={"xl"} source={{
                    uri: userProfile?.picture
                }}>
                    <FontAwesome5 name="user-alt" size={30} color={colors.primary[600]} />
                </Avatar>
                <TouchableOpacity>
                    <Text mt={3} color="white">Change Avatar <FontAwesome name="pencil" size={20} color="white" /></Text>
                </TouchableOpacity>
            </View>
            <View mt={5} backgroundColor={colors.gray[100]} flex={1} borderTopRadius={30} padding={5} height={"100%"}>
                <View
                    borderColor={"gray.200"}
                    borderWidth={0}
                    borderRadius={10}
                    p={3}
                    bg={"white"}
                    style={Global.shadowEffect}
                >
                    <HStack justifyContent={"space-between"}>
                        <Text fontWeight={"bold"} fontSize={15} marginBottom={5}>Profile Information</Text>
                        <TouchableOpacity onPress={()=>setShowUpdateProfileForm(true)}>
                            <Text fontWeight={"bold"} fontSize={15} marginBottom={5} color={"yellow.500"}>Edit</Text>
                        </TouchableOpacity>
                    </HStack>

                    <VStack space={8}>
                        <Text>First Name: {userProfile.first_name}</Text>
                        <Text>Last Name: {userProfile.last_name}</Text>
                        <Text>Email: {userProfile.email}</Text>
                    </VStack>
                </View>

                <View
                    borderColor={"gray.200"}
                    borderWidth={0}
                    borderRadius={10}
                    p={3}
                    mt={5}
                    bg={"white"}
                    style={Global.shadowEffect}
                >
                    <Text fontWeight={"bold"} fontSize={15} marginBottom={5}>Account settings</Text>
                    <VStack space={8}>
                        <HStack alignItems={"center"} space={3}>
                            <View width={8}>
                                <MaterialCommunityIcons name="onepassword" size={20} color={colors.gray[700]} />
                            </View>
                            <Text>Change Password</Text>
                            <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                                <View bgColor={"gray.300"} width={35} height={35} alignItems={"center"} justifyContent={"center"} borderRadius={5}>
                                    <FontAwesome5 name="chevron-right" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </HStack>
                    </VStack>
                </View>
                <View
                    borderColor={"gray.200"}
                    borderWidth={0}
                    borderRadius={10}
                    p={3}
                    bg={"white"}
                    mt={5}
                    style={Global.shadowEffect}
                >
                    <Text fontWeight={"bold"} fontSize={15} marginBottom={5}>Support</Text>
                    <VStack space={8}>
                        <HStack alignItems={"center"} space={3}>
                            <View width={8}>
                                <MaterialIcons name="contact-phone" size={24} color={colors.gray[700]} />
                            </View>
                            <Text>Contact Us</Text>
                            <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => openEmailApp()}>
                                <View bgColor={"gray.300"} width={35} height={35} alignItems={"center"} justifyContent={"center"} borderRadius={5}>
                                    <FontAwesome5 name="chevron-right" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </HStack>
                    </VStack>
                </View>
                <Button mt={5} borderWidth={1} borderColor={"danger.600"} colorScheme={"danger"} variant={"outline"} onPress={() => signOut()}>Sign Out</Button>
            </View>  
            <ProfileUpdate showUpdateProfileForm={showUpdateProfileForm} closeBottomSheetForm={() => setShowUpdateProfileForm(false)}></ProfileUpdate>          
        </Box>
    )
}