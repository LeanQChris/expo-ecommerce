import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    Constants.expoConfig?.extra?.SUPABASE_URL ||
    Constants.manifest?.extra?.SUPABASE_URL ||
    "";

const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    Constants.expoConfig?.extra?.SUPABASE_ANON_KEY ||
    Constants.manifest?.extra?.SUPABASE_ANON_KEY ||
    "";

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "Supabase configuration is missing. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {

    },
    auth: {
        persistSession: true,
        detectSessionInUrl: true,

    },
});
