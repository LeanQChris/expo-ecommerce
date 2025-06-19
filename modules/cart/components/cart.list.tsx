import { Product } from "@/modules/explore/data/product";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { cartStore } from "../store";
import CartItem from "./cart.item";

export default function CartList() {
  const { cartItems } = cartStore();
  return (
    <FlatList
      data={cartItems}
      renderItem={({
        item,
      }: {
        item: { product: Product; quantity: number };
      }) => <CartItem item={item} />}
      keyExtractor={(item) => item.product.id.toString()}
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 100 }}
      contentContainerStyle={
        cartItems.length === 0
          ? { flexGrow: 1, justifyContent: "center", alignItems: "center" }
          : undefined
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={48}
            color="#bbb"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
