import { createSlice } from "@reduxjs/toolkit";
import { setCachedUserProfile } from "../services/CacheService";

/**
 * UserProfile Slice
 */

export const UserProfileSlice = createSlice({
    name:"userProfile",
    initialState:{
        userProfile: null,         
        isAuthenticated: false,        
    },
    reducers:{        
        setUserProfile:(state, action)=>{                   
            state.userProfile=action.payload;                           
            setCachedUserProfile(action.payload);
        },            
        setIsAuthenticated:(state, action)=>{                   
            state.isAuthenticated=action.payload;                                       
        },          
    }
});

export const { setUserProfile, setIsAuthenticated } = UserProfileSlice.actions;

export default UserProfileSlice.reducer;


