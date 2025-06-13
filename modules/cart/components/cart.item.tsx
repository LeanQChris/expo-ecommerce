import { Product } from "@/modules/home/data/product";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cartStore } from "../store";

export default function CartItem({
  item,
}: {
  item: { product: Product; quantity: number };
}) {
  const { updateProductQuantity, removeProductFromCart } = cartStore();

  return (
    <View key={item.product.id} style={styles.itemContainer}>
    <Image
        source={{ uri: item.product.images[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.product.title}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>
          {item.product.description}
        </Text>
        <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",

          }}
        >
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
          </View>
          <TouchableOpacity
            onPress={() => removeProductFromCart(item.product.id)}
          >
            <MaterialIcons name="delete-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
    borderRadius: 12,
    paddingBottom: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#222",
  },
  itemDesc: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    elevation: 1,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "500",
    minWidth: 20,
    textAlign: "center",
    color: "#222",
  },
});
