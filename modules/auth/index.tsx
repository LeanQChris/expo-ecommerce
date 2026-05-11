import { useAuth } from "@clerk/clerk-expo";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthSignIn from "./components/auth.signin";

export default function AuthScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthSignIn />
      </View>
      <TouchableOpacity
        onLongPress={() => router.push("/admin/login")}
        activeOpacity={0.7}
        style={styles.footer}
      >
        <Text style={styles.footerText}>Long press here for admin login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    width: "100%",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  footerText: {
    fontSize: 13,
    color: "#555",
  },
});
