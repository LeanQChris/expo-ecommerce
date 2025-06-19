import { DarkTheme } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Category } from "../data/product";
import useGetCategories from "../hooks/useGetCategories";
import { homeStore } from "../store";

export default function ProductCategories() {
  const { categories, isLoading } = useGetCategories();
  const { setSelectedCategoryId, selectedCategoryId } = homeStore();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.categoryItem,
            { marginLeft: 16, paddingHorizontal: 12 },
            selectedCategoryId == null && styles.selectedCategoryItem, // changed === to ==
          ]}
          onPress={() => setSelectedCategoryId(undefined)}
        >
          <Text style={styles.categoryText} numberOfLines={1}>
            All
          </Text>
        </TouchableOpacity>

        {categories?.map((category: Category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategoryId === category.id && styles.selectedCategoryItem,
            ]}
            onPress={() => setSelectedCategoryId(category.id)}
          >
            {category.image && (
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            )}
            <Text style={styles.categoryText} numberOfLines={1}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  loadingText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f9",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedCategoryItem: {
    borderColor: DarkTheme.colors.background,
  },
  categoryImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 6,
    backgroundColor: "#eaeaea",
  },
  categoryText: {
    fontSize: 13,
    paddingHorizontal: 8,
    color: "#222",
    fontWeight: "500",
    maxWidth: 80,
  },
});
