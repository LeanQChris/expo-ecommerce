import Navbar from "@/components/ui/navbar";
import Cart from "@/modules/cart";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CartPage() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Navbar
        title="Cart"
        leftIcon="chevron-back"
        onLeftPress={() => router.back()}
      />
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <Cart />
      </View>
    </View>
  );
}
