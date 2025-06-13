import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import useGetRelatedProducts from '../hooks/useGetRelatedProducts'

export default function RelatedProducts() {
    const { data, isLoading, error } = useGetRelatedProducts()

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Error loading related products.</Text>
    }

    return (
        <View
            style={{
                padding: 16,
            }}
        >
            {data?.length === 0 && <Text>Related Products</Text>}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 8 }}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    )
}