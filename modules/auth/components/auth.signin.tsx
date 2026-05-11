import { useSSO } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthSignIn() {
  const { startSSOFlow } = useSSO();
  const [error, setError] = useState("");
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSocialLogin = async (
    strategy: "oauth_google" | "oauth_github",
  ) => {
    setError("");
    if (strategy === "oauth_github") {
      setGithubLoading(true);
    } else {
      setGoogleLoading(true);
    }

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      setError("Unable to sign in with social provider. Try again.");
    } finally {
      setGithubLoading(false);
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Sign in using your GitHub or Google account.
      </Text>

      <TouchableOpacity
        style={[styles.socialButton, styles.githubButton]}
        onPress={() => handleSocialLogin("oauth_github")}
        disabled={githubLoading}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="github" size={18} color="#fff" />
          <Text style={styles.githubButtonText}>
            {githubLoading ? "Signing in..." : "Continue with GitHub"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialButton, styles.googleButton]}
        onPress={() => handleSocialLogin("oauth_google")}
        disabled={googleLoading}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="google" size={18} color="#111" />
          <Text style={styles.googleButtonText}>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </Text>
        </View>
      </TouchableOpacity>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
  },
  socialButton: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  githubButton: {
    backgroundColor: "#111",
  },
  googleButton: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  githubButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  googleButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  error: {
    color: "#b00020",
    marginTop: 8,
    textAlign: "center",
  },
});
