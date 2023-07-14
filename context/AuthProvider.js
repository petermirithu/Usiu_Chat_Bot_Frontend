import React, { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { View, useTheme } from "native-base";
import NotificationModal from "../components/NotificationModal";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(null);

    const { isAuthenticated } = useSelector((state) => state.userProfile);

    const checkIfAuthenticated = async () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
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