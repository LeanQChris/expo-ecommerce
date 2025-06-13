import { create } from "zustand";
import { Product } from "../home/data/product";

interface CartStore {
    cartItems: { product: Product, quantity: number }[];
    clearCart: () => void;
    addProductToCart: (product: Product, quantity: number) => void;
    removeProductFromCart: (productId: number) => void;
    updateProductQuantity: (productId: number, quantity: number) => void;
}

export const cartStore = create<CartStore>((set) => ({
    cartItems: [],
    clearCart: () => set(() => ({ cartItems: [] })),
    addProductToCart: (product, quantity) => set((state) => {
        const existingItem = state.cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            return {
                cartItems: state.cartItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            };
        } else {
            return {
                cartItems: [...state.cartItems, { product, quantity }]
            };
        }
    }),
    removeProductFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.product.id !== productId)
    })),
    updateProductQuantity: (productId, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
            item.product.id === productId
                ? { ...item, quantity }
                : item
        )
    })),
}));