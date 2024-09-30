<script lang="ts">
    import { onMount } from 'svelte';
    import { Card, Button } from 'flowbite-svelte';
    import { ShoppingBagSolid } from 'flowbite-svelte-icons';
    import { addToCart } from './store';
    
    let products = [];
    
    onMount(async () => {
        const response = await fetch('https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products');
        const data = await response.json();
        products = data.products;
    });
    
    function handleAddToCart(product) {
        addToCart(product);
    }
    </script>
    
    <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold my-4">Our Products</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each products as product}
                <Card img={product.image} horizontal>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.name}
                    </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        {product.description}
                    </p>
                    <p class="mb-3 font-bold text-lg">${product.price}</p>
                    <Button on:click={() => handleAddToCart(product)}>
                        <ShoppingBagSolid class="mr-2 h-5 w-5" />
                        Add to cart
                    </Button>
                </Card>
            {/each}
        </div>
    </div>