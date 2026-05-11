export type OrderLineItem = {
    id: string;
    name: string;
    quantity: number;
    price: string;
};

export type Order = {
    id: string;
    date: string;
    total: string;
    status: string;
    items: number;
    subtotal: string;
    shipping: string;
    paymentMethod: string;
    shippingAddress: string;
    lineItems: OrderLineItem[];
    trackingNumber: string;
};

export const orders: Order[] = [
    {
        id: "ORD-1024",
        date: "May 10, 2026",
        total: "$89.00",
        status: "Delivered",
        items: 3,
        subtotal: "$75.00",
        shipping: "$14.00",
        paymentMethod: "Visa •••• 1234",
        shippingAddress: "123 Market St, San Francisco, CA",
        trackingNumber: "1Z999AA10123456784",
        lineItems: [
            { id: "P-01", name: "Organic Cotton Hoodie", quantity: 1, price: "$45.00" },
            { id: "P-11", name: "Minimalist Wallet", quantity: 1, price: "$23.00" },
            { id: "P-28", name: "Scented Candle", quantity: 1, price: "$21.00" },
        ],
    },
    {
        id: "ORD-1019",
        date: "Apr 28, 2026",
        total: "$54.50",
        status: "Shipped",
        items: 2,
        subtotal: "$46.00",
        shipping: "$8.50",
        paymentMethod: "Mastercard •••• 7632",
        shippingAddress: "45 Elm St, Los Angeles, CA",
        trackingNumber: "1Z999BB10123456785",
        lineItems: [
            { id: "P-03", name: "Classic Denim Shirt", quantity: 1, price: "$28.00" },
            { id: "P-10", name: "Canvas Sneakers", quantity: 1, price: "$18.00" },
        ],
    },
    {
        id: "ORD-1007",
        date: "Mar 14, 2026",
        total: "$120.75",
        status: "Completed",
        items: 5,
        subtotal: "$104.75",
        shipping: "$16.00",
        paymentMethod: "PayPal",
        shippingAddress: "78 Pine Ave, Seattle, WA",
        trackingNumber: "1Z999CC10123456786",
        lineItems: [
            { id: "P-09", name: "Travel Backpack", quantity: 1, price: "$60.00" },
            { id: "P-07", name: "Stainless Water Bottle", quantity: 2, price: "$18.75" },
            { id: "P-02", name: "Wireless Earbuds", quantity: 1, price: "$26.00" },
        ],
    },
];
