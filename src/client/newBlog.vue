<template>
  <div class="blog">
    <div class="blog-header-container">
      <pageHeader title="blog" />
    </div>
    <div class="blog-bar-container">
      <asideBar :rank="true" :category="category" :value="value" :barsData="dirList" @selectCategory="selectCategory" @selectValue="selectValue"/>
    </div>
    <router-view :blogContent="blogContent"></router-view>
    <!-- <div v-html="blogContent" class="blog-container" v-highlight></div> -->
    <div class="blog-rightbar-container">
      <paperLink :data="modifyList" :active="0"/>
    </div>
  </div>
</template>

<script>
import asideBar from './asideBar.vue';
import paperLink from './paperLink.vue';
import pageHeader from './pageHeader.vue';
import myMarked from 'marked';
import hljs from 'highlight.js';
hljs.initHighlightingOnLoad();
myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  highlight: function(code) {
    let value = hljs.highlightAuto(code).value
    console.log(value)
    return value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
export default {
  data() {
    return {
      category: '',
      value: '',
      content: '',
      dirList: [],
      modifyList: [],
      blogContent: ''
    }
  },
  components: {
    asideBar,
    pageHeader,
    paperLink
  },
  created() {
    this.fetchDirList();
    let {category, value} = this.$route.params;
    if (category && value) {
      this.category = category;
      this.value = value;
      this.getContent();
    }
  },
  methods: {
    fetchDirList() {
      fetch('/api/blogsdir')
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.dirList = data.dirList;
            this.modifyList = data.modifyList.sort((a, b) => {
              return a.mtime > b.mtime ? -1 : 1;
            });
          }); 
        }
      })
    },
    selectCategory(category) {
      if (this.category === category) return;
      this.category = category;
      this.$router.push('/newblog/' + category)
    },
    selectValue(value) {
      if (this.value === value) return;
      this.value = value;
      this.$router.push(`/newblog/${this.category}/${value}`)
      this.getContent()
    },
    getContent() {
      fetch('/api/blogs/single?id=' + this.value + '&&' + 'category=' + this.category)
      .then(response => {
        if (response.ok) {
          return response.text()
        }
      })
      .then(text => {
        this.content = text;
        window.localStorage.setItem(this.category + '/' + this.value, text);
        return text;
      })
      .then(text => {
        if (text) {
          this.blogContent = myMarked(text);
        }
      })
    }
  }
}
</script>

<style lang="scss">
.blog {
  // highlight的样式有问题，不知道用意是什么。发现包括简书等都是自己复写样式
  pre {
    overflow: auto;
    background: #FF9B78;
    border-radius: 4px;
  }
  &-header-container {
    position: fixed;
    z-index: 1;
    width: 100%;
    left: 0;
    top: 0;
  }
  &-bar-container {
    border-right: 1px solid #eaecef;
    padding-left: 30px;
    width: 340px;
    position: fixed;
    top: 0;
    padding-top: 54px;
    height: 100%;
    overflow-y: auto;
  }
  &-rightbar-container {
    padding-left: 30px;
    width: 340px;
    position: fixed;
    right: 0px;
    top: 0;
    height: 100%;
    padding-top: 54px;
    overflow-y: auto;
  }
  &-container {
    padding: 0 0 0 10px;
    margin: 54px 340px 0 340px;
    // overflow: auto;
    height: 100%;
  }
}
</style>

