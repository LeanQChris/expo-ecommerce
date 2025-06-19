import Navbar from "@/components/ui/navbar";
import Home from "@/modules/home";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: DefaultTheme.colors.background }}>
      <Navbar title="Expo Store" showBack={false} />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#888"
          />
        </View>
        <Home />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 40,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 0,
  },
});
