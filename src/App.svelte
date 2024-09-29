<script>
  // @ts-ignore
  import { Router, Route } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/product.svelte";

  export let url = "";

  import { Input, Textarea, Select, Button } from "flowbite-svelte";
    let textareaprops = {
      id: "message",
      name: "message",
      label: "Tu mensaje",
      rows: 4,
      placeholder: "Product Description",
    };
    let option = [
      { value: 1, name: "1" },
      { value: 2, name: "2" },
      { value: 3, name: "3" },
    ];
  
    let product = {
      id: "",
      name: "",
      description: "",
      category: "",
      imageUrl: "",
    };
  
    const onsubmitHandle = e => {
      e.preventDefault();
      console.log(product);
    };
</script>
<main>
  <div class="mb-6">
    <form on:submit={onsubmitHandle}>
      <Input class="mt-2" type="text" placeholder="Product Name" id="product-name" bind:value={product.name}/>
      <Textarea class="mt-2" {...textareaprops} bind:value={product.description} />
      <Input type="url" id="product-image" placeholder="https://www." bind:value={product.imageUrl} />
      <Select class="mt-2" items={option} bind:value={product.category}  />
      <Button class="mt-2" type="submit" color="green">Save product</Button>
    </form>
  </div>
  <a href="/product">Productos</a>
  <Router url="{url}">
    <Route path="/product/" component = "{ProductDetail}" />
  </Router>
</main>