import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buttonStyles } from "../core/styles/button.styles";
import { supabase } from "../core/supabase/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    console.log(email, password);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      router.replace("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && isMounted) {
        router.replace("/");
      }
    });
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/");
        }
      }
    );
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fb",
      }}
    >
      <View style={{ width: "100%", maxWidth: 340, padding: 0 }}>
        {/* App Name */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#222",
            textAlign: "center",
            marginBottom: 32,
            letterSpacing: 0.5,
          }}
        >
          Expo Store
        </Text>
        {/* Email Label */}
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            marginBottom: 6,
            marginLeft: 2,
            fontWeight: "500",
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            marginBottom: 18,
            padding: 12,
            borderRadius: 6,
            fontSize: 16,
            backgroundColor: "#fff",
          }}
        />
        {/* Password Label */}
        <Text
          style={{
            fontSize: 15,
            color: "#444",
            marginBottom: 6,
            marginLeft: 2,
            fontWeight: "500",
          }}
        >
          Password
        </Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            marginBottom: 18,
            padding: 12,
            borderRadius: 6,
            fontSize: 16,
            backgroundColor: "#fff",
          }}
        />
        {error && (
          <Text
            style={{
              color: "#d32f2f",
              marginBottom: 14,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={[
            buttonStyles.container,
            { marginBottom: 14, opacity: loading ? 0.7 : 1 },
          ]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={buttonStyles.text}>
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              height: 48,
              width: "100%",
              marginBottom: 0,
              marginTop: 2,
              opacity: loading ? 0.7 : 1,
            },
          ]}
          onPress={handleGoogleSignIn}
          disabled={loading}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="google"
            size={22}
            color="#4285F4"
            style={{ marginRight: 12 }}
          />
          <Text
            style={{
              color: "#1F1F1F",
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "Roboto",
              letterSpacing: 0.2,
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator style={{ marginTop: 14 }} />}
        <TouchableOpacity
          onPress={() => router.replace("/signup")}
          style={{ marginTop: 8 }}
        >
          <Text style={{ color: "#2563eb", textAlign: "center", fontSize: 15 }}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
