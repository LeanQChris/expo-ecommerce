"use client";

import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SsoCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const [error, setError] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToRoot, setRedirectToRoot] = useState(false);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (!isSignInLoaded || hasProcessedRef.current) {
      return;
    }

    const rotatingTokenNonce = params.rotating_token_nonce?.toString();
    if (!rotatingTokenNonce) {
      hasProcessedRef.current = true;
      setRedirectToLogin(true);
      return;
    }

    const completeSignIn = async () => {
      hasProcessedRef.current = true;

      if (!signIn) {
        setRedirectToLogin(true);
        return;
      }

      try {
        await signIn.reload({ rotatingTokenNonce });

        if (signIn.createdSessionId && setActive) {
          await setActive({ session: signIn.createdSessionId });
        }

        if (signIn.createdSessionId) {
          setRedirectToRoot(true);
        } else {
          setRedirectToLogin(true);
        }
      } catch (err) {
        setError("Unable to complete login. Please try again.");
        setRedirectToLogin(true);
      }
    };

    completeSignIn();
  }, [isSignInLoaded, params, signIn, setActive]);

  useEffect(() => {
    if (!hasProcessedRef.current || !isAuthLoaded) {
      return;
    }

    if (redirectToLogin) {
      router.replace("/login");
      return;
    }

    if (redirectToRoot && isSignedIn) {
      router.replace("/");
    }
  }, [isAuthLoaded, isSignedIn, redirectToLogin, redirectToRoot, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  error: {
    marginTop: 16,
    color: "#b00020",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
