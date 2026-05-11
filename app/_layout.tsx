import { useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";

import ProvidersWrapper from "@/core/providers/wrapper";

function AppRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();

  useEffect(() => {
    if (!isAuthLoaded) {
      return;
    }

    if (pathname === "/sso-callback") {
      return;
    }

    if (!isSignedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthLoaded, isSignedIn, pathname, router]);

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
