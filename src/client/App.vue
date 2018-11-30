<template>
  <div class="google">
    <div class="top-right-bar">
      yangsir_v<img src="../../img/ate.jpg" />qq.com
    </div>
    <div class="menu">
      <div class="menu-list" @click="goToBlog">
        博客
      </div>
    </div>
    <canvas class="background" />
  </div>
</template>

<script>
import superagent from 'superagent';
import rainbow from './plugin/rain-bow';

export default {
  created() {
    superagent.get('/api/webpackproxy')
      .end((err, res) => {

      })
  },
  methods: {
    goToBlog() {
      this.$router.push('/blog')
      // window.open('http://lijundong.com/headless-browser/')
    }
  },
  mounted() {
    rainbow()
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* font-size: 0; */
  color: #333;
}
html {
  background: #fff;
}
.google {
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.google .top-right-bar {
  font-size: 20px;
  margin: 10px 10px 0 0;
  float: right;
  line-height: 20px;
  vertical-align: middle;
}
.google .top-right-bar img {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  vertical-align: middle;
}
.google .background {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.google .menu {
  position: absolute;
  top: 30%;
  left: 50%;
  text-align: center;
}
.google .menu .menu-list {
  display: inline-block;
  margin-left: -50%;
  font-size: 24px;
  text-decoration-line: underline;
}
.menu-list:hover {
  transform: scale(1.1);
  color: #999;
}
</style>