import { Product } from '@/modules/home/data/product';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

export default function ProductImages({ data }: {
    data: Product
}) {
    const [selectedImage, setSelectedImage] = useState(0);
    return (
        <View style={styles.imageContainer}>
            {data.images && data.images.length > 0 && (
                <>
                    <Image
                        source={{ uri: data.images[selectedImage] }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />
                    {data.images && data.images.length > 1 &&
                        <FlatList
                            data={data.images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, idx) => idx.toString()}
                            style={styles.thumbnailList}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => setSelectedImage(index)}>
                                    <Image
                                        source={{ uri: item }}
                                        style={[
                                            styles.thumbnail,
                                            selectedImage === index && styles.selectedThumbnail,
                                        ]}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    }
                </>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        alignItems: "center",
    },
    mainImage: {
        width: "100%",
        height: 500,
        borderRadius: 0,
        marginBottom: 12,
        position: "relative",
    },
    thumbnailList: {
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 8,
        position: "absolute",
        left: 20,
        width: "auto",
        paddingVertical: 8,
        bottom: 30,
        borderRadius: 12,
    },
    thumbnail: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginHorizontal: 4,
        opacity: 1,
    },
    selectedThumbnail: {
        opacity: 1,
    },
});
