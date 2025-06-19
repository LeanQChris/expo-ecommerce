import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./product.card";

const CARD_MARGIN = 12;
const numColumns = 2;

export default function ProductsLists() {
  const { products: data, isLoading, refetch, isRefetching } = useGetProducts();

  return (
    <FlatList
      data={data}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: product }) => <ProductCard product={product} />}
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 48, opacity: 0.8, marginBottom: 12 }}>
              📦
            </Text>
            <Text
              style={[styles.emptyText, { fontWeight: "400", opacity: 0.7 }]}
            >
              No products found
            </Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#888" />
          </View>
        )
      }
    />
  );
}
const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: CARD_MARGIN,
    paddingVertical: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
