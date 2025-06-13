import { endpoints } from "@/core/constants/endpoints";
import httpClient from "@/core/network/client";
import { useQuery } from "@tanstack/react-query";
import { Products } from "../data/product";
import { homeStore } from "../store";

export default function useGetProducts() {
    const { selectedCategoryId } = homeStore();
    const { data, isLoading } = useQuery<Products>({
        queryKey: ["products", selectedCategoryId],
        queryFn: () => httpClient.get(endpoints.allProducts, {
            params: {
                categoryId: selectedCategoryId ? selectedCategoryId : undefined
            }
        }),
    });

    return {
        products: data,
        isLoading,
    };
}