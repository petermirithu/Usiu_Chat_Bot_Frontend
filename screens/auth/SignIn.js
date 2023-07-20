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
    KeyboardAvoidingView,
    ScrollView
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { login_user, validateEmail } from "../../services/UserService";
import Loader from "../../components/Loader";
import { Keyboard } from "react-native";
import { useAssets } from 'expo-asset';
import { storeAuthToken } from "../../services/CacheService";
import { setIsAuthenticated, setUserProfile } from "../../redux/UserProfileSlice";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../redux/ErrorHandlerSlice";
import { setNotificationModal } from "../../redux/NotificationSlice";

export default function SignIn({ navigation }) {
    const { colors } = useTheme();    
    const dispatch = useDispatch();

    const [assets] = useAssets([require('../../assets/icon.png')])

    const [formData, setFormData] = useState(
        {
            email: { value: "", invalid: false },
            password: { value: "", invalid: false },
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
        if (validateEmail(formData.email.value) == false) {
            tempForm.email.invalid = true;
            setFormData(tempForm);            
        }
        else if (formData.password.value?.length < 8) {
            tempForm.password.invalid = true;
            tempForm.password.value = "";
            tempForm.password.error = "Please enter a valid Password. It must have at least 8 characters.";
            setFormData(tempForm);            
        }
        else {
            setSubmitting(true);
            const payload={
                email:formData.email.value,
                password:formData.password.value
            }
            await login_user(payload).then(result=>{                
                storeAuthToken(result?.data?.auth_token);
                delete result.data.auth_token;
                dispatch(setUserProfile(result.data));
                setSubmitting(false);
                dispatch(setIsAuthenticated(true));
            }).catch(error=>{    
                setSubmitting(false);     
                if (error?.response?.data == "invalidCredentials") {
                    dispatch(setNotificationModal({
                        show: true,
                        title: "Invalid login credentials!",
                        description: "Please try again with the correct credentials.",
                        status: "invalidCredentials",
                    }));   
                }
                else{
                    dispatch(setErrorMessage("Something went wrong while authenticating you."));
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
                    <IconButton onPress={() => navigation.navigate("Welcome")} borderRadius={100} width={35} height={35} variant="outline" _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
                    <Button variant="outline" onPress={() => navigation.navigate('Sign Up')}>Sign Up</Button>
                </HStack>

                <Image alignSelf={"center"} source={assets[0]} alt="App logo" width={150} height={150} />

                <View backgroundColor={"gray[100]"} borderTopRadius={30} padding={5} mt="5" pt={10} flex={1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View mt="5">
                            <Text style={Global.title}>Welcome <Text color={"yellow.500"}>Back</Text>!</Text>
                            <Text color={"coolGray.500"}>Sign in to continue!</Text>
                        </View>

                        <VStack space={3} mt="5">
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
                            <FormControl isInvalid={formData.password.invalid} isRequired={formData.password.invalid} w="100%">
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    keyboardType="default"
                                    nativeID="password" variant={"rounded"}
                                    placeholder={"Password must have at least 8 characters"}
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
                                    Please provide a valid password!
                                </FormControl.ErrorMessage>
                                <Button mt={3} variant={"link"} alignSelf={"flex-end"}
                                    onPress={() => navigation.navigate("Forgot Password")}
                                >Forgot Password?</Button>
                            </FormControl>
                            <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                        </VStack>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}