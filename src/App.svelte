<script>
  // @ts-ignore
  import { Router, Route } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/+page.svelte";

  export let url = "";
</script>
<main>
  <a href="/admin/product/">Productos</a>
  <Router url={url}>
    <Route path="/admin/product/" component = {ProductDetail} />
  </Router>
</main>