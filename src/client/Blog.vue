<template>
<div id="app" class="blog">
  <div class="header">
    <img src="/img/banner.jpg" />
  </div>
  <div class="footer">
    <a
      target="_blank"
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
      .set('Accept', 'application/json')
      .end((err, res) => {
        this.loading = false;
        console.log(res.body)
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
.footer a {
  font-size: 20px;
  display: block;
  margin-top: 20px;
}
</style>
