import React, { useEffect, useState } from "react";
import {
    Text,
    Modal,
    Button,
    View,
    Image,
    useTheme
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationModal } from "../redux/NotificationSlice";
import Loader from "./Loader";
import { useAssets } from "expo-asset";

export default function NotificationModal() {
    const dispatch = useDispatch();

    const [assets] = useAssets([
        require('../assets/Images/shield.png'),
        require('../assets/Images/message.png'),
        require('../assets/Images/successful.png'),
        require('../assets/Images/invalidLogin.png'),
        require('../assets/Images/thumbs-up.png')
    ])

    const { notificationModal } = useSelector((state) => state.notifications);

    const closeModal = () => {
        dispatch(setNotificationModal({
            show: false,
            title: "",
            description: "",
            status: "",
        }));
    }

    useEffect(() => {
    }, [])

    if (!assets) {
        return (
            <View alignItems="center" justifyContent="center" flex="1">
                <Loader></Loader>
            </View>
        )
    }

    return (
        <Modal animationPreset="slide" isOpen={notificationModal.show} onClose={() => closeModal()}>
            <Modal.Content width={"85%"}>
                <Modal.CloseButton />
                <Modal.Body>
                    <View width={"100%"} justifyContent={"center"} alignItems={"center"} mt={5}>
                        {(notificationModal.status == "invalidCredentials") ?
                            <Image alignSelf={"center"} source={assets[3]} alt="Warning icon" width={75} height={75} />
                            :
                            <>
                                {(notificationModal.status == "feedbackReceived") ?
                                    <Image
                                        source={assets[4]} alt="success icon" width={75} height={75} />
                                    :
                                    <>
                                        {(notificationModal.status == "passwordChanged") ?
                                            <Image alignSelf={"center"} source={assets[0]} alt="Success icon" width={75} height={75} />
                                            :
                                            <>
                                                {(notificationModal.status == "emailSent") ?
                                                    <Image alignSelf={"center"} source={assets[1]} alt="Success icon" width={75} height={75} />
                                                    :
                                                    <Image alignSelf={"center"} source={assets[2]} alt="Success icon" width={75} height={75} />
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                        <Text
                            color={(notificationModal.status == "invalidCredentials") ? "yellow.500" : "success.500"}
                            fontSize={20}
                            fontWeight={"bold"}
                            mt={5}
                        >
                            {notificationModal.title}
                        </Text>
                        <Text color={"coolGray.500"} fontSize={12}>{notificationModal.description}</Text>
                        <Button mt={5} size={"sm"} width={"100%"} onPress={closeModal}>Got it</Button>
                    </View>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}



