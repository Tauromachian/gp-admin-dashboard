<template>
  <iframe
    class="iframe"
    src="http://localhost:9090/dashboard/42e084d0-6554-11ea-b9ac-a11d877c0848?publicId=fac81910-6553-11ea-b9ac-a11d877c0848"
    frameborder="0"
  ></iframe>
</template>

<script>
export default {
  name: "Monitorization"
}
</script>

<style scoped>
html,
body {
  overflow: hidden;
  margin: auto;
  height: 100%;
  width: 100%;
}
.iframe {
  width: 100%;
  height: 485px;
}
</style>