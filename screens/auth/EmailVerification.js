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
    Link,
    KeyboardAvoidingView,
    ScrollView,
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { Keyboard } from "react-native";
import { setNotificationModal } from "../../redux/NotificationSlice";
import { useAssets } from "expo-asset";
import { resend_verification_code, verify_verification_code } from "../../services/UserService";
import { setIsAuthenticated, setUserProfile } from "../../redux/UserProfileSlice";
import { storeAuthToken } from "../../services/CacheService";

export default function EmailVerification({ route, navigation }) {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    
    const [assets] = useAssets([require('../../assets/icon.png')])        

    const [formData, setFormData] = useState(
        {
            verificationCode: { value: "", invalid: false, error: "" }
        }
    );    
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

        if (tempForm.verificationCode.value?.length != 6) {
            tempForm.verificationCode.invalid = true;
            tempForm.verificationCode.error = "Invalid verification code!";
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            await verify_verification_code({userId:route?.params?.userId, code:formData.verificationCode.value}).then(result=>{                                              
                storeAuthToken(result?.data?.auth_token);
                delete result.data.auth_token;
                dispatch(setUserProfile(result.data));
                setSubmitting(false);
                dispatch(setIsAuthenticated(true));
            }).catch(error=>{                
                setSubmitting(false);
                alert(error?.response?.data);
            });            
        }
        Keyboard.dismiss();
    }

    const resendVerificationCode = async () => {
        setSubmitting(true);
        await resend_verification_code({userId:route?.params?.userId}).then(response=>{
            setSubmitting(false);
            dispatch(setNotificationModal({
                show: true,
                title: "Code sent Successfully!",
                description: "Please check your email for the code.",
                status: "emailSent",
            })); 
        }).catch(error=>{
            setSubmitting(false);
            alert(error?.response?.data);          
        });        
    }    

    useEffect(() => {
    }, [formData, submitting])

    if (!assets) {
        return (
            <View alignItems="center" justifyContent="center" flex="1">
                <Loader></Loader>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView h={{
            base: "100%",
            lg: "auto"
        }}>
            <Box safeArea safeAreaBottom={0} style={Global.container} height={"100%"}>                
                <HStack justifyContent={"space-between"} alignItems={"center"} pt={5} px={15}>
                    <IconButton onPress={() => navigation.navigate("Sign In")} borderRadius={100} width={35} height={35} variant="outline" _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
                </HStack>

                <Image alignSelf={"center"} source={assets[0]} alt="App logo" width={150} height={150} />

                <View backgroundColor={"gray[100]"} borderTopRadius={30} padding={5} mt="5" pt={10} flex={1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View mt="5">
                            <Text style={Global.title}>Email <Text color={"yellow.500"}>Verification</Text></Text>
                            <Text color={"coolGray.500"}>Enter the verification code we just sent to your email: {route?.params?.Destination}</Text>
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
                            <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                        </VStack>
                        <HStack isDisabled={submitting} space={3} justifyContent={"center"} alignItems={"center"} mt={150}>
                            <Text>Didn't receive code?</Text>
                            <Link
                                onPress={resendVerificationCode}
                                isUnderlined={false}
                                _text={{
                                    color: "primary.600",
                                    fontWeight: "bold"
                                }}
                            >Resend</Link>
                        </HStack>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}