import { Product } from "../types/product";

export const addToCart = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1; // Increment quantity if product exists
    } else {
        cart.push({
            ...product,
            quantity: 1 // Add new product with quantity 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
};

export const removeFromCart = (productId: string) => {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item._id !== productId); // Remove the product
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
};

export const updateCartQuantity = (productId: string, quantity: number) => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex(item => item._id === productId);

    if (productIndex > -1) {
        cart[productIndex].quantity = quantity; // Update the quantity
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
    }
};

export const getCartItems = (): Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};