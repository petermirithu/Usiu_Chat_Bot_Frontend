import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerContent from './DrawerContent';
import { useSelector } from 'react-redux';
import Welcome from '../screens/auth/Welcome';
import ErrorPage from '../screens/other/ErrorPage';

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
                            </Stack.Group>
                            :
                            <Stack.Group screenOptions={{
                                headerShown: false
                            }}>
                                <Stack.Screen name="Welcome" component={Welcome} />                                
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