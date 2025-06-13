export const baseUrl = 'https://api.escuelajs.co/api/v1/';

export const endpoints = {
    allProducts: "products",
    allCategories: "categories",
    productsById: (id: number) => `products/${id}`,
}