import { endpoints } from "@/core/constants/endpoints";
import httpClient from "@/core/network/client";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../data/product";

export default function useGetCategories() {
    const { data, isLoading } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => httpClient.get(endpoints.allCategories),
    });

    return {
        categories: data,
        isLoading,
    };
}