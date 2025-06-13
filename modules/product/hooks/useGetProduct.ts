import { endpoints } from "@/core/constants/endpoints";
import httpClient from "@/core/network/client";
import { Product } from "@/modules/home/data/product";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function useGetProduct() {
    const { id } = useLocalSearchParams();
    const { data, isLoading, error,refetch } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: async () => httpClient.get(endpoints.productsById(+id)),
    });
    return {
        data,
        isLoading,
        error,
        refetch
    }
}