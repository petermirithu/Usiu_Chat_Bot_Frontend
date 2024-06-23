import { BackendServerUrl } from "./GlobalService";
import Axios from "../configurations/Interceptor";

// ********************************************* Server Requests ********************************************* 

export const send_question = (formData) => {
    return Axios.post(BackendServerUrl + "/api/send_question", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const fetch_conversations = (userId) => {
    return Axios.get(BackendServerUrl + "/api/fetch_conversations/" + userId);
}

export const delete_conversation = (sessionId) => {
    return Axios.delete(BackendServerUrl + "/api/delete_conversation/" + sessionId);
}

export const fetch_conversation_history = (userId, fromIndex, toIndex) => {
    return Axios.get(BackendServerUrl + "/api/fetch_conversation_history/" + userId + "/" + fromIndex + "/"+toIndex);
}