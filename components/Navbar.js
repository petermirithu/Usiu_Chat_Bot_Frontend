import {
    Text,
    useTheme,
    HStack,
    Box,
    IconButton,
    Avatar,
    View,
} from "native-base";
import React, { useEffect } from "react";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setCurrentRoute } from "../redux/NavigationSlice";

export default function Navbar(navigation) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const { userProfile } = useSelector((state) => state.userProfile);
    const { currentRoute } = useSelector((state) => state.screenNavigation);    
    
    const navigateScreen = (routeName = "") => {
        if (routeName?.length == 0 && currentRoute == "Chat Interface") {
            navigation.openDrawer()
        }
        else if (routeName?.length > 0) {
            dispatch(setCurrentRoute(routeName));
            navigation.navigate(routeName);
        }
        else {
            dispatch(setCurrentRoute("Chat Interface"));
            navigation.navigate("Chat Interface");
        }
    }

    useEffect(() => {
    }, [])

    return (
        <>
            {(Platform.OS == "ios") ?
                <Box safeAreaTop={0}></Box>
                :
                <Box safeAreaTop></Box>
            }
            <Box bg="primary.600">
                <HStack pt={(Platform.OS == "ios") ? insets.top : 0} py="2" justifyContent="space-between" alignItems="center" w="100%">
                    <HStack alignItems="center">
                        <IconButton
                            onPress={() => navigateScreen()}
                            _icon={{
                                as: MaterialIcons,
                                name: (currentRoute == "Chat Interface") ? "menu" : "arrow-back",
                                size: "lg",
                                color: "white"

                            }} />
                        <Text color="white" fontSize="20" fontWeight="bold">
                            {(currentRoute == "Chat Interface") ? "Chat" : currentRoute}
                        </Text>
                    </HStack>                    
                    <HStack justifyContent={"center"} alignItems={"center"} marginRight={2} space={5}>
                        <View>
                            <TouchableOpacity onPress={() => navigateScreen("Profile")}>
                                <Avatar bg="white" _text={{ color: "primary.600" }} size={"sm"} source={{
                                    uri: userProfile?.picture
                                }}>
                                    <FontAwesome5 name="user-alt" size={17} color={colors.primary[600]} />
                                </Avatar>
                            </TouchableOpacity>
                        </View>
                    </HStack>
                </HStack>
            </Box>
        </>
    )
} 