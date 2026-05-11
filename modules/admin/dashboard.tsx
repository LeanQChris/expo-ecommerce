import Navbar from "@/components/ui/navbar";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const ADMIN_ROLE = "admin";

const isAdminUser = (user: any) =>
  user?.publicMetadata?.role?.toString?.toLowerCase?.() === ADMIN_ROLE;

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    if (!isAuthLoaded || !isUserLoaded) {
      return;
    }

    if (!isSignedIn) {
      router.replace("/admin/login");
      return;
    }

    if (!isAdminUser(user)) {
      router.replace("/");
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, router]);

  if (!isAuthLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Navbar title="Admin Dashboard" showBack={false} showRightIcon={false} />

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome, Admin</Text>
        <Text style={styles.subtitle}>
          Manage users, orders, and products from one place.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Orders</Text>
            <Text style={styles.statValue}>124</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Revenue</Text>
            <Text style={styles.statValue}>$14.8k</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Users</Text>
            <Text style={styles.statValue}>92</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>New Signups</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={[styles.sectionCard, styles.sectionCardSpacing]}>
            <Text style={styles.sectionTitle}>Admin Settings</Text>
            <Text style={styles.sectionText}>
              Update access and security options.
            </Text>
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Order Management</Text>
            <Text style={styles.sectionText}>
              View current and past orders.
            </Text>
          </View>
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
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },
  sections: {
    marginTop: 20,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
  sectionCardSpacing: {
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
