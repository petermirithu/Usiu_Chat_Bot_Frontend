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
        fetchChats:false,        
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
        setFetchChats:(state, action)=>{              
            state.fetchChats=action.payload;              
        }                                           
    }
});

export const {
    setBotTyping, setUserTyping, setSessionId, setFetchChats
} = ChatSlice.actions;

export default ChatSlice.reducer;


