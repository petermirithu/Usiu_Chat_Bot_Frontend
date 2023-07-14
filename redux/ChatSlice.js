import { createSlice } from "@reduxjs/toolkit";

/**
 * Chat Slice
 */

export const ChatSlice = createSlice({
    name:"chat",
    initialState:{
        botTyping: false,
        userTyping: false,                                         
    },
    reducers:{        
        setBotTyping:(state, action)=>{                   
            state.botTyping=action.payload;            
        },             
        setUserTyping:(state, action)=>{                   
            state.userTyping=action.payload;            
        },                                             
    }
});

export const {
    setBotTyping, setUserTyping
} = ChatSlice.actions;

export default ChatSlice.reducer;


