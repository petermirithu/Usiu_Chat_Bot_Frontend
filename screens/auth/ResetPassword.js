import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    IconButton,
    HStack,
    FormControl,
    useTheme,
    Box,
    VStack,
    Input,
    Image,
    ScrollView,
    KeyboardAvoidingView
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { setNotificationModal } from "../../redux/NotificationSlice";
import { Keyboard } from "react-native";
import { useAssets } from "expo-asset";
import { user_reset_password } from "../../services/UserService";
import { setErrorMessage } from "../../redux/ErrorHandlerSlice";

export default function ResetPassword({ route, navigation }) {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const [assets] = useAssets([require('../../assets/icon.png')])

    const [formData, setFormData] = useState(
        {
            verificationCode: { value: "", invalid: false, error: "" },
            password: { value: "", invalid: false, error: "" },
            confirmPassword: { value: "", invalid: false, error: "" },
        }
    );
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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
        if (formData.verificationCode.value?.length != 6) {
            tempForm.verificationCode.invalid = true;
            tempForm.verificationCode.error = "Wrong verification code!";
            setFormData(tempForm);
        }
        else if (formData.password.value?.length < 8) {
            tempForm.password.invalid = true;
            tempForm.password.value = "";
            tempForm.password.error = "Please enter a valid Password. It must have at least 8 characters.";
            setFormData(tempForm);
        }
        else if (formData.password.value !== formData.confirmPassword.value) {
            tempForm.confirmPassword.invalid = true;
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            const payload={
                email: route.params.email,
                verificationCode: formData.verificationCode.value,
                password: formData.password.value,
            }
            await user_reset_password(payload).then(response=>{
                setSubmitting(false);
                dispatch(setNotificationModal({
                    show: true,
                    title: "Password reset Successfully",
                    description: "Now, sign in using your new password.",
                    status: "passwordChanged",
                }));
                navigation.navigate("Sign In");
            }).catch(error=>{
                setSubmitting(false);                
                if (error?.response?.data == "codeExpired") {
                    tempForm.verificationCode.invalid = true;
                    tempForm.verificationCode.error = "Verification code expired!";
                    setFormData(tempForm);
                }
                else if (error?.response?.data == "invalidVerificationCode") {
                    tempForm.verificationCode.invalid = true;
                    tempForm.verificationCode.error = "Wrong verification code!";
                    setFormData(tempForm);
                }                
                else{
                    dispatch(setErrorMessage("Something went wrong while reseting your password."));                
                }
            });            
        }
        Keyboard.dismiss();
    }    

    useEffect(() => {
    }, [formData, showPassword, submitting])

    if (!assets) {
        return (
            <View alignItems="center" justifyContent="center" flex="1">
                <Loader></Loader>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} h={{
            base: "100%",
            lg: "auto"
        }}>
            <Box safeArea safeAreaBottom={0} style={Global.container}>
                <HStack justifyContent={"space-between"} alignItems={"center"} pt={5} px={15}>
                    <IconButton onPress={() => navigation.navigate("Forgot Password")} borderRadius={100} width={35} height={35} variant="outline" _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
                </HStack>

                <Image alignSelf={"center"} source={assets[0]} alt="App logo" width={150} height={150} />

                <View backgroundColor={"gray[100]"} borderTopRadius={30} padding={5} mt="0" pt={0} flex={1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View mt="5">
                            <Text style={Global.title}>
                                Reset <Text color={"yellow.500"}>Password</Text>
                            </Text>
                            <Text color={"coolGray.500"}>Your new password must be different from the old password.</Text>
                        </View>

                        <VStack space={3} mt="5">
                            <FormControl isInvalid={formData.verificationCode.invalid} isRequired={formData.verificationCode.invalid} w="100%">
                                <FormControl.Label>Verification Code</FormControl.Label>
                                <Input
                                    keyboardType="numeric"
                                    nativeID="verificationCode" variant={"rounded"}
                                    placeholder={"Check your email for the verification code"}
                                    value={formData.verificationCode.value}
                                    onChangeText={(verificationCode) => updateForm("verificationCode", verificationCode)}
                                    InputRightElement={
                                        <IconButton variant="unstyled" _icon={{
                                            size: "lg"
                                        }} />
                                    }
                                />
                                <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                    {formData.verificationCode.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formData.password.invalid} isRequired={formData.password.invalid} w="100%">
                                <FormControl.Label>New Password</FormControl.Label>
                                <Input
                                    keyboardType="default"
                                    nativeID="password" variant={"rounded"}
                                    placeholder={"Must have at least 8 characters"}
                                    value={formData.password.value}
                                    type={showPassword ? "text" : "password"}
                                    onChangeText={(password) => updateForm("password", password)}
                                    InputRightElement={
                                        <IconButton borderRadius={100} variant="ghost" onPress={() => setShowPassword(!showPassword)} _icon={{
                                            as: MaterialIcons,
                                            name: (showPassword == true) ? "visibility" : "visibility-off",
                                            size: "lg"
                                        }} />
                                    }
                                />
                                <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={7} color={colors["danger"][500]} />}>
                                    {formData.password.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formData.confirmPassword.invalid} isRequired={formData.confirmPassword.invalid} w="100%">
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input
                                    keyboardType="default"
                                    nativeID="confirmPassword" variant={"rounded"}
                                    placeholder={"Must match the new password above"}
                                    value={formData.confirmPassword.value}
                                    type={showPassword ? "text" : "password"}
                                    onChangeText={(confirmPassword) => updateForm("confirmPassword", confirmPassword)}
                                    InputRightElement={
                                        <IconButton variant="unstyled" _icon={{
                                            size: "lg"
                                        }} />
                                    }
                                />
                                <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={7} color={colors["danger"][500]} />}>
                                    This password does not match the password above!
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                        </VStack>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}