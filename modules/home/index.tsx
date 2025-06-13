import Navbar from "@/components/ui/navbar";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import ProductCategories from "./components/product.categories";
import ProductsLists from "./components/product.list";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Navbar
        title="Home"
        rightIcon="cart-outline"
        onLeftPress={() => console.log("Menu pressed")}
        onRightPress={() => router.push("/cart")}
      />
      <ProductCategories />
      <ProductsLists />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 32,
    marginBottom: 16,
    alignSelf: "center",
    color: "#222",
    letterSpacing: 0.5,
  },
});
