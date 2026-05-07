import { Product } from "@/modules/explore/data/product";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type CheckoutSummaryProps = {
  cartItems: { product: Product; quantity: number }[];
};

export default function CheckoutSummary({ cartItems }: CheckoutSummaryProps) {
  const subtotal = useMemo(
    () =>
      cartItems
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2),
    [cartItems],
  );

  const shippingCost = cartItems.length > 0 ? 5.99 : 0;
  const total = useMemo(
    () => (parseFloat(subtotal) + shippingCost).toFixed(2),
    [subtotal, shippingCost],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order summary</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>
          Your cart is empty. Add items to checkout.
        </Text>
      ) : (
        <>
          {cartItems.map((item) => (
            <View key={item.product.id} style={styles.orderRow}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderName}>{item.product.title}</Text>
                <Text style={styles.orderMeta}>
                  {item.quantity} x ${item.product.price.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.orderPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </>
      )}
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
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  orderDetails: {
    maxWidth: "70%",
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  orderMeta: {
    marginTop: 6,
    color: "#666",
    fontSize: 14,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  summaryLabel: {
    color: "#666",
    fontSize: 14,
  },
  summaryValue: {
    color: "#111",
    fontSize: 14,
    fontWeight: "600",
  },
  totalValue: {
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyText: {
    color: "#888",
    fontSize: 15,
    lineHeight: 22,
  },
});
