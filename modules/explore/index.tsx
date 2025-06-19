import Navbar from "@/components/ui/navbar";
import { DefaultTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import ProductCategories from "./components/product.categories";
import ProductsLists from "./components/product.list";

export default function ExporeScreen() {
  return (
    <View style={styles.container}>
      <Navbar title="Explore" showBack={false} />
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
});
