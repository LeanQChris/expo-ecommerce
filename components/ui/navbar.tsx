import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NavbarProps = {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export default function Navbar({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: NavbarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress}>
        <Ionicons name={leftIcon as any} size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightPress}>
        <Ionicons name={rightIcon as any} size={24} color="#222" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 4,
    backgroundColor: "#F6F7FB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#222",
    textAlign: "center",
  },
});
