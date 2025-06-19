import { buttonStyles } from "@/core/styles/button.styles";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cartStore } from "../store";

export default function CartInfo() {
  const router = useRouter();
  const { cartItems } = cartStore();
  return (
    <TouchableOpacity
      onPress={() => router.push("/checkout")}
      disabled={cartItems.length === 0}
      style={{
        ...buttonStyles.container,
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: cartItems.length > 0 ? "#000" : "#ccc",
      }}
    >
      <Text
        style={{
          ...buttonStyles.text,
          color: cartItems.length > 0 ? "#fff" : "#ffff",
        }}
      >
        Checkout
      </Text>
    </TouchableOpacity>
  );
}
