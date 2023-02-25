<template>
  <v-container fluid style="flex-wrap: wrap;">
    <div class="container">
      <div id="swagger-ui"></div>
    </div>
  </v-container>
</template>

<script>
import { SwaggerUIBundle } from 'swagger-ui-dist'
export default {
  name: 'Docs',
  mounted () {
    const ui = SwaggerUIBundle({
      url: '/YmMIpExXDGOXaWZcg9aIesju9cIxj0C0t1gfcw6GeqhwD4XZHP4u.json',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ]
    })
  }
}
</script>

<style lang="scss">
  @import "~swagger-ui-dist/swagger-ui.css";
  .swagger-ui {
    .info {
      background-color: unset !important;
      border-color: unset !important;
    }
  }
</style>
