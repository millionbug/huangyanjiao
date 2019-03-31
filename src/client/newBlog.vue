<template>
  <div class="blog">
    <div class="blog-header-container">
      <pageHeader title="blog" />
    </div>
    <div class="blog-bar-container">
      <asideBar :barsData="dirList" @selectCategory="selectCategory" @selectValue="selectValue"/>
    </div>
    <div v-html="blogContent" class="blog-container" v-highlight></div>
  </div>
</template>

<script>
import asideBar from './asideBar.vue';
import pageHeader from './pageHeader.vue';
import myMarked from 'marked';
import hljs from 'highlight.js';
myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  hljs: function(code) {
    hljs.highlightAuto(code).value;
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
      blogContent: ''
    }
  },
  components: {
    asideBar,
    pageHeader
  },
  created() {
    this.fetchDirList();
    this.selectCategory();
  },
  methods: {
    fetchDirList() {
      fetch('/api/blogsdir')
      .then(response => {
        if (response.ok) {
          response.json().then(data => this.dirList = data); 
        }
      })
    },
    selectCategory(category) {
      if (this.category === category) return;
      this.category = category;
    },
    selectValue(value) {
      if (this.value === value) return;
      this.value = value;
      fetch('/api/blogs/single?id=' + value + '&&' + 'category=' + this.category)
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
  &-header-container {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
  }
  &-bar-container {
    // margin-top: 54px;
    padding-left: 30px;
    width: 340px;
    position: fixed;
    top: 54px;
  }
  &-container {
    margin: 54px 0 0 340px;
  }
}
</style>

