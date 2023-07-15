import { createSlice } from "@reduxjs/toolkit";
import { setCachedSessionId } from "../services/CacheService";

/**
 * Chat Slice
 */

export const ChatSlice = createSlice({
    name:"chat",
    initialState:{
        botTyping: false,
        userTyping: false,                                         
        sessionId:"",
    },
    reducers:{        
        setBotTyping:(state, action)=>{                   
            state.botTyping=action.payload;            
        },             
        setUserTyping:(state, action)=>{                   
            state.userTyping=action.payload;            
        },
        setSessionId:(state, action)=>{                   
            state.sessionId=action.payload;  
            setCachedSessionId(action.payload);           
        },                                             
    }
});

export const {
    setBotTyping, setUserTyping, setSessionId
} = ChatSlice.actions;

export default ChatSlice.reducer;


