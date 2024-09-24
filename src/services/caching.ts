import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        const response = await request;
        await setInCache(key, response);
        return response;
    } catch (e) {
        return getFromCache<T>(key);
    }
};

export const setInCache = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Failed to save data to cache', e);
    }
};

export const getFromCache = async <T>(key: string): Promise<T> => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json != null ? JSON.parse(json) : Promise.reject(`Key "${key}" not in cache`);
    } catch (e) {
        console.error('Failed to retrieve data from cache', e);
        return Promise.reject(e);
    }
};
