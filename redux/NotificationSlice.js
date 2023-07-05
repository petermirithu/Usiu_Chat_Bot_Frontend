import { createSlice } from "@reduxjs/toolkit";

/**
 * Notification Slice
 */

export const NotificationSlice = createSlice({
    name:"notifications",
    initialState:{                
        notificationModal:{
            show: false,
            title: "",
            description: "",
            status: "",
        }
    },
    reducers:{                        
        setNotificationModal:(state, action)=>{                   
            state.notificationModal = action.payload;
        }              
    }
});

export const { setNotificationModal } = NotificationSlice.actions;

export default NotificationSlice.reducer;