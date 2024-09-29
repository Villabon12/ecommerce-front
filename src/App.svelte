<script>
  // @ts-ignore
  import { Router, Route } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/product.svelte";

  export let url = "";
</script>
<main>
  <a href="/product">Productos</a>
  <Router url="{url}">
    <Route path="/product/" component = "{ProductDetail}" />
  </Router>
</main>