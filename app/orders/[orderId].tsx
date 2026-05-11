import Navbar from "@/components/ui/navbar";
import { orders } from "@/modules/orders/data";
import { DefaultTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <Navbar title="Order details" />
        <View style={styles.content}>
          <Text style={styles.heading}>Order not found</Text>
          <Text style={styles.subtitle}>
            We could not find the requested order. Please go back and try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar title="Order details" />
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.orderLabel}>Order</Text>
            <Text style={styles.orderId}>{order.id}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              styles[`status_${order.status.toLowerCase()}`],
            ]}
          >
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        <Text style={styles.orderDate}>{order.date}</Text>

        <View style={styles.card}>
          <Text style={styles.cardHeading}>Shipping address</Text>
          <Text style={styles.cardText}>{order.shippingAddress}</Text>
          <Text style={styles.cardHeading}>Payment method</Text>
          <Text style={styles.cardText}>{order.paymentMethod}</Text>
          <Text style={styles.cardHeading}>Tracking number</Text>
          <Text style={styles.cardText}>{order.trackingNumber}</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Items</Text>
        <FlatList
          data={order.lineItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lineItem}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>Qty {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{order.subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>{order.shipping}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotalRow]}>
            <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              {order.total}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 12,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  status_delivered: {
    backgroundColor: "#24a148",
  },
  status_shipped: {
    backgroundColor: "#2979ff",
  },
  status_completed: {
    backgroundColor: "#555",
  },
  orderDate: {
    fontSize: 13,
    color: "#888",
    marginBottom: 18,
  },
  card: {
    borderRadius: 18,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  lineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  itemMeta: {
    fontSize: 13,
    color: "#777",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  separator: {
    height: 12,
  },
  summaryCard: {
    borderRadius: 18,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#777",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  summaryTotalRow: {
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#111",
  },
  totalValue: {
    fontSize: 16,
  },
});
