import { useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

import ProvidersWrapper from "@/core/providers/wrapper";

function AppRouter() {
  const router = useRouter();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();

  useEffect(() => {
    if (!isAuthLoaded) {
      return;
    }

    const targetRoute = isSignedIn ? "/" : "/login";
    router.replace(targetRoute);
  }, [isAuthLoaded, isSignedIn, router]);

  if (!isAuthLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ProvidersWrapper>
      <AppRouter />
    </ProvidersWrapper>
  );
}
