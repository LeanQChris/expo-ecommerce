import { endpoints } from "@/core/constants/endpoints";
import httpClient from "@/core/network/client";
import { Products } from "@/modules/home/data/product";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function useGetRelatedProducts() {
    const { id } = useLocalSearchParams();
    const { data, isLoading, error } = useQuery<Products>({
        queryKey: ["relatedProducts", id],
        queryFn: async () => httpClient.get(endpoints.relatedProducts(+id)),
    });
    return {
        data,
        isLoading,
        error,
    }
}