import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://uhanelmftjweihtggtoq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYW5lbG1mdGp3ZWlodGdndG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDI4NTksImV4cCI6MjA2NTQ3ODg1OX0.P4l1IS0k3TO5QgYYWEGfoVBujohnZDQbseG7eYQVA4c"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
