import * as SecureStore from "expo-secure-store";

const tokenCache = {
    getToken: async (key: string) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch {
            return null;
        }
    },
    saveToken: async (key: string, token: string) => {
        try {
            await SecureStore.setItemAsync(key, token);
        } catch {
            // ignore write errors
        }
    },
    clearToken: async (key: string) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch {
            // ignore delete errors
        }
    },
};

export default tokenCache;
