"use client";

import { ClerkProvider } from "@clerk/clerk-expo";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";

import tokenCache from "@/core/auth/token-cache";
import TanstackQueryProvider from "./tanstack-query.provider";

const clerkPublishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY ||
  Constants.manifest?.extra?.CLERK_PUBLISHABLE_KEY ||
  "";

export default function ProvidersWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TanstackQueryProvider>
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <ThemeProvider value={DefaultTheme}>
          {children}
          <StatusBar style="dark" />
          <Toast />
        </ThemeProvider>
      </ClerkProvider>
    </TanstackQueryProvider>
  );
}
