import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Product } from "../data/product";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./product.card";

const CARD_MARGIN = 12;
const numColumns = 2;
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
type SkeletonItem = { id: string; skeleton: true };
type ProductListItem = Product | SkeletonItem;
const skeletonData: SkeletonItem[] = Array.from({ length: 6 }, (_, index) => ({
  id: `skeleton-${index}`,
  skeleton: true,
}));

function ProductCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonRow} />
      <View style={[styles.skeletonRow, styles.skeletonRowShort]} />
      <View style={[styles.skeletonRow, styles.skeletonFooter]} />
    </View>
  );
}

export default function ProductsLists() {
  const { products: data, isLoading, refetch, isRefetching } = useGetProducts();
  const displayData: ProductListItem[] =
    isLoading && !data?.length ? skeletonData : (data ?? []);

  return (
    <FlatList
      data={displayData}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) =>
        "skeleton" in item ? (
          <ProductCardSkeleton />
        ) : (
          <ProductCard product={item} />
        )
      }
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
        ) : null
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
  card: {
    borderRadius: 18,
    margin: CARD_MARGIN / 2,
    width: CARD_WIDTH,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  skeletonImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#e9e9e9",
    marginBottom: 12,
  },
  skeletonRow: {
    width: "100%",
    height: 12,
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonRowShort: {
    width: "60%",
  },
  skeletonFooter: {
    width: "40%",
    marginTop: 6,
  },
});
