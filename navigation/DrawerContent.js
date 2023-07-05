import React, { useEffect, useState } from 'react';
import { View, Text, useTheme, HStack, IconButton, Button, Spinner} from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDrawerStatusFromState } from '@react-navigation/drawer';


export default function DrawerContent(props) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const isDrawerOpen = getDrawerStatusFromState(props.navigation.getState()) === 'open';    

    const [isLoading, setIsLoading] = useState("off");    

    const loadSessions = () => {
        setTimeout(() => {
            setIsLoading("off");
        }, 1000);
    }

    useEffect(() => {
        if (isDrawerOpen == true && isLoading == "off") {
            setIsLoading("actived");
            loadSessions();
        }
        else if (isDrawerOpen == false && isLoading == "done") {            
            setIsLoading("off");
        }
    }, [isLoading, isDrawerOpen]);

    return (
        <View style={{ flex: 1, paddingTop: insets.top}}>
            <HStack bg="primary.600" py="2" justifyContent="space-between" alignItems="center" w="100%" h={60}>
                <Text color="white" ml={5} fontSize="20" fontWeight="bold">USIU Chat Bot</Text>
                <IconButton mr={5} bg="white"
                    onPress={() => props.navigation.closeDrawer()}
                    borderRadius={100}
                    width={35} height={35}
                    variant="outline"
                    _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
            </HStack>
            <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 10}}>
                <View marginX={5}>
                    <Text fontWeight="bold" textAlign={"center"} color={"gray.600"} fontSize={17}>Chat History</Text>
                    {(isLoading == "done") ?
                        <>
                            <Text color={"gray.400"} textAlign={"center"} mt={5}>No chats available</Text>

                            <Button
                                mt={5}                                
                                variant={"subtle"}
                                _text={{ color: colors.primary[600] }}
                                leftIcon={
                                    <FontAwesome5 name="plus" size={20} color={colors.primary[600]} />
                                }
                            >New Chat</Button>
                        </>
                        :
                        <>
                            <View justifyContent={"center"} alignItems={"center"} mt={20}>
                                <Spinner color="primary.600" size={"lg"} />
                            </View>
                        </>
                    }
                </View>
            </DrawerContentScrollView>                      
        </View >
    );
}