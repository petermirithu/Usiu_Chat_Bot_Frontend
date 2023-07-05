import { createSlice } from "@reduxjs/toolkit";

/**
 * Error Handler Slice
 */

export const ErrorHandlerSlice = createSlice({
    name:"errorHandlerSlice",
    initialState:{            
        showErrorPage: false,
        errorMessage: "",
    },
    reducers:{        
        setErrorMessage:(state, action)=>{                   
            state.errorMessage=action.payload;               
            if(action.payload?.length>0){
                state.showErrorPage=true;
            }
            else{
                state.showErrorPage=false;
            }
        },             
    }
});

export const {setErrorMessage} = ErrorHandlerSlice.actions;

export default ErrorHandlerSlice.reducer;


