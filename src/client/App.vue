<template>
  <div class="vue">这是个App的div</div>
</template>

<script>
import superagent from 'superagent';

export default {
  created() {
    superagent.get('/api/webpackproxy')
      .end((err, res) => {

      })
  }
}
</script>

<style>
.vue {
  color: green;
}
</style>