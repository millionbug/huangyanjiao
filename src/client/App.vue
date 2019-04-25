<template>
  <div class="google">
    <div class="google-top-right-bar">
      yangsir_v<img src="/img/ate.jpg" />qq.com
    </div>
    <div class="google-menu">
      <router-link tag="div" class="menu-list"
        to="/newblog"
      >
        前端学习总结
      </router-link>
    </div>
    <canvas class="google-background" />
  </div>
</template>

<script lang="ts">
import superagent from 'superagent';
import rainbow from './plugin/rain-bow';

interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

export default {
  created() {
    console.log('crated')
    // superagent.get('/api/redirect/test')
    //   .end((err, res) => {

    //   })
    fetch('http://localhost:3000/api/redirect/test',{headers: {music: 'shadow'}})
    .then(response => console.log(response))
    .catch(err => console.log(err))
  },
  methods: {
  },
  mounted() {
    rainbow()
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
.google-top-right-bar {
  font-size: 20px;
  margin: 10px 10px 0 0;
  float: right;
  line-height: 20px;
  vertical-align: middle;
}
.google-top-right-bar img {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  vertical-align: middle;
}
.google-background {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.google-menu {
  position: absolute;
  top: 30%;
  left: 50%;
  text-align: center;
}
.google-menu .menu-list {
  margin-top: 30px;
  margin-left: -50%;
  font-size: 24px;
  text-decoration-line: underline;
}
.menu-list:first {
  margin-top: 0;
}
.menu-list:hover {
  transform: scale(1.1);
  color: #999;
}
</style>