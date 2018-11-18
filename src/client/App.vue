<template>
  <div class="google">
    <div class="top-right-bar">
      yangsir_v@qq.com
    </div>
  </div>
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 0;
  color: #333;
}
html {
  background: #fff;
}
.google {
  height: 100vh;
}
.google .top-right-bar {
  font-size: 20px;
  margin: 10px 10px 0 0;
  float: right;
}
</style>