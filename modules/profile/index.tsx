import Navbar from "@/components/ui/navbar";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileHeader from "./components/profile.header";
import ProfileRow from "./components/profile.row";

export default function ProfileScreen() {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const fullName =
    user?.fullName ||
    [`${user?.firstName ?? ""}`, `${user?.lastName ?? ""}`].join(" ").trim() ||
    "Guest";
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "No email";

  const handleLogout = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch {
      // logout failed, but still clear route
    } finally {
      setIsSigningOut(false);
      router.replace("/login");
    }
  }, [router, signOut]);

  return (
    <View style={styles.container}>
      <Navbar title="Profile" showBack={false} />
      <View style={styles.content}>
        <ProfileHeader />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileRow label="Name" value={isLoaded ? fullName : "Loading..."} />
          <ProfileRow label="Email" value={isLoaded ? email : "Loading..."} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <ProfileRow label="Help center" />
          <ProfileRow
            label="Log out"
            value={isSigningOut ? "Signing out..." : undefined}
            onPress={handleLogout}
          />
        </View>
      </View>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
});
