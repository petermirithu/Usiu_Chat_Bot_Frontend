import React, { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { View, useTheme } from "native-base";
import NotificationModal from "../components/NotificationModal";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUserProfile } from "../redux/UserProfileSlice";
import { getCachedUserProfile, globalSignUserOut } from "../services/CacheService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.userProfile);

    const checkIfAuthenticated = async () => {
        await getCachedUserProfile().then(async data => {
            if (data != null) {                                
                dispatch(setUserProfile(data));                
                dispatch(setIsAuthenticated(true));                                                                        
            }
            else {
                await globalSignUserOut();
                dispatch(setIsAuthenticated(false));                                                                        
            }
            setIsLoading(false);
        });        
    }

    useEffect(() => {
        if (isLoading == null) {
            setIsLoading(true);
            checkIfAuthenticated();
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <View alignItems="center" justifyContent="center" flex="1" backgroundColor={colors["primary.100"]}>
                <Loader></Loader>
            </View>
        )
    }

    return (
        <AuthContext.Provider value={{

        }}>
            <StatusBar
                animated={true}
                backgroundColor={(isAuthenticated == true) ? colors.primary[600] : "#FFFFFF"}
                style={(isAuthenticated == true) ? "light" : "dark"}
            />
            {children}
            <NotificationModal></NotificationModal>
        </AuthContext.Provider>
    )
}