<template>
<div class="paperLink-container">
  <ul>
    <li class="node" :key="value.fileName" v-for="value in data">
      <div class="vertical-line"></div>
      <a>{{value.fileName}}</a>
      <p>{{value.mtime}}</p>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    active: {
      type: Number,
      default: ''
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
.paperLink-container {
  color: #999;
  ul, li {
    list-style: none;
  }
}
.node {
  position: relative;
  padding-bottom: 20px;
}
.node::before {
  content: ' ';
  position: absolute;
  left: -20px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #555;
}
.node:last-of-type .vertical-line {
  height: 0;
}
.vertical-line {
  position: absolute;
  left: -16px;
  top: 8px;
  height: 100%;
  width: 1px;
  background: #999;
}
</style>


