import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthToken = async (data) => {
    await AsyncStorage.setItem("auth_token", data);
}

export const clearCacheItem = async (name) => {
    if (name == "everything") {
        await AsyncStorage.clear();
    }
    else {
        await AsyncStorage.removeItem(name);
    }
}

export const getCachedUserProfile = async () => {
    const cachedData = await AsyncStorage.getItem("Profile");
    if (cachedData == "null" || cachedData == "undefined" || cachedData == null || cachedData == undefined) {
        return null
    }
    else {
        return JSON.parse(cachedData);
    }
}

export const setCachedUserProfile = async (data) => {
    await AsyncStorage.setItem("Profile", JSON.stringify(data));
}

export const globalSignUserOut = async (email) => {
    return new Promise(async (resolve, reject) => {
        clearCacheItem("everything");
        resolve();
    });
}

export const getCachedSessionId = async () => {
    const cachedData = await AsyncStorage.getItem("sessionId");
    if (cachedData == "null" || cachedData == "undefined" || cachedData == null || cachedData == undefined) {
        return ""
    }
    else {
        return cachedData
    }
}

export const setCachedSessionId = async (data) => {
    if(data!=null || data!=undefined){
        await AsyncStorage.setItem("sessionId", data);
    }
}