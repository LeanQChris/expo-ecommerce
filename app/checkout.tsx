import Navbar from "@/components/ui/navbar";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CheckoutPage() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Navbar
        title="Checkout"
        leftIcon="chevron-back"
        rightIcon={undefined}
        onLeftPress={() => router.back()}
      />
      <View
        style={{
          padding: 16,
          flex: 1,
        }}
      ></View>
    </View>
  );
}
