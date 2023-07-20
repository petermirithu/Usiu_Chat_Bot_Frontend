import { createSlice } from "@reduxjs/toolkit";

/**
 * Screen Navigation Slice
 */

export const ScreenNavigationSlice = createSlice({
    name:"screenNavigation",
    initialState:{
        currentRoute: "Chat Interface",        
    },
    reducers:{        
        setCurrentRoute:(state, action)=>{                   
            state.currentRoute=action.payload;                           
        },             
    }
});

export const {setCurrentRoute} = ScreenNavigationSlice.actions;

export default ScreenNavigationSlice.reducer;