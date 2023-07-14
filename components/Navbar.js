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
import { Badge } from 'native-base';

export default function Navbar(navigation) {
    const { colors } = useTheme();    
    const insets = useSafeAreaInsets();    

    const { userProfile } = useSelector((state) => state.userProfile);    

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
                            _icon={{
                                as: MaterialIcons,
                                name: "menu",
                                size: "lg",
                                color: "white"

                            }} />
                        <Text color="white" fontSize="20" fontWeight="bold">
                            Chat
                        </Text>
                    </HStack>
                    <HStack justifyContent={"center"} alignItems={"center"} marginRight={2} space={5}>                                                
                        <View>
                            <TouchableOpacity>
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