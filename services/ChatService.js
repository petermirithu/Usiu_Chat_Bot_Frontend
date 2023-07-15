import { BackendServerUrl } from "./GlobalService";
import Axios from "../configurations/Interceptor";

// ********************************************* Server Requests ********************************************* 

export const send_question = (formData) => {
    return Axios.post(BackendServerUrl + "/api/send_question", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}