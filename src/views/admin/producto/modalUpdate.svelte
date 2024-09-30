<script lang="ts">
	import { onMount } from "svelte";

	import {
		Button,
		CloseButton,
		Heading,
		Input,
		Label,
		Select,
		Textarea,
	} from "flowbite-svelte";
	// @ts-ignore
	import { CloseOutline } from "flowbite-svelte-icons";
	export let hidden: boolean = true; // modal control
	export let selectedProduct = {};

    let updateProducts = { ...selectedProduct };

    $: if (Object.keys(selectedProduct).length > 0) {
        updateProducts = { ...selectedProduct };
    }

    onMount(() => {
        if (Object.keys(selectedProduct).length > 0) {
            updateProducts = { ...selectedProduct };
        }
    });

	async function updateProduct() {
		const response = await fetch(
			`https://accused-beverlie-freelancer-indepent-c689f673.koyeb.app/api/products/${updateProducts._id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateProducts),
			},
		);

		if (response.ok) {
			const result = await response.json();
			alert("Product updated successfully");
			hidden = true;
		} else {
			const err = await response.json();
			alert("Failed to update product: " + err.message);
		}
	}
</script>

<Heading tag="h5" class="mb-6 text-sm font-semibold uppercase"
	>Update product</Heading
>
<CloseButton
	on:click={() => (hidden = true)}
	class="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:text-white"
/>

<form on:submit|preventDefault={updateProduct}>
	<div class="space-y-4">
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="title"
				class="border font-normal outline-none"
				placeholder="Type product name"
				bind:value={updateProducts.name}
				required
			/>
		</Label>

		<Label class="space-y-2">
			<span>Price</span>
			<Input
				type="number"
				name="price"
				class="border font-normal outline-none"
				placeholder="$2999"
				bind:value={updateProducts.price}
				required
			/>
		</Label>

		<Label class="space-y-2">
			<span>Category</span>
			<Select
				bind:value={updateProducts.category}
				class="border-gray-300 font-normal outline-none"
			>
				<option selected>Select category</option>
				<option value="Home">Home</option>
				<option value="Technology">Technology</option>
				<option value="Clothes">Clothes</option>
				<option value="Other">Other</option>
			</Select>
		</Label>

		<Label class="space-y-2">
			<span>Image</span>
			<Input
				type="url"
				name="image"
				class="border font-normal outline-none"
				placeholder="https://"
				bind:value={updateProducts.image}
				required
			/>
		</Label>

		<Label class="space-y-2">
			<span>Description</span>
			<Textarea
				rows="4"
				placeholder="Enter product description"
				bind:value={updateProducts.description}
				class="border-gray-300 font-normal outline-none"
			></Textarea>
		</Label>

		<Label class="space-y-2">
			<span>Brand</span>
			<Input
				type="text"
				name="brand"
				class="border font-normal outline-none"
				placeholder="Apple"
				bind:value={updateProducts.brand}
				required
			/>
		</Label>

		<Label class="space-y-2">
			<span>Stock</span>
			<Input
				type="number"
				name="stock"
				class="border font-normal outline-none"
				placeholder="Enter stock quantity"
				bind:value={updateProducts.countInStock}
				required
			/>
		</Label>
		<div
			class="bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4"
		>
			<Button type="submit" class="w-full">Update product</Button>
			<Button
				color="alternative"
				class="w-full"
				on:click={() => (hidden = true)}
			>
				<CloseOutline />
				Cancel
			</Button>
		</div>
	</div>
</form>
