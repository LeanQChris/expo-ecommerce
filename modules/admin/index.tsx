import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const ADMIN_ROLE = "admin";

const isAdminUser = (user: any) =>
  user?.publicMetadata?.role?.toString?.().toLowerCase?.() === ADMIN_ROLE;

export default function AdminModuleRedirect() {
  const router = useRouter();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    if (!isAuthLoaded || !isUserLoaded) {
      return;
    }

    if (isSignedIn && isAdminUser(user)) {
      router.replace("/admin/dashboard");
      return;
    }

    router.replace("/admin/login");
  }, [isSignedIn, isAuthLoaded, isUserLoaded, user, router]);

  return null;
}
