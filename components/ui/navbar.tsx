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
  showBack?: boolean;
};

export default function Navbar({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBack = true,
}: NavbarProps) {
  const router = useRouter();
  const { getCartItemCount } = cartStore();
  return (
    <View style={styles.container}>
      {/* Left Icon Button */}
      <View style={styles.iconContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={
              onLeftPress || router.canGoBack()
                ? () => router.back()
                : undefined
            }
          >
            <Ionicons
              name={(leftIcon as any) || (router.canGoBack() && "chevron-back")}
              size={24}
              color="#222"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon Button */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={onRightPress || (() => router.push("/cart"))}
          style={{ position: "relative" }}
        >
          <Ionicons
            name={(rightIcon as any) || "cart-outline"}
            size={24}
            color="#222"
          />
          {!rightIcon && getCartItemCount() > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -8,
                borderRadius: 100,
                minWidth: 16,
                height: 16,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 4,
                backgroundColor: "red", // Add background color for badge visibility
              }}
            >
              <Text
                style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
              >
                {getCartItemCount()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
  iconContainer: {
    width: 40, // Fixed width for icon buttons
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    flex: 1,
    height: 30,
  },
});
