import { writable } from 'svelte/store';

export const productsStore = writable([]);


export const fetchProducts = async () => {
  const res = await fetch(`https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products`);
  const data = await res.json();
  productsStore.set(data.products);
};

export const addProduct = async (productData) => {

  const res = await fetch(`https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (res.ok) {
    fetchProducts();
    alert("Producted added successfully");
  } else {
    throw new Error('Failed to add product');
  }
};

export const updateProduct = async (product) => {
  const res = await fetch(`https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products/${product._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (res.ok) {
    fetchProducts();
  } else {
    throw new Error('Failed to update product');
  }
};
