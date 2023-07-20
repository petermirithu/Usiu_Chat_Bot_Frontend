import { configureStore } from "@reduxjs/toolkit";
import UserProfileSlice from "./UserProfileSlice";
import ErrorHandlerSlice from "./ErrorHandlerSlice";
import NotificationSlice from "./NotificationSlice";
import ChatSlice from "./ChatSlice";
import { ScreenNavigationSlice } from "./NavigationSlice";

export default configureStore({
    reducer:{                
        userProfile:UserProfileSlice,         
        errorHandler:ErrorHandlerSlice,
        notifications:NotificationSlice,
        chat:ChatSlice,
        screenNavigation:ScreenNavigationSlice,
    }
})