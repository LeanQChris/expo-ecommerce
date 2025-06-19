import { cartStore } from "@/modules/cart/store";
import { Product } from "@/modules/explore/data/product";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function CartButtons({ product }: { product: Product }) {
  const [quantity, setQuantity] = React.useState(1);
  const { addProductToCart } = cartStore();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => {
            if (quantity > 1) {
              setQuantity((qty) => qty - 1);
            }
          }}
        >
          <Text style={styles.qtyButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => {
            setQuantity((qty) => qty + 1);
          }}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          addProductToCart(product, quantity);
          Toast.show({
            type: "success",
            text1: "Added to Cart",
            text2: `${product.title} has been added to your cart.`,
            position: "bottom",
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 50,
          });
        }}
      >
        <MaterialIcons name="shopping-cart-checkout" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
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
    fontSize: 20,
    fontWeight: "500",
    minWidth: 20,
    textAlign: "center",
    color: "#222",
  },
});
