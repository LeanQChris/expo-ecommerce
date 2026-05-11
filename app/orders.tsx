import Navbar from "@/components/ui/navbar";
import { Order, orders } from "@/modules/orders/data";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OrdersScreen() {
  const router = useRouter();

  const renderOrder = ({ item }: { item: Order }) => {
    const statusStyle =
      item.status === "Delivered"
        ? styles.status_delivered
        : item.status === "Shipped"
          ? styles.status_shipped
          : styles.status_completed;

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => router.push(`/orders/${item.id}`)}
        activeOpacity={0.88}
      >
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderLabel}>Order</Text>
            <Text style={styles.orderId}>{item.id}</Text>
          </View>
          <View style={[styles.statusBadge, statusStyle]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.orderDetailsRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Placed</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Total</Text>
            <Text style={styles.detailValue}>{item.total}</Text>
          </View>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.summaryLabel}>{item.items} items</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Navbar title="Orders" />
      <View style={styles.content}>
        <Text style={styles.heading}>Your Order History</Text>
        <Text style={styles.subtitle}>
          Tap any order to view full details, tracking, and payment info.
        </Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 18,
  },
  listContent: {
    paddingBottom: 24,
  },
  orderCard: {
    borderRadius: 18,
    backgroundColor: "#fff",
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 1,
  },
  orderHeader: {
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
    fontSize: 16,
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
    backgroundColor: "#6b7280",
  },
  orderDate: {
    fontSize: 13,
    color: "#888",
    marginBottom: 14,
  },
  orderDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  detailBlock: {
    width: "48%",
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#444",
    fontWeight: "700",
  },
  separator: {
    height: 16,
  },
});
