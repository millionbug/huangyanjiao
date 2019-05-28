<template>
    <!-- <div v-html="blogContent" class="blog-container" v-highlight></div>   -->
    <div v-html="blogContent" class="blog-container"></div>  
</template>

<script>
export default {
  props: {
    blogContent: String,
    default: ''
  }
}
</script>

<style>

</style>

