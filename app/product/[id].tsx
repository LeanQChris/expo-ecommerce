import Navbar from "@/components/ui/navbar";
import { endpoints } from "@/core/constants/endpoints";
import httpClient from "@/core/network/client";
import { Product } from "@/modules/home/data/product";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => httpClient.get(endpoints.productsById(+id)),
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

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
        <Text style={{ color: "#e53935" }}>
          Failed to load product details.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar title={data.title} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          {data.images && data.images.length > 0 && (
            <>
              <Image
                source={{ uri: data.images[selectedImage] }}
                style={styles.mainImage}
                resizeMode="cover"
              />
              <FlatList
                data={data.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, idx) => idx.toString()}
                style={styles.thumbnailList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => setSelectedImage(index)}>
                    <Image
                      source={{ uri: item }}
                      style={[
                        styles.thumbnail,
                        selectedImage === index && styles.selectedThumbnail,
                      ]}
                    />
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.price}>${data.price?.toFixed(2)}</Text>
          <Text style={styles.category}>{data.category.name}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    minHeight: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    paddingVertical: 24,
    alignItems: "center",
  },
  mainImage: {
    width: "96%",
    height: 260,
    borderRadius: 0,
    marginBottom: 12,
  },
  thumbnailList: {
    marginTop: 4,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginHorizontal: 4,
    opacity: 0.7,
  },
  selectedThumbnail: {
    opacity: 1,
  },
  infoCard: {
    width: "92%",
    padding: 0,
    alignItems: "flex-start",
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#222",
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  category: {
    fontSize: 15,
    color: "#888",
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 18,
    lineHeight: 22,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
