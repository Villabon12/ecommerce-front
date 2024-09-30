import { writable } from 'svelte/store';

const loadCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Crear el store
export const cartStore = writable(loadCart());

// Función para guardar el carrito en localStorage
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Suscribirse a los cambios del store y guardar en localStorage
cartStore.subscribe(cart => saveCart(cart));

// Función para añadir un producto al carrito
export const addToCart = (product) => {
    cartStore.update(cart => {
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            existingItem.quantity += 1;
            alert("Producto agregado al carrito");
            return cart;
        } else {
            alert("Carrito guardado");
            return [...cart, { ...product, quantity: 1 }];
        }
    });
};

// Función para eliminar un producto del carrito
export const removeFromCart = (productId) => {
    cartStore.update(cart => cart.filter(item => item._id !== productId));
    alert("Producto eliminado del carrito");
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = (productId, quantity) => {
    cartStore.update(cart => 
        cart.map(item => 
            item._id === productId 
                ? { ...item, quantity: quantity } 
                : item
        )
    );
    alert("Cantidad actualizada");
};