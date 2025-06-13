import { Product } from "@/modules/home/data/product";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cartStore } from "../store";

export default function CartList() {
  const { cartItems, updateProductQuantity, removeProductFromCart } =
    cartStore();

  return (
    <View style={styles.container}>
      {cartItems.map((item: { product: Product; quantity: number }) => (
        <View key={item.product.id} style={styles.itemContainer}>
          <Image
            source={{ uri: item.product.images[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.itemName}>{item.product.title}</Text>
            <Text style={styles.itemPrice}>
              ${item.product.price.toFixed(2)}
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  updateProductQuantity(
                    item.product.id,
                    Math.max(1, item.quantity - 1)
                  )
                }
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  updateProductQuantity(item.product.id, item.quantity + 1)
                }
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeProductFromCart(item.product.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    borderRadius: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#f2f2f2",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  itemDesc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    elevation: 1,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    minWidth: 24,
    textAlign: "center",
    color: "#222",
  },
  removeButton: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ff5252",
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
