import { cartStore } from "@/modules/cart/store";
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
  const { getCartItemCount } = cartStore()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress || router.canGoBack() ? () => router.back() : undefined}>
        <Ionicons name={leftIcon as any || router.canGoBack() && "chevron-back"} size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightPress || (() => router.push("/cart"))} style={{ position: "relative" }}>
        <Ionicons name={rightIcon as any || "cart-outline"} size={24} color="#222" />
        {!rightIcon &&getCartItemCount() > 0 && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -8,
              backgroundColor: "red",
              borderRadius: 8,
              minWidth: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {getCartItemCount()}
            </Text>
          </View>
        )}
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
    width: "100%",
  },
  title: {
    paddingHorizontal: 50,
    fontSize: 20,
    fontWeight: "semibold",
    color: "#222",
    textAlign: "center",
    flex: 1,
    height: 30,
  },
});
