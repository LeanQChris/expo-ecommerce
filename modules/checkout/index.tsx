import Navbar from "@/components/ui/navbar";
import { cartStore } from "@/modules/cart/store";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CheckoutSummary from "./components/checkout.summary";
import PaymentMethod from "./components/payment.method";

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, clearCart } = cartStore();

  const itemsCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () =>
      cartItems
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2),
    [cartItems],
  );

  const shippingCost = itemsCount > 0 ? 5.99 : 0;
  const total = useMemo(
    () => (parseFloat(subtotal) + shippingCost).toFixed(2),
    [subtotal, shippingCost],
  );

  const [fullName, setFullName] = useState("Alex Harper");
  const [address, setAddress] = useState("246 Orchard St.");
  const [city, setCity] = useState("San Francisco");
  const [postalCode, setPostalCode] = useState("94103");
  const [country, setCountry] = useState("USA");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple">("card");

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/explore");
  };

  return (
    <View style={styles.page}>
      <Navbar
        title="Checkout"
        leftIcon="chevron-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CheckoutSummary cartItems={cartItems} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping address</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full name"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            placeholderTextColor="#999"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.rowItem]}
              value={city}
              onChangeText={setCity}
              placeholder="City"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.rowItem]}
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="ZIP code"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
          </View>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Country"
            placeholderTextColor="#999"
          />
        </View>

        <PaymentMethod
          selectedMethod={paymentMethod}
          onSelect={setPaymentMethod}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>${total}</Text>
        </View>
        <TouchableOpacity
          disabled={itemsCount === 0}
          onPress={handlePlaceOrder}
          style={[
            styles.checkoutButton,
            itemsCount === 0 && styles.disabledButton,
          ]}
        >
          <Text style={styles.checkoutText}>Place order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 170,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  input: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#f5f6f8",
    paddingHorizontal: 16,
    marginBottom: 12,
    color: "#111",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItem: {
    flex: 1,
    marginRight: 10,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: DefaultTheme.colors.background,
    borderTopWidth: 1,
    borderColor: "#ececec",
  },
  footerSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  checkoutButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
