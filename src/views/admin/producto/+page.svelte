<script lang="ts">
    import {
        Button,
        Checkbox,
        Drawer,
        Heading,
        Input,
        Img,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Toolbar,
    } from "flowbite-svelte";
    // @ts-ignore
    import { EditOutline, TrashBinSolid } from "flowbite-svelte-icons";
    import type { ComponentType } from "svelte";
    import { sineIn } from "svelte/easing";
    import Delete from "./modalDelete.svelte";
    import Product from "./modalProduct.svelte";
    import Update from "./modalUpdate.svelte";
    import { productsStore, fetchProducts } from './stores';

    let hidden: boolean = true; // modal control
    let drawerComponent: ComponentType = Product; // drawer component
    let selectedProduct = {}; // Product data to update in modal

    const toggle = (component: ComponentType) => {
        drawerComponent = component;
        hidden = false;
    };

    let transitionParams = {
        x: 320,
        duration: 200,
        easing: sineIn,
    };
    let value = "";
    let Products = [];
    $: Products = $productsStore;

    fetchProducts();
    let searchTimeout;

    const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    value = e.target.value;
    searchTimeout = setTimeout(() => {
        if (value.length < 2) {
            fetchProducts();
        } else if (value.length > 2) {
            searchProduct();
        }
    }, 300);  // 300 ms de espera antes de ejecutar la búsqueda
};
    async function searchProduct() {
        const res = await fetch(
            `https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products?keyword=${value}`,
        );
        const data = await res.json();
        Products = data.products;
    }


</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
    <div class="p-4">
        <Heading
            tag="h1"
            class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl"
        >
            All products
        </Heading>

        <Toolbar embedded class="w-full py-4 text-gray-500 dark:text-gray-400">
            <Input
                {value}
                on:input={handleSearch}
                placeholder="Search for products"
                class="me-6 w-80 border xl:w-96"
            />

            <div slot="end" class="space-x-2">
                <Button
                    class="whitespace-nowrap"
                    on:click={() => toggle(Product)}>Add new product</Button
                >
            </div>
        </Toolbar>
    </div>

    <Table>
        <TableHead
            class="border-y border-gray-200 bg-gray-100 dark:border-gray-700"
        >
            <TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
            {#each ["Product Name", "Company", "Description", "Stock", "Price", "Image", "Actions"] as title}
                <TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
            {/each}
        </TableHead>
        <TableBody>
            {#if Products && Products.length > 0}
                {#each Products as product}
                    <TableBodyRow class="text-base">
                        <TableBodyCell class="w-4 p-4"
                            ><Checkbox /></TableBodyCell
                        >
                        <TableBodyCell
                            class="flex items-center space-x-6 whitespace-nowrap p-4"
                        >
                            <div
                                class="text-sm font-normal text-gray-500 dark:text-gray-400"
                            >
                                <div
                                    class="text-base font-semibold text-gray-900 dark:text-white"
                                >
                                    {product.name}
                                </div>
                                <div
                                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                                >
                                    {product.category}
                                </div>
                            </div>
                        </TableBodyCell>
                        <TableBodyCell class="p-4"
                            >{product.brand}</TableBodyCell
                        >
                        <TableBodyCell
                            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
                        >
                            {product.description}
                        </TableBodyCell>
                        <TableBodyCell class="p-4"
                            >{product.countInStock}</TableBodyCell
                        >
                        <TableBodyCell class="p-4"
                            >$ {product.price}</TableBodyCell
                        >
                        <TableBodyCell class="p-4"
                            ><Img
                                src={product.image}
                                width="50"
                                class="rounded-lg"
                            />
                        </TableBodyCell>
                        <TableBodyCell class="space-x-2">
                            <Button
                                size="sm"
                                class="gap-2 px-3"
                                on:click={() => {
                                    selectedProduct = product;
                                    toggle(Update);
                                }}
                            >
                                <EditOutline size="sm" /> Update
                            </Button>
                            <Button
                                color="red"
                                size="sm"
                                class="gap-2 px-3"
                                on:click={() => toggle(Delete)}
                            >
                                <TrashBinSolid size="sm" /> Delete item
                            </Button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            {:else}
                <TableBodyRow>
                    <TableBodyCell
                        colspan="8"
                        class="text-center p-4 text-gray-500 dark:text-gray-400"
                    >
                        No hay datos disponibles.
                    </TableBodyCell>
                </TableBodyRow>
            {/if}
        </TableBody>
    </Table>
</main>

<Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden>
    <svelte:component this={drawerComponent} bind:hidden />
</Drawer>
