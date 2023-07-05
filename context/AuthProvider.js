import React, { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { View, useTheme } from "native-base";
import NotificationModal from "../components/NotificationModal";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(null);

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
            {children}
            <NotificationModal></NotificationModal>
        </AuthContext.Provider>
    )
}