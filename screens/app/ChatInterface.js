import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    useTheme,
    Box,
    KeyboardAvoidingView,
    useToast,
} from "native-base";
import { Global } from "../../styles/Global";
import Loader from "../../components/Loader";
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from "react-redux";
import { Platform } from "react-native";
import Typing_Indicator from "../../components/chat-elements/Typing_Indicator";
import Input_Toolbar from "../../components/chat-elements/Input_Toolbar";
import Text_Composer from "../../components/chat-elements/Text_Composer";
import Avatar_Custom from "../../components/chat-elements/Avatar_Custom";
import Left_Buttons from "../../components/chat-elements/Left_Buttons";
import Right_Buttons from "../../components/chat-elements/Right_Buttons";
import Message_Custom from "../../components/chat-elements/Message_Custom";
import Bubble_Custom from "../../components/chat-elements/Bubble_Custom";
import Scroll_Icon from "../../components/chat-elements/Scroll_Icon";
import Suggestion_Box from "../../components/chat-elements/Suggestion_Box";
import { setBotTyping, setSessionId, setUserTyping } from "../../redux/ChatSlice";
import { useAssets } from "expo-asset";
import { send_question } from "../../services/ChatService";
import { setErrorMessage } from "../../redux/ErrorHandlerSlice";
import Store from "../../redux/Store";

export default function ChatInterface({ navigation }) {
    const { colors } = useTheme();
    const dispatch = useDispatch();    

    const { userProfile } = useSelector((state) => state.userProfile);
    const { botTyping, userTyping } = useSelector((state) => state.chat);    

    const [assets] = useAssets([
        require('../../assets/Chat/suggestions.png'), 
        require('../../assets/icon.png'), 
        require('../../assets/Chat/send.png'),
        require('../../assets/Chat/broom.png')
    ])

    const [isLoading, setIsLoading] = useState("none");
    const [messages, setMessages] = useState([]);
            

    const botConfig = {
        _id: "usiuChatBot",
        name: 'Usiu Chat Bot',
    }
    let defaultMessages = [
        {
            _id: 2,
            system: true,
            suggestions: true,
        },
        {
            _id: 1,
            text: null,
            createdAt: new Date(),
            user: botConfig,
        },
    ]

    const mapMessage = (messageObject) => {
        messageObject["createdAt"] = new Date();
        messageObject["user"] = botConfig;
        return messageObject;
    }

    const sendQuestionToModel = async (formData) => {                            
        const chatState = Store.getState().chat;
        formData.append("userId", userProfile.id);
        formData.append("sessionId", chatState.sessionId);        
        await send_question(formData).then(response => {            
            dispatch(setSessionId(response.data.sessionId));
            dispatch(setBotTyping(false));
            if (response != null || response != undefined) {
                setMessages((prevMessages) => appendChats(prevMessages, [mapMessage(response.data)]));
            }
            else {
                setMessages((prevMessages) => appendChats(prevMessages, [mapMessage(
                    {
                        _id: new Date().toISOString(),
                        text: "Apologies, but I'm currently experiencing technical difficulties and I'm unable to assist you at the moment. Please try again later.\n\nIf the issue persists, please contact our support team for further assistance. Thank you for your understanding."
                    }
                )]));
            }            

        }).catch(error => {
            dispatch(setBotTyping(false));
            dispatch(setErrorMessage("Something went wrong while sending your question."));
        });        
    }

    const appendChats = (prevMessages, newMessages) => {
        if (prevMessages?.length == 2) {
            const suggestionIndex = prevMessages.findIndex(message => message.suggestions == true);
            if (suggestionIndex >= 0) {
                prevMessages.splice(suggestionIndex, 1);
            }
        }
        const allMessages = GiftedChat.append(prevMessages, newMessages);
        return allMessages;
    }
    

    const onSend = useCallback(async (newMessages = []) => {
        setMessages((prevMessages) => appendChats(prevMessages, newMessages));
        dispatch(setBotTyping(true));
        let formData = new FormData();        
        formData.append('question', newMessages[0].text);        
        sendQuestionToModel(formData);
    }, []);


    const sendPrompt = (prompt) => {
        const messageObject = {
            _id: new Date().toISOString(),
            text: prompt,
            createdAt: new Date(),
            user: {
                _id: userProfile?.id || 1,
            }
        }
        setMessages((prevMessages) => appendChats(prevMessages, messageObject));
        dispatch(setBotTyping(true));
        let formData = new FormData();        
        formData.append('question', messageObject.text);        
        sendQuestionToModel(formData);
    }

    const userTypingMessage = (text) => {
        if (text?.length > 0 && userTyping == false) {
            dispatch(setUserTyping(true));
        }
        else if (text?.length == 0 && userTyping == true) {
            dispatch(setUserTyping(false));
        }
    }

    const setDefaultMessage = () => {             
        const today = new Date();
        const currentHour = today.getHours();
        let greeting = "";
        if (currentHour < 12) {
            greeting = "Good morning";
        } else if (currentHour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }        
        defaultMessages[1].text = `${greeting}' '${userProfile?.first_name||""}! Tell me whats on your mind today?`;
        setMessages(defaultMessages);                
        dispatch(setSessionId(""));
    }    

    useEffect(() => {        
        if (isLoading == "none") {
            setIsLoading("started");
            setDefaultMessage();
            setIsLoading("stopped")                 
        }                
    }, [isLoading, messages]);

    if (!assets || isLoading!="stopped") {
        return (
            <View alignItems="center" justifyContent="center" flex="1">
                <Loader></Loader>
            </View>
        )
    }

    return (
        <Box style={[Global.container, { backgroundColor: colors.primary[600] }]} height={"100%"}>
            
            <View backgroundColor={colors.gray[100]} borderTopRadius={30} height={"100%"} overflow={"hidden"}>
                <Box safeAreaBottom={(Platform.OS == "ios") ? 3 : 0}>
                    <KeyboardAvoidingView h={{
                        base: "100%",
                        lg: "auto"
                    }}>
                        <GiftedChat
                            messages={messages}
                            isTyping={botTyping}
                            user={{
                                _id: userProfile?.id || 1,
                            }}
                            alwaysShowSend={true}
                            scrollToBottom={true}
                            minComposerHeight={35}
                            showUserAvatar={false}
                            alignTop={true}                                                        
                            placeholder={(botTyping == true) ? "Bot responding ...":"Type a message ..."}
                            onSend={(messages) => onSend(messages)}                            
                            onInputTextChanged={(text) => userTypingMessage(text)}
                            renderLoading={() => <Loader></Loader>}
                            scrollToBottomComponent={() => <Scroll_Icon />}
                            renderBubble={(props) => <Bubble_Custom props={props} />}
                            renderMessage={(props) => <Message_Custom props={props} />}
                            renderActions={(props) => <Left_Buttons iconUri={assets[3]} clearChatMessages={setDefaultMessage} />}
                            renderSend={(props) => <Right_Buttons props={props} imageUri={assets[2]} />}
                            renderAvatar={() => <Avatar_Custom imageUri={assets[1]}/>}
                            renderComposer={(props) => <Text_Composer props={props} />}
                            renderInputToolbar={(props) => <Input_Toolbar props={props} />}
                            renderFooter={(props) => <Typing_Indicator props={props} />}
                            renderChatFooter={(props) =>
                                (messages.findIndex(message => message.suggestions == true) >= 0) ?
                                    <Suggestion_Box imageUri={assets[0]} sendPrompt={sendPrompt}></Suggestion_Box>
                                    :
                                    <></>
                            }
                            keyboardShouldPersistTaps={"never"}                            
                        />
                    </KeyboardAvoidingView>
                </Box>
            </View >
        </Box >
    )
}