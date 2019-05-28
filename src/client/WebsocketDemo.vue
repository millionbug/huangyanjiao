<template>
  <div id="nihao">
    <textarea @input="change" :value="ttext" class="wsdemo-container" id="tald-container" /> 
    <img src="http://localhost:3000/api/cookie/test" />
    <input v-model="inputText"/>
    <input v-pmodel="privateText"/>
  </div>
</template>

<script>
import throttle from '../tool/throttle.js';

export default {
  data() {
    return {
      ttext: '',
      inputText: '',
      privateText: ''
    }
  },
  directives: {
    pmodel: {
      bind() {
        let {el} = arguments;
        el.addEventListener('input', e => e)
        console.log(...arguments)
      },
      update() {
        // console.log(...arguments)
      }
    }
  },
  created() {
    //设计个目录和路由怎么这么难啊
    let ws = new WebSocket("ws://localhost:3000");
    this._ws = ws;
    ws.onopen = function(evt) { 
      console.log("Connection open ..."); 
      ws.send("Hello WebSockets!");
    };
    ws.onmessage = (evt) => {
      console.log('recive', evt.data)
      this.ttext = evt.data;
    };
    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };
    let th = throttle(() => this.send(), {timeout: 500});
    this._th = th;
  },
  methods: {
    change(e) {
      this.ttext = e.target.value;
      this._th.run();
    },
    send() {
      let value = this.ttext;
      //加截流防抖，避免输入太快频繁向服务器传输
      this._ws.send(value);
    }
  }
}
</script>

<style>
.wsdemo-container {
  min-height: 300px;
  border: 1px solid #333;
  margin: 15px;
}
</style>

