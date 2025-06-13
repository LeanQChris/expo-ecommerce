import { Product } from '@/modules/home/data/product'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ProductInfo({ data }: {
    data: Product
}) {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>${data.price?.toFixed(2)}</Text>
            <Text style={styles.category}>{data.category.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    infoCard: {
        width: "100%",
        padding: 0,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 8,
        color: "#222",
        letterSpacing: 0.2,
    },
    price: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    category: {
        fontSize: 15,
        color: "#888",
        marginBottom: 10,
        fontWeight: "500",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#444",
        marginBottom: 18,
        lineHeight: 22,
    },
  
});
