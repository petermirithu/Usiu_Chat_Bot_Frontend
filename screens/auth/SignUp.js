import React, { useEffect, useState } from "react";
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
    KeyboardAvoidingView,
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { register_user, validateEmail } from "../../services/UserService";
import Loader from "../../components/Loader";
import { useAssets } from 'expo-asset';
import { Keyboard } from "react-native";

export default function SignUp({ navigation }) {
    const { colors } = useTheme();

    const [assets] = useAssets([require('../../assets/icon.png')])

    const [formData, setFormData] = useState(
        {
            firstName: { value: "", invalid: false, error: "" },
            lastName: { value: "", invalid: false, error: "" },
            email: { value: "", invalid: false, error: "" },
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

        if (formData.firstName.value?.length < 3) {
            tempForm.firstName.invalid = true;
            tempForm.firstName.error = "Please provide a valid First name!";
            setFormData(tempForm);
        }
        else if (formData.lastName.value?.length < 3) {
            tempForm.lastName.invalid = true;
            tempForm.lastName.error = "Please provide a valid First name!";
            setFormData(tempForm);
        }
        else if (validateEmail(formData.email.value) == false) {
            tempForm.email.invalid = true;
            tempForm.email.error = "Please provide a valid email!";
            setFormData(tempForm);
        }
        else if (formData.password.value?.length < 8) {
            tempForm.password.invalid = true;
            tempForm.password.value = "";
            tempForm.password.error = "Please enter a valid Password. It must have at least 8 characters.";
            setFormData(tempForm);
        }
        else if (formData.password.value != formData.confirmPassword.value) {
            tempForm.confirmPassword.invalid = true;
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            const payload={
                firstName: formData.firstName.value,
                lastName: formData.lastName.value,
                email: formData.email.value,
                password: formData.password.value
            }
            await register_user(payload).then(response=>{                
                setSubmitting(false);                                                
                navigation.navigate("Email Verification", { Destination: formData.email.value, userId:response.data.id });
            }).catch(error=>{                
                setSubmitting(false);
                alert("Oops! Something went wrong while creating your account.")
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
            <Box safeArea safeAreaBottom={0} style={[Global.container]}>
                <HStack justifyContent={"space-between"} alignItems={"center"} pt={5} px={15}>
                    <IconButton onPress={() => navigation.navigate("Welcome")} borderRadius={100} width={35} height={35} variant="outline" _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
                    <Button variant={"outline"} onPress={() => navigation.navigate('Sign In')}>Sign In</Button>
                </HStack>

                <Image alignSelf={"center"} source={assets[0]} alt="App logo" width={150} height={150} />

                <View backgroundColor={"gray[100]"} borderTopRadius={30} padding={5} mt="0" pt={0} flex={1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View mt="5">
                            <Text style={Global.title}>Create <Text color={"yellow.500"}>Account</Text></Text>
                            <Text color={"coolGray.500"}>Set up your profile information to get started.</Text>
                        </View>

                        <VStack space={3} mt="5">
                            <HStack flex={1} justifyContent={"space-between"}>
                                <FormControl isInvalid={formData.firstName.invalid} isRequired={formData.firstName.invalid} w="48%">
                                    <FormControl.Label>First Name</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="firstName" variant={"rounded"}
                                        placeholder={"Type here"}
                                        value={formData.firstName.value}
                                        onChangeText={(firstName) => updateForm("firstName", firstName)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        {formData.firstName.error}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formData.lastName.invalid} isRequired={formData.lastName.invalid} w="48%">
                                    <FormControl.Label>Last Name</FormControl.Label>
                                    <Input
                                        keyboardType="default"
                                        nativeID="lastName" variant={"rounded"}
                                        placeholder={"Type here"}
                                        value={formData.lastName.value}
                                        onChangeText={(lastName) => updateForm("lastName", lastName)}
                                        InputRightElement={
                                            <IconButton variant="unstyled" _icon={{
                                                size: "lg"
                                            }} />
                                        }
                                    />
                                    <FormControl.ErrorMessage mt="2" leftIcon={<FontAwesome5 name="exclamation-circle" size={10} color={colors["danger"][500]} />}>
                                        {formData.lastName.error}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>
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
                                    {formData.email.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formData.password.invalid} isRequired={formData.password.invalid} w="100%">
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    keyboardType="default"
                                    nativeID="password" variant={"rounded"}
                                    placeholder={"Must be strong with at least 8 characters"}
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
                                    placeholder={"Must match the password above"}
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

                            <Text mt="2" fontSize={12} fontFamily={"Poppins-Regular"}>By registering you are agreeing to
                                <Text color={"primary.600"}> Terms of Service and Privacy policy</Text>
                            </Text>

                            <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                        </VStack>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}