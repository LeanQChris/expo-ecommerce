import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PaymentMethodProps = {
  selectedMethod: "card" | "apple";
  onSelect: (method: "card" | "apple") => void;
};

export default function PaymentMethod({
  selectedMethod,
  onSelect,
}: PaymentMethodProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment method</Text>
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === "card" && styles.selectedOption,
        ]}
        onPress={() => onSelect("card")}
      >
        <Text style={styles.optionLabel}>Card</Text>
        <Text style={styles.optionMeta}>Visa ending in 4242</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === "apple" && styles.selectedOption,
        ]}
        onPress={() => onSelect("apple")}
      >
        <Text style={styles.optionLabel}>Apple Pay</Text>
        <Text style={styles.optionMeta}>Secure checkout with Apple Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  selectedOption: {
    borderBottomColor: "#111",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  optionMeta: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
});
