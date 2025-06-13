import CartButtons from "@/components/ui/cart.buttons";
import Navbar from "@/components/ui/navbar";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import ProductImages from "./components/product.images";
import ProductInfo from "./components/product.info";
import useGetProduct from "./hooks/useGetProduct";

export default function ProductDetail() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useGetProduct()

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#e53935", marginBottom: 8 }}>
          Oops! Something went wrong.
        </Text>
        <Text style={{ color: "#888", fontSize: 15, textAlign: "center", maxWidth: 260 }}>
          We couldn't load the product details. Please check your connection or try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Navbar title={data.title} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <ProductImages data={data} />
        <View style={styles.container}>
          <ProductInfo data={data} />
          <CartButtons product={data} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
