<template>
<div id="app" class="blog">
  <div class="header">
    <img src="/img/banner.jpg" />
  </div>
  <div class="footer">
    <a 
      :key="index"
      v-for="(item, index) in composition" class="blog-title"
      :href="`/blog/detail?id=${item.id}`"
    >
      {{item.title}}
    </a>
  </div>
</div>
</template>

<script>
import superagent from 'superagent';
export default {
  data() {
    return {
      composition: [],
      loadError: false,
      loading: true
    }
  },
  created() {
    superagent.get('/api/blogs/composition')
      .end((err, res) => {
        this.loading = false;
        if (err || res.body && res.body.code !== 200) {
          this.loadError = true;
          return;
        }
        this.composition = res.body.data;
      })
  }
}
</script>

<style>
.header {
  height: 300px;
}
.header img {
  height: 100%;
  width: 100%;
}
.footer {
  text-align: center;
}
</style>
