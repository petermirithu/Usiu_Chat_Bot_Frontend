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
    KeyboardAvoidingView,
    ScrollView
} from "native-base";
import { Global } from "../../styles/Global";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { validateEmail } from "../../services/UserService";
import Loader from "../../components/Loader";
import { Keyboard } from "react-native";
import { useAssets } from 'expo-asset';

export default function ForgotPassword({ navigation }) {
    const { colors } = useTheme();    

    const [assets] = useAssets([require('../../assets/icon.png')])    

    const [formData, setFormData] = useState(
        {
            email: { value: "", invalid: false },
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

    const submitData = () => {
        let tempForm = { ...formData };

        if (validateEmail(formData.email.value) == false) {
            tempForm.email.invalid = true;
            setFormData(tempForm);
        }
        else {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);                
                navigation.navigate("Reset Password");
            }, 2000);
        }
        Keyboard.dismiss();
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} h={{
            base: "100%",
            lg: "auto"
        }}>
            <Box safeArea safeAreaBottom={0} style={Global.container}>                
                <HStack justifyContent={"space-between"} alignItems={"center"} pt={5} px={15}>
                    <IconButton onPress={() => navigation.navigate("Sign In")} borderRadius={100} width={35} height={35} variant="outline" _icon={{
                        as: MaterialIcons,
                        name: "arrow-back",
                        size: "lg"
                    }} />
                </HStack>

                <Image alignSelf={"center"} source={assets[0]} alt="App logo" width={150} height={150} />

                <View padding={5} mt="5" pt={10} flex={1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View mt="5">
                            <Text style={Global.title}>Forgot <Text color={"yellow.500"}>Password</Text></Text>
                            <Text color={"coolGray.500"}>Enter the email address associated with your account and we will send you a verification code.</Text>
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
                            <Button mt="5" onPress={() => submitData()} isLoading={submitting} isLoadingText="Submitting...">Submit</Button>
                        </VStack>
                    </ScrollView>
                </View>
            </Box>
        </KeyboardAvoidingView>
    )
}