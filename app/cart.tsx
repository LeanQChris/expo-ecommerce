import Navbar from "@/components/ui/navbar";
import Cart from "@/modules/cart";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CartPage() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Navbar
        title="Cart"
        leftIcon="chevron-back"
        onLeftPress={() => router.back()}
      />
      <View
        style={{
          padding: 16,
          flex: 1,
        }}
      >
        <Cart />
      </View>
    </View>
  );
}
