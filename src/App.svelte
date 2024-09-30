<script>
  // @ts-ignore
  import { Router, Route, Link } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/+page.svelte";
  import Order from "./views/admin/Cart.svelte";
  import Index from "./views/admin/index.svelte";

  export let url = "";
</script>
<main>
  <Router url={url}>
    <nav class="bg-gray-800 text-white p-4">
      <Link to="/" class="ml-4">Inicio</Link>
      <Link to="/Cart" class="ml-4">Cart</Link>
      <Link to="/admin/product/" class="ml-4">Productos</Link>
  </nav>
    <Route path="/" component = {Index} />
    <Route path="/Cart/" component = {Order} />
    <Route path="/admin/product/" component = {ProductDetail} />
  </Router>
</main>