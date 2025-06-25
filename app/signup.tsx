import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buttonStyles } from "../core/styles/button.styles";
import { supabase } from "../core/supabase/client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Account created! Please check your email to confirm.");
      setTimeout(() => router.replace("/signin"), 2000);
    }
  };

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
        {success && (
          <Text
            style={{
              color: "#388e3c",
              marginBottom: 14,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {success}
          </Text>
        )}
        <TouchableOpacity
          style={[
            buttonStyles.container,
            { marginBottom: 14, opacity: loading ? 0.7 : 1 },
          ]}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={buttonStyles.text}>
            {loading ? "Signing up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator style={{ marginTop: 14 }} />}
        <TouchableOpacity
          onPress={() => router.replace("/signin")}
          style={{ marginTop: 8 }}
        >
          <Text style={{ color: "#2563eb", textAlign: "center", fontSize: 15 }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
