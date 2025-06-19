import Navbar from "@/components/ui/navbar";
import { DefaultTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Navbar title="Profile" showBack={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
});
