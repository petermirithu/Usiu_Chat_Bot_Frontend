import React, { useEffect, useState } from 'react';
import { View, Text, useTheme, HStack, IconButton, Button, Spinner, Box, Modal } from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import { delete_conversation, fetch_conversations } from '../services/ChatService';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchChats, setSessionId } from '../redux/ChatSlice';
import { setErrorMessage } from '../redux/ErrorHandlerSlice';
import { Platform, TouchableOpacity } from 'react-native';

export default function DrawerContent(props) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const { userProfile } = useSelector((state) => state.userProfile);
    const { sessionId } = useSelector((state) => state.chat);

    const isDrawerOpen = getDrawerStatusFromState(props.navigation.getState()) === 'open';

    const [isLoading, setIsLoading] = useState("off");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chatHistory, setChatHistory] = useState({
        today: [],
        yesterday: [],
        otherDays: []
    });

    const navigateScreen = (routeName) => {
        if (routeName == "Chat Interface") {
            dispatch(setSessionId(""));
            dispatch(setFetchChats(true));
        }
        // dispatch(setCurrentRoute(routeName));
        props.navigation.navigate(routeName);
    }

    const loadSessions = async () => {
        await fetch_conversations(userProfile.id).then(response => {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let tempChatHistory = { ...chatHistory };

            for (let session of response.data) {
                let sessionDate = new Date(session?.date_modified);
                sessionDate = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
                if (sessionDate.toDateString() === today.toDateString()) {
                    tempChatHistory.today.push(session);
                }
                else if (sessionDate.toDateString() === yesterday.toDateString()) {
                    tempChatHistory.yesterday.push(session);
                }
                else {
                    tempChatHistory.otherDays.push(session);
                }
            }
            setChatHistory(tempChatHistory);
            setIsLoading("done");
        }).catch(error => {
            setIsLoading("done");
        });
    }

    const loadChat = (sessionId) => {
        dispatch(setSessionId(sessionId));
        dispatch(setFetchChats(true));
        props.navigation.closeDrawer();
    }

    const deleteChat = async () => {
        setIsDeleting(true);
        await delete_conversation(sessionId).then(success => {
            let index = chatHistory.today.findIndex(x => x.id == sessionId);
            let tempChatHistory = { ...chatHistory };
            let currentSessionId = null;
            if (index >= 0) {
                tempChatHistory.today = chatHistory.today.slice(0);
                tempChatHistory.today.splice(index, 1);
            }
            else if (index < 0) {
                index = chatHistory.yesterday.findIndex(x => x.id == sessionId);
                if (index >= 0) {
                    tempChatHistory.yesterday = chatHistory.yesterday.slice(0);
                    tempChatHistory.yesterday.splice(index, 1);
                }
                else {
                    index = chatHistory.otherDays.findIndex(x => x.id == sessionId);
                    if (index >= 0) {
                        tempChatHistory.otherDays = chatHistory.otherDays.slice(0);
                        tempChatHistory.otherDays.splice(index, 1);
                    }
                }
            }

            currentSessionId = (tempChatHistory.today.length > 0) ? tempChatHistory.today[0].id :
                (tempChatHistory.yesterday.length > 0) ? tempChatHistory.yesterday[0].id :
                    (tempChatHistory.otherDays.length > 0) ? tempChatHistory.otherDays[0].id : ""

            setChatHistory(tempChatHistory);
            dispatch(setSessionId(currentSessionId));
            setTimeout(() => {
                dispatch(setFetchChats(true));
                setTimeout(() => {
                    setIsDeleting(false);
                    setShowDeleteModal(false);
                }, 500);
            }, 500);
        }).catch(error => {
            setIsDeleting(false);
            dispatch(setErrorMessage("Something went wrong while deleting the conversation with ID:- " + sessionId));
        });
    }

    const renderSession = (session) => {
        return (
            <View
                nativeID={session.id} key={session.id}
                position={"relative"}
                mb={2} padding={2} width={"100%"} bg={(sessionId == session?.id) ? "gray.300" : "gray.100"} borderRadius={10}>
                <HStack>
                    <TouchableOpacity onPress={() => loadChat(session.id)} style={{ width: (sessionId == session?.id) ? "90%" : "100%" }}>
                        <Text isTruncated={true}>
                            {session.title}
                        </Text>
                    </TouchableOpacity>
                    {(sessionId == session?.id) ?
                        <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                            <MaterialCommunityIcons name="delete-forever" size={22} color="black" />
                        </TouchableOpacity>
                        :
                        <></>
                    }
                </HStack>
            </View>
        )
    }

    useEffect(() => {
        if (isDrawerOpen == true && isLoading == "off") {
            setIsLoading("actived");
            loadSessions();
        }
        else if (isDrawerOpen == false && isLoading == "done") {
            setChatHistory({
                today: [],
                yesterday: [],
                otherDays: []
            });
            setIsLoading("off");
        }
    }, [isLoading, isDrawerOpen, chatHistory, isDeleting, showDeleteModal]);

    return (
        <>
            {(Platform.OS == "ios") ?
                <Box safeAreaTop={0}></Box>
                :
                <Box safeAreaTop></Box>
            }

            <View flex={1}>
                <Box bg="primary.600" pt={(Platform.OS == "ios") ? insets.top : 0}>
                    <HStack py="2" justifyContent="space-between" alignItems="center" w="100%">
                        <Text color="white" ml={5} fontSize="20" fontWeight="bold">Usiu Chat Bot</Text>
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
                </Box>
                <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
                    <View marginX={5}>
                        <Text fontWeight="bold" textAlign={"center"} color={"gray.600"} fontSize={17}>Chat History</Text>
                        {(isLoading == "done") ?
                            <>
                                {(chatHistory.today?.length > 0) ?
                                    <>
                                        <Text mb={1} color={"gray.500"} fontWeight={"bold"} nativeID='today' key={'today'}>Today</Text>
                                        {
                                            chatHistory.today.map(session => {
                                                return renderSession(session)
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                                }

                                {(chatHistory.yesterday?.length > 0) ?
                                    <>
                                        <Text mt={2} mb={1} color={"gray.500"} fontWeight={"bold"} nativeID='yesterday' key={'yesterday'}>Yesterday</Text>
                                        {
                                            chatHistory.yesterday.map(session => {
                                                return renderSession(session)
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                                }

                                {(chatHistory.otherDays?.length > 0) ?
                                    <>
                                        <Text mt={2} mb={1} color={"gray.500"} fontWeight={"bold"} nativeID='past_yesterday' key={'past_yesterday'}>Past Yesterday</Text>
                                        {
                                            chatHistory.otherDays.map(session => {
                                                return renderSession(session)
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                                }

                                {(chatHistory.today?.length == 0 && chatHistory.yesterday?.length == 0 && chatHistory.otherDays?.length == 0) ?
                                    <Text color={"gray.400"} textAlign={"center"} mt={5}>No chats available</Text>
                                    :
                                    <></>
                                }

                                <Button
                                    mt={5}
                                    onPress={() => navigateScreen("Chat Interface")}
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
                <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <Modal.Content>
                        <Modal.Header>Confirm Delete</Modal.Header>
                        <Modal.Body>
                            <Text>Are you sure you want to delete the conversation?</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" isDisabled={isDeleting} onPress={() => {
                                    setShowDeleteModal(false);
                                }}>
                                    No
                                </Button>
                                <Button minWidth={70} colorScheme={"danger"} isLoading={isDeleting} isLoadingText="Deleting ..." onPress={() => {
                                    deleteChat();
                                }}>
                                    Yes
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </View >
        </>
    );
}