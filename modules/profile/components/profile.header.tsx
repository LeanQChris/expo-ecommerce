import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileHeader() {
  const { isLoaded, user } = useUser();
  const fullName =
    user?.fullName ||
    [`${user?.firstName ?? ""}`, `${user?.lastName ?? ""}`].join(" ").trim() ||
    "Guest";
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "No email";
  const initials = fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials || "G"}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {isLoaded ? fullName : "Loading..."}
        </Text>
        <Text style={styles.userEmail}>{isLoaded ? email : ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  userEmail: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
});
