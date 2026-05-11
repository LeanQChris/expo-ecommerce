import { useAuth, useUser } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import ProvidersWrapper from "@/core/providers/wrapper";

const ADMIN_ROLE = "admin";

const isAdminUser = (user: any) =>
  user?.publicMetadata?.role?.toString?.().toLowerCase?.() === ADMIN_ROLE;

function AppRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthLoaded || !isUserLoaded) {
      return;
    }

    setReady(true);
  }, [isAuthLoaded, isUserLoaded]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (pathname === "/sso-callback") {
      return;
    }

    const adminRoute = pathname.startsWith("/admin");
    const adminUser = isAdminUser(user);

    if (adminRoute) {
      if (!isSignedIn) {
        router.replace("/admin/login");
        return;
      }

      if (!adminUser) {
        router.replace("/");
        return;
      }

      if (pathname === "/admin/login") {
        router.replace("/admin/dashboard");
      }

      return;
    }

    if (!isSignedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [ready, pathname, isSignedIn, user, router]);

  if (!isAuthLoaded || !isUserLoaded) {
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
