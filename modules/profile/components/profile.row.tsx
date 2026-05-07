import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ProfileRowProps = {
  label: string;
  value?: string;
  onPress?: () => void;
};

export default function ProfileRow({ label, value, onPress }: ProfileRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 15,
    color: "#111",
  },
  value: {
    fontSize: 14,
    color: "#666",
  },
});
