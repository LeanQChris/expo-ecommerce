import { cartStore } from "@/modules/cart/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../data/product";

export default function ProductCard({ product }: { product: Product }) {
  const { addProductToCart } = cartStore();
  return (
    <TouchableOpacity key={product.id} style={styles.card} activeOpacity={0.85}>
      <Image
        source={{
          uri: product.images?.[0] || "https://via.placeholder.com/120",
        }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.productCategory} numberOfLines={1}>
          {product.category?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.productPrice}>${product.price}</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              addProductToCart(product, 1);
              ToastAndroid.show(
                `${product.title} added to cart`,
                ToastAndroid.SHORT
              );
            }}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color="#222"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const { width } = Dimensions.get("window");
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * (2 + 1)) / 2;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    margin: CARD_MARGIN / 2,
    width: CARD_WIDTH,
    alignItems: "center",
    padding: 14,
  },
  productImage: {
    width: CARD_WIDTH - 28,
    height: CARD_WIDTH - 28,
    borderRadius: 12,
    backgroundColor: "#e9e9e9",
    marginBottom: 12,
  },
  productInfo: {
    width: "100%",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  productCategory: {
    color: "#7B8D93",
    fontSize: 13,
    marginBottom: 6,
  },
  productPrice: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 16,
  },
});
