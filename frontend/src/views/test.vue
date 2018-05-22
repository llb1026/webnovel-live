<template>
  <div class="home">
    <div id="1">{{ message }}</div>
    <HelloTest msg="This is Test Page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloTest from '@/components/HelloTest.vue'
export default {
  name: 'test',
  components: {
    HelloTest
  }
}
</script>
