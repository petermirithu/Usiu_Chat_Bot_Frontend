import axios from 'axios';
import promise from 'promise';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Axios = axios.create();

const getAuthToken = async () => {
    const cachedData = await AsyncStorage.getItem('auth_token');
    if (cachedData == "null" || cachedData == "undefined" || cachedData == null || cachedData == undefined) {
        return null
    }
    return cachedData
}

Axios.interceptors.request.use(async (config) => {
    let accessToken = null;
    await getAuthToken().then(token => {
        accessToken = token;
    })

    if (accessToken) {
        if (config.method !== 'OPTIONS') {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return promise.reject(error);
});

const signOut = async () => {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)    
}
Axios.interceptors.response.use(
    (response) => {
        if (response?.status === 401 || response?.status === 403) {
            signOut();
            return Promise.reject("User not authorized or authenticated");
        }
        return response;
    },
    (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            signOut();
            return Promise.reject("User not authorized or authenticated");
        }
        return Promise.reject(error);
    }
);

export default Axios;