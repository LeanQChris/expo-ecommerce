import { buttonStyles } from "@/core/styles/button.styles";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cartStore } from "../store";

export default function CartInfo() {
  const router = useRouter();
  const { cartItems } = cartStore();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: DefaultTheme.colors.background,
        right: 16,
      }}
    >
      {cartItems.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Total Items: {cartItems.length}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Total Price: $
            {cartItems
              .reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )
              .toFixed(2)}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => router.push("/checkout")}
        disabled={cartItems.length === 0}
        style={{
          ...buttonStyles.container,

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
    </View>
  );
}
