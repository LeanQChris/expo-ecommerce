import { Product } from "@/modules/home/data/product";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { cartStore } from "../store";
import CartItem from "./cart.item";

export default function CartList() {
  const { cartItems } = cartStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({
          item,
        }: {
          item: { product: Product; quantity: number };
        }) => <CartItem item={item} />}
        keyExtractor={(item) => item.product.id.toString()}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
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
