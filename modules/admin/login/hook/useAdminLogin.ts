import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const ADMIN_ROLE = "admin";

const isAdminUser = (user: any) =>
    user?.publicMetadata?.role?.toString?.().toLowerCase?.() === ADMIN_ROLE;

export function useAdminLogin() {
    const router = useRouter();
    const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
    const { user, isLoaded: isUserLoaded } = useUser();
    const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();
    const [loading, setLoading] = useState(true);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        if (!isAuthLoaded || !isUserLoaded) {
            return;
        }

        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        if (isAdminUser(user)) {
            router.replace("/admin/dashboard");
            return;
        }

        router.replace("/");
    }, [isSignedIn, isAuthLoaded, isUserLoaded, user, router]);

    const signInAdmin = async (email: string, password: string) => {
        setAuthError("");

        if (!isSignInLoaded || !signIn) {
            setAuthError("Unable to initialize admin login.");
            return;
        }

        setIsSigningIn(true);

        try {
            const identifier = email.trim().toLowerCase();
            const result = await signIn.create({
                identifier,
                password,
            });

            if (result.status === "complete" && result.createdSessionId && setActive) {
                await setActive({ session: result.createdSessionId });
                return;
            }

            if (result.status === "complete") {
                return;
            }

            setAuthError("Unable to sign in. Please check your credentials.");
        } catch (err) {
            setAuthError("Invalid email or password.");
        } finally {
            setIsSigningIn(false);
        }
    };

    return { loading, isSigningIn, authError, signInAdmin };
}
