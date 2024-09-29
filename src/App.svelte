<script>
  // @ts-ignore
  import { Router, Route } from 'svelte-routing';

  // @ts-ignore
  import ProductDetail from "./views/admin/producto/+page.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <Route path="admin/product/detail" component = "{ProductDetail}" />
</Router>