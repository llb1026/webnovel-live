<template>
  <div class="home">
    <p>hello</p>
    <DocumentsComponent msg="This is Documents Page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DocumentsComponent from '@/components/DocumentsComponent.vue'
export default {
  name: 'documents',
  components: {
    DocumentsComponent
  }
}
</script>
