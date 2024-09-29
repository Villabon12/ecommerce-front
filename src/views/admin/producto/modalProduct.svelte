<script lang="ts">
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

	let name = "";
	let price = "";
	let description = "";
	let image = "";
	let brand = "";
	let category = "";
	let countInStock = 0;

	async function addProduct() {
		const productData = {
			name,
			price,
			description,
			image,
			brand,
			category,
			countInStock,
		};

		const response = await fetch("http://localhost:4000/api/products/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productData),
		});

		if (response.ok) {
			const result = await response.json();
			alert("Producted added successfully");
			hidden = true;
		} else {
			const err = await response.json();
			alert("failed to add product " + err.message);
		}
	}

</script>

<Heading tag="h5" class="mb-6 text-sm font-semibold uppercase"
	>Add new product</Heading
>
<CloseButton
	on:click={() => (hidden = true)}
	class="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:text-white"
/>

<form on:submit|preventDefault={addProduct}>
	<div class="space-y-4">
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="title"
				class="border font-normal outline-none"
				placeholder="Type product name"
				bind:value={name}
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
				bind:value={price}
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Category</span>
			<Select
				bind:value={category}
				class="border-gray-300 font-normal outline-none"
			>
				<option selected>Select category</option>
				<option value="Home">Home</option>
				<option value="Tecnology">Tecnology</option>
				<option value="Clothes">Clothes</option>
				<option value="Other">Other</option>
			</Select>
		</Label>
		<Label class="space-y-2">
			<span>image</span>
			<Input
				type="url"
				name="price"
				class="border font-normal outline-none"
				placeholder="https://"
				bind:value={image}
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Description</span>
			<Textarea
				rows="4"
				placeholder="Enter event description here"
				bind:value={description}
				class="border-gray-300 font-normal outline-none"
			></Textarea>
		</Label>
		<Label class="space-y-2">
			<span>Brand</span>
			<Input
				type="text"
				name="title"
				class="border font-normal outline-none"
				placeholder="Apple"
				bind:value={brand}
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Stock</span>
			<Input
				type="number"
				name="price"
				class="border font-normal outline-none"
				placeholder="Enter stock quantity"
				bind:value={countInStock}
				required
			/>
		</Label>
		<div
			class="bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4"
		>
			<Button type="submit" class="w-full">Add product</Button>
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
