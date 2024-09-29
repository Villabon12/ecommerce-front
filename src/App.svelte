<script>
  // @ts-ignore
  import { Router, Route, Link } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/+page.svelte";

  export let url = "";
</script>
<main>
  <Link to="/product/">Productos</Link>
  <Router url={url}>
    <Route path="/product/" component = {ProductDetail} />
  </Router>
</main>