import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import useGetRelatedProducts from '../hooks/useGetRelatedProducts'

export default function RelatedProducts() {
    const { data, isLoading, error } = useGetRelatedProducts()
    const router = useRouter()

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
            {data?.length !== 0 && <Text
                style={{
                    fontSize: 20,
                    fontWeight: '600',
                    marginBottom: 12,
                }}
            >Related Products</Text>}
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/product/${item.id}`)}
                        style={{
                            flexDirection: 'column',
                            padding: 12,
                            marginVertical: 8,
                        }}
                    >
                        <View style={{ marginRight: 12 }}>
                            {item.images && item.images.length > 0 ? (
                                <Image
                                    source={{ uri: item.images[0] }}
                                    style={{ width: 120, height: 120, borderRadius: 6 }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: '#eee',
                                        borderRadius: 6,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>No Image</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                maxWidth: 120,
                                paddingTop: 6,
                            }}
                                numberOfLines={1}>{item.title}</Text>
                            <Text style={{ marginTop: 6, fontWeight: '600' }}>
                                ${item.price}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}