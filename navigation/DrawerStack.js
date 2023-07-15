import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerContent from './DrawerContent';
import { useSelector } from 'react-redux';
import Welcome from '../screens/auth/Welcome';
import ErrorPage from '../screens/other/ErrorPage';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import EmailVerification from '../screens/auth/EmailVerification';
import ChatInterface from '../screens/app/ChatInterface';
import Navbar from '../components/Navbar';

export default function DrawerDrawer() {
    const { isAuthenticated } = useSelector((state) => state.userProfile);
    const { showErrorPage } = useSelector((state) => state.errorHandler);

    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();

    const Screens = ({ navigation }) => {
        return (
            <Stack.Navigator initialRouteName="Welcome">
                {(showErrorPage == true) ?
                    <Stack.Group screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Error Page" component={ErrorPage} />
                    </Stack.Group>
                    :
                    <>
                        {(isAuthenticated == true) ?
                            <Stack.Group screenOptions={{
                                headerLeftShown: false,
                                header: () => {
                                    return (
                                        <Navbar {...navigation}></Navbar>
                                    )
                                }
                            }}>
                                <Stack.Screen name="Chat Interface" component={ChatInterface} />
                            </Stack.Group>
                            :
                            <Stack.Group screenOptions={{
                                headerShown: false
                            }}>
                                <Stack.Screen name="Welcome" component={Welcome} />
                                <Stack.Screen name="Sign In" component={SignIn} />
                                <Stack.Screen name="Sign Up" component={SignUp} />
                                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                                <Stack.Screen name="Reset Password" component={ResetPassword} />
                                <Stack.Screen name="Email Verification" component={EmailVerification} />
                            </Stack.Group>
                        }
                    </>
                }
            </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Welcome"
                drawerContent={(props) => <DrawerContent {...props}></DrawerContent>}
                screenOptions={{ headerShown: false, swipeEnabled: isAuthenticated }}
            >
                <Drawer.Screen name="Screens" component={Screens} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}