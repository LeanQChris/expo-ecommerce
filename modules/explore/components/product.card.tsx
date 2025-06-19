import { cartStore } from "@/modules/cart/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Product } from "../data/product";

export default function ProductCard({ product }: { product: Product }) {
  const { addProductToCart } = cartStore();
  const router = useRouter();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => router.push(`/product/${product.id}`)}
        key={product.id}
        activeOpacity={0.85}
      >
        <Image
          source={{
            uri:
              product.images[0] ||
              "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081",
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
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
              Toast.show({
                type: "success",
                text1: "Added to Cart",
                text2: `${product.title} has been added to your cart.`,
                position: "bottom",
                visibilityTime: 2000,
                autoHide: true,
                keyboardOffset: 100,
              });
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
    </View>
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
    padding: 12,
  },
  productImage: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
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
