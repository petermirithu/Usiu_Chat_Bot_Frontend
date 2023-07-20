import React, { useContext, useEffect, useState } from "react";
import {
    Text,
    Actionsheet,
    View,
    useTheme,
    VStack,
    FormControl,
    Input,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    IconButton
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationModal } from "../redux/NotificationSlice";
import { FontAwesome5 } from '@expo/vector-icons';
import { update_user, validateEmail } from "../services/UserService";
import { setUserProfile } from "../redux/UserProfileSlice";
import { Platform, Keyboard } from "react-native";
import { setErrorMessage } from "../redux/ErrorHandlerSlice";

export default function ProfileUpdate({ showUpdateProfileForm, closeBottomSheetForm }) {
    const { colors } = useTheme();

    const dispatch = useDispatch();    

    const { userProfile } = useSelector((state) => state.userProfile);
    

    const [formData, setFormData] = useState(
        {
            first_name: { value: userProfile.first_name, invalid: false, error: "" },
            last_name: { value: userProfile.last_name, invalid: false, error: "" },
            email: { value: userProfile.email, invalid: false, error: "" },
        }
    );

    const [submitting, setSubmitting] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardOpen(true);
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardOpen(false);
        }
    );


    const updateForm = (field, value) => {
        let tempForm = { ...formData };
        tempForm[field].value = value;
        if (tempForm[field].invalid == true && value?.length > 0) {
            tempForm[field].invalid = false;
        }
        setFormData(tempForm);
    }

    const submitData = async () => {
        let tempForm = { ...formData };

        if (formData.first_name.value?.length < 3) {
            tempForm.first_name.invalid = true;
            setFormData(tempForm);
        }
        else if (formData.last_name.value?.length < 3) {
            tempForm.last_name.invalid = true;
            setFormData(tempForm);
        }
        else if (validateEmail(formData.email.value) == false) {
            tempForm.email.invalid = true;
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            const payload = {
                userId : userProfile.id,
                firstName:formData.first_name.value,
                lastName:formData.last_name.value,
                email:formData.email.value               
            };
            
            await update_user(payload).then(response => {
                let tempProfile = { ...userProfile };
                tempProfile["first_name"] = formData.first_name.value;
                tempProfile["last_name"] = formData.last_name.value;
                tempProfile["email"] = formData.email.value;
                dispatch(setUserProfile(tempProfile));
                setSubmitting(false);

                dispatch(setNotificationModal({
                    show: true,
                    title: "Profile updated Successfully",
                    description: "Your information is up to date.",
                    status: "profileUpdated",
                }));                                      
                closeBottomSheetForm();
            }).catch(error => {                
                setSubmitting(false);
                dispatch(setErrorMessage("Something went wrong while updating your profile."));                
            });
        }
        Keyboard.dismiss();
    }

    useEffect(() => {
    }, [formData, submitting, keyboardOpen])

    return (
        <Actionsheet isOpen={showUpdateProfileForm} onClose={closeBottomSheetForm}>
            <Actionsheet.Content>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} w={"100%"} h={{
                    base: (Platform.OS == "android") ? null : (Platform.OS == "ios" && keyboardOpen == false) ? null : "100%",
                    lg: "auto"
                }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View minHeight={300} width={"100%"}>
                            <Text fontSize={20} fontWeight={"bold"}>Edit Profile Information</Text>
                            <VStack space={3} mt="5">
                                <FormControl isInvalid={formData.first_name.invalid} isRequired={formData.first_name.invalid} w="100%">
                                    <FormControl.Label>First name</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="first_name" variant={"rounded"}
                                        placeholder={"Enter your first name"}
                                        value={formData.first_name.value}
                                        onChangeText={(first_name) => updateForm("first_name", first_name)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        Please provide a valid first name!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formData.last_name.invalid} isRequired={formData.last_name.invalid} w="100%">
                                    <FormControl.Label>Last name</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="last_name" variant={"rounded"}
                                        placeholder={"Enter your last name"}
                                        value={formData.last_name.value}
                                        onChangeText={(last_name) => updateForm("last_name", last_name)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        Please provide a valid last name!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formData.email.invalid} isRequired={formData.email.invalid} w="100%">
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input
                                        keyboardType="email-address"
                                        nativeID="email" variant={"rounded"}
                                        placeholder={"Enter your email"}
                                        value={formData.email.value}
                                        onChangeText={(email) => updateForm("email", email)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        Please provide a valid email!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                            </VStack>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}   
