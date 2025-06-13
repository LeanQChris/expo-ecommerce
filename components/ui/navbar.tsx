import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NavbarProps = {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export default function Navbar({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: NavbarProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress || router.canGoBack() ? () => router.back() : undefined}>
        <Ionicons name={leftIcon as any || router.canGoBack() && "chevron-back"} size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightPress || (() => router.push("/cart"))}>
        <Ionicons name={rightIcon as any || "cart-outline"} size={24} color="#222" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#222",
    textAlign: "center",
  },
});
