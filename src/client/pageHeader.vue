<template>
  <div class="page-header-container">
    <div class="page-header-title">{{title}}</div>
    <div v-for="value in links" :key="value.name" class="page-header-link">
      <a :href="value.link" target="_blank">{{value.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  computed: {
    links() {
      return [{
        name: 'github',
        link: 'https://github.com/millionbug/huangyanjiao',
      }, {
        name: 'mail',
        link: 'yangsir_v@qq.com',
      }, {
        name: 'weibo',
        link: 'https://weibo.com/6754511046/profile?rightmod=1&wvr=6&mod=personinfo'
      }]
    }
  }
}
</script>

<style lang="scss">
//overflow hidden可以解决float元素无法撑开父元素高度
.page-header {
  &-container {
    background: #fff;
    padding: 10px 30px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid #eee;
  }
  &-title {
    flex: 1 0 auto;
    font-size: 24px;
    font-weight: 500;
  }
  &-link {
    margin-left: 25px;
  }
}
</style>

