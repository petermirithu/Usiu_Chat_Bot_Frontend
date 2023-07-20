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
    IconButton,
    KeyboardAvoidingView,
    ScrollView
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationModal } from "../redux/NotificationSlice";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Keyboard, Platform } from "react-native";
import { setErrorMessage } from "../redux/ErrorHandlerSlice";
import { change_user_password } from "../services/UserService";

export default function ChangePassword({ showChangePswdForm, closeBottomSheetForm }) {
    const { colors } = useTheme();    
    const dispatch = useDispatch();    

    const { userProfile } = useSelector((state) => state.userProfile);

    const [formData, setFormData] = useState(
        {
            currentPassword: { value: "", invalid: false, error: "" },
            newPassword: { value: "", invalid: false, error: "" },
            confirmPassword: { value: "", invalid: false, error: "" },
        }
    );
    const [showPassword, setShowPassword] = useState(false);
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

        if (formData.currentPassword.value?.length < 8) {
            tempForm.currentPassword.invalid = true;
            tempForm.currentPassword.error = "Please provide a valid password!";
            setFormData(tempForm);
        }
        else if (formData.newPassword.value?.length < 8) {
            tempForm.newPassword.invalid = true;
            tempForm.newPassword.error = "Please provide a valid new password!";
            setFormData(tempForm);
        }
        else if (formData.currentPassword.value == formData.newPassword.value) {
            tempForm.newPassword.invalid = true;
            tempForm.newPassword.error = "New password must be different from current one!";
            setFormData(tempForm);
        }        
        else if (formData.newPassword.value !== formData.confirmPassword.value) {
            tempForm.confirmPassword.invalid = true;
            tempForm.confirmPassword.error = "This password does not match the new password above!";
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            const payload = {
                userId: userProfile.id,
                oldPassword: formData.currentPassword.value,
                newPassword: formData.newPassword.value
            }
            await change_user_password(payload).then(response => {                
                setSubmitting(false);
                dispatch(setNotificationModal({
                    show: true,
                    title: "Password updated Successfully",
                    description: "Remember to always keep your password safe",
                    status: "passwordChanged",
                }));                                                        
                closeBottomSheetForm();
            }).catch(error => {
                setSubmitting(false);                                                
                if (error?.response?.data == "invalidPassword") {
                    tempForm.currentPassword.invalid = true;
                    tempForm.currentPassword.error = "Please provide a valid password!";
                    setFormData(tempForm);
                }
                else {                    
                    dispatch(setErrorMessage("Something went wrong while changing your password."));                    
                }                
            });
        }
        Keyboard.dismiss();
    }

    useEffect(() => {
    }, [formData, submitting, showPassword, keyboardOpen])

    return (

        <Actionsheet isOpen={showChangePswdForm} onClose={closeBottomSheetForm}>
            <Actionsheet.Content>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} w={"100%"} h={{
                    base: (Platform.OS=="android")?null:(Platform.OS=="ios" && keyboardOpen==false)?null:"100%",
                    lg: "auto"
                }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View minHeight={300} width={"100%"}>
                            <Text fontSize={20} fontWeight={"bold"}>Change Password</Text>
                            <VStack space={3} mt="5">
                                <FormControl isInvalid={formData.currentPassword.invalid} isRequired={formData.currentPassword.invalid} w="100%">
                                    <FormControl.Label>Current Password</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="currentPassword1" variant={"rounded"}
                                        key={"currentPassword1"}
                                        placeholder={"Enter your current password"}
                                        value={formData.currentPassword.value}
                                        type={showPassword ? "text" : "password"}
                                        onChangeText={(currentPassword) => updateForm("currentPassword", currentPassword)}
                                        InputRightElement={
                                            <IconButton borderRadius={100} variant="ghost" onPress={() => setShowPassword(!showPassword)} _icon={{
                                                as: MaterialIcons,
                                                name: (showPassword == true) ? "visibility" : "visibility-off",
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        {formData.currentPassword.error}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl key={"control-newPassword"} isInvalid={formData.newPassword.invalid} isRequired={formData.newPassword.invalid} w="100%">
                                    <FormControl.Label>New Password</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="newPassword" variant={"rounded"}
                                        key={"newPassword"}
                                        placeholder={"Enter your new password"}
                                        value={formData.newPassword.value}
                                        type={showPassword ? "text" : "password"}
                                        onChangeText={(newPassword) => updateForm("newPassword", newPassword)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        {formData.newPassword.error}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl key={"control-confirmPassword"} isInvalid={formData.confirmPassword.invalid} isRequired={formData.confirmPassword.invalid} w="100%">
                                    <FormControl.Label>Confirm Password</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="confirmPassword" variant={"rounded"}
                                        key={"confirmPassword"}
                                        placeholder={"Re enter the new password here"}
                                        value={formData.confirmPassword.value}
                                        type={showPassword ? "text" : "password"}
                                        onChangeText={(confirmPassword) => updateForm("confirmPassword", confirmPassword)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        {formData.confirmPassword.error}
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
