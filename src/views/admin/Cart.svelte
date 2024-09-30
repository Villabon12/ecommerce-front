<script lang="ts">
    import { cartStore, removeFromCart, updateCartItemQuantity } from './store';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    
    $: total = $cartStore.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    function handleRemove(productId) {
        removeFromCart(productId);
    }
    
    function handleQuantityChange(productId, newQuantity) {
        if (newQuantity > 0) {
            updateCartItemQuantity(productId, newQuantity);
        }
    }
    </script>
    
    <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold my-4">Your Cart</h2>
        {#if $cartStore.length === 0}
            <p>Your cart is empty.</p>
        {:else}
            <Table>
                <TableHead>
                    <TableHeadCell>Product</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>Quantity</TableHeadCell>
                    <TableHeadCell>Total</TableHeadCell>
                    <TableHeadCell>Actions</TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each $cartStore as item}
                        <TableBodyRow>
                            <TableBodyCell>{item.name}</TableBodyCell>
                            <TableBodyCell>${item.price}</TableBodyCell>
                            <TableBodyCell>
                                <input 
                                    type="number" 
                                    min="1" 
                                    bind:value={item.quantity}
                                    on:change={() => handleQuantityChange(item._id, item.quantity)}
                                    class="w-16 p-1 border rounded"
                                />
                            </TableBodyCell>
                            <TableBodyCell>${item.price * item.quantity}</TableBodyCell>
                            <TableBodyCell>
                                <Button color="red" size="xs" on:click={() => handleRemove(item._id)}>Remove</Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
            <div class="mt-4 text-right">
                <strong>Total: ${total.toFixed(2)}</strong>
            </div>
        {/if}
    </div>