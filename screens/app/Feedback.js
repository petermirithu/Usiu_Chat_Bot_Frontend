import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    IconButton,
    useTheme,
    Box,
    HStack,
    Flex,
    TextArea,
    KeyboardAvoidingView,
    ScrollView
} from "native-base";
import { Global } from "../../styles/Global";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { setNotificationModal } from "../../redux/NotificationSlice";
import { sendFeedback } from "../../services/UserService";
import { Keyboard, Platform } from "react-native";
import { setErrorMessage } from "../../redux/ErrorHandlerSlice";

export default function Feedback({ navigation }) {
    const { colors } = useTheme();
    const starRatings = [0, 1, 2, 3, 4]
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            feedbackText: { value: "" },
            starRating: { value: null },
            focusAreas: { value: [] }
        }
    );

    const { userProfile } = useSelector((state) => state.userProfile);
    const [submitting, setSubmitting] = useState(false);

    const updateForm = (field, value) => {
        let tempForm = { ...formData };
        if (field == "focusAreas" && !formData.focusAreas.value.includes(value)) {
            tempForm.focusAreas.value.push(value);
        }
        else if (field == "focusAreas" && formData.focusAreas.value.includes(value)) {
            const index = formData.focusAreas.value.indexOf(value);
            formData.focusAreas.value.splice(index, 1);
        }
        else {
            tempForm[field].value = value;
        }
        setFormData(tempForm);
    }

    const submitData = async () => {
        setSubmitting(true);

        const payload = {
            userId: userProfile.id,
            rating: (formData.starRating.value + 1),
            focusAreas: formData.focusAreas.value,
            message: formData.feedbackText.value
        }

        await sendFeedback(payload).then(response => {
            let tempForm = { ...formData };
            tempForm.feedbackText.value = "";
            tempForm.focusAreas.value = [];
            tempForm.starRating.value = null;
            setFormData(tempForm);
            setSubmitting(false);
            dispatch(setNotificationModal({
                show: true,
                title: "Feedback received!",
                description: "Thank you for providing us with feedback.",
                status: "feedbackReceived",
            }));
        }).catch(error => {
            setSubmitting(false);
            dispatch(setErrorMessage("Something went wrong while sending your feedback."));
        });
        Keyboard.dismiss();
    }

    const renderStars = (index) => {
        return (
            <IconButton
                key={index}
                colorScheme={"primary"}
                onPress={() => updateForm("starRating", index)}
                variant="solid" _icon={{
                    as: FontAwesome,
                    name: (formData.starRating.value >= index) ? "star" : "star-o",
                    size: "2xl",
                }} />
        )
    }

    useEffect(() => {
    }, [formData, submitting])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} h={{
            base: "100%",
            lg: "auto"
        }}>
            <Box style={[Global.container, { backgroundColor: colors.primary[600] }]} height={"100%"}>
                <Text mt={5} fontWeight={"bold"} color="white" textAlign={"center"} fontSize={15}>Are you satisfied with what we offer?</Text>
                <HStack space={3} justifyContent={"center"} alignItems={"center"}>
                    {
                        starRatings.map(element => {
                            return renderStars(element)
                        })
                    }
                </HStack>
                <View mt={10} backgroundColor={colors.gray[100]} flex={1} borderTopRadius={30} padding={5} height={"100%"}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <Text fontWeight={"bold"} color="gray.600" textAlign={"center"} fontSize={15}>Tell us what we can improve?</Text>
                        <Flex direction="row" flexWrap={"wrap"} justifyContent={"center"} mt={3}>
                            <Button mr={5} mb={3}
                                bgColor={(formData.focusAreas.value.includes("User Experience") == true) ? "gray.600" : "white"}
                                variant={(formData.focusAreas.value.includes("User Experience") == true) ? "solid" : "outline"}
                                colorScheme={"gray"}
                                onPress={() => updateForm("focusAreas", "User Experience")}>
                                User Experience
                            </Button>
                            <Button mr={5} mb={3}
                                bgColor={(formData.focusAreas.value.includes("Bot accuracy") == true) ? "gray.600" : "white"}
                                variant={(formData.focusAreas.value.includes("Bot accuracy") == true) ? "solid" : "outline"}
                                colorScheme={"gray"}
                                onPress={() => updateForm("focusAreas", "Bot accuracy")}>
                                Bot accuracy
                            </Button>
                            <Button mr={5} mb={3}
                                bgColor={(formData.focusAreas.value.includes("Fault tolerance") == true) ? "gray.600" : "white"}
                                variant={(formData.focusAreas.value.includes("Fault tolerance") == true) ? "solid" : "outline"}
                                colorScheme={"gray"}
                                onPress={() => updateForm("focusAreas", "Fault tolerance")}>
                                Fault tolerance
                            </Button>
                            <Button mr={5} mb={3}
                                bgColor={(formData.focusAreas.value.includes("Other") == true) ? "gray.600" : "white"}
                                variant={(formData.focusAreas.value.includes("Other") == true) ? "solid" : "outline"}
                                colorScheme={"gray"}
                                onPress={() => updateForm("focusAreas", "Other")}>
                                Other
                            </Button>
                        </Flex>

                        <TextArea
                            keyboardType="default"
                            placeholder="Write a brief description of what you would want done or the issue you faced."
                            borderRadius={20}
                            minHeight={100}
                            backgroundColor={"white"}
                            value={formData.feedbackText.value}
                            onChangeText={(feedbackText) => updateForm("feedbackText", feedbackText)}
                        >
                        </TextArea>
                        <Button mt="5" isDisabled={formData.starRating.value == null} onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}