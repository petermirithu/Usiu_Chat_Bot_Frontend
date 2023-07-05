import { configureStore } from "@reduxjs/toolkit";
import UserProfileSlice from "./UserProfileSlice";
import ErrorHandlerSlice from "./ErrorHandlerSlice";
import NotificationSlice from "./NotificationSlice";

export default configureStore({
    reducer:{                
        userProfile:UserProfileSlice,         
        errorHandler:ErrorHandlerSlice,
        notifications:NotificationSlice,
    }
})