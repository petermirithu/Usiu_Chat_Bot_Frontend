import Axios from "../configurations/Interceptor";
import { BackendServerUrl } from "./GlobalService";

export const validateEmail = (text) => {
    const regex1 = /^\S+@\S+\.\S+$/;
    const regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (regex1.test(text) === false && regex2.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}
// ********************************************* Server Requests ********************************************* 
export const register_user = (payload) => {
    return Axios.post(BackendServerUrl + "/api/register_user", payload);
}

export const login_user = (payload) => {
    return Axios.post(BackendServerUrl + "/api/login_user", payload);
}

export const resend_verification_code = (payload) => {
    return Axios.post(BackendServerUrl + "/api/resend_verification_code", payload);
}

export const verify_verification_code = (payload) => {
    return Axios.post(BackendServerUrl + "/api/verify_verification_code", payload);
}