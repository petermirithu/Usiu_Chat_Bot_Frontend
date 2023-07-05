import { configureStore } from "@reduxjs/toolkit";
import UserProfileSlice from "./UserProfileSlice";
import ErrorHandlerSlice from "./ErrorHandlerSlice";

export default configureStore({
    reducer:{                
        userProfile:UserProfileSlice,         
        errorHandler:ErrorHandlerSlice
    }
})