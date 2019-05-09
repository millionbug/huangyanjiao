<template>
  <div class="bars">
    <ul class="bars-trans-animation">
      <li
        class="bars-bar bars-trans-animation"
        v-for="(value, index) in barsData"
        :key="value && value.category || index"
        @click="changeOne(value.category)"
      >
        <h1 class="bars-header bars-header-one">
          <span class="bars-header-one-value" :class="activeli === value.category && 'bars-header-one-value-active'">{{value.category}}</span>
          <span class="bars-arrow bars-right bars-trans-animation" :class="activeli === value.category && 'bars-down'"></span>
        </h1>
        <div
          class="bars-list-container bars-trans-animation"
          :class="(activeli === value.category || rank) && 'bars-list-container-active'"
        >
          <h2
            v-for="l in value.list || []"
            class="bars-header bars-header-two"
            :class="activeTwo === value + l && 'bars-header-two-active'"
            :key="value + l"
            @click="changeTwo({category: value.category,  l})"
          >
            {{l}}
          </h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    barsData: {
      type: Array,
      default: () => []
    },
    category: {
      type: String || Number,
      default: '',
    },
    value: {
      type: String || Number,
      default: '',
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeli: '',
      activeTwo: '',
    }
  },
  methods: {
    changeOne(index) {
      if (this.activeli !== index) {
        this.activeli = index;
      }
      this.$emit('selectCategory', index)
    },
    changeTwo(obj) {
      let {category, l} = obj;
      console.log(obj)
      if (category) {
        this.changeOne(category)
      }
      this.activeTwo = l;
      this.$emit('selectValue', l)
    }
  }
}
</script>

<style lang="scss">
// transition动态改变height来实现动画，需要具体的值，可以使用max-height
.bars {
  ul, li {
    list-style-type: none;
  }
  &-trans-animation {
    transition:all .3s;
  }
  &-list-container {
    max-height: 0px;
    overflow: hidden;
  }
  &-list-container-active {
    max-height: 300px;
  }
  &-header {
    padding: 0;
    margin: 0;
    font-size: 18px;
    &-one-value {
      font-weight: 700;
      color: #999;
    }
    &-one-value:hover, &-two:hover {
      color: #333;
    }
    &-one-value-active {
      color: #333;
    }
    &-two {
      font-size: 16px;
      color: #999;
      font-weight: 400;
      padding-left: 25px;
      
    }
    &-two:hover {
      color: #42b983;
    }
    &-two-active {
      color: #42b983;
      border-left: 4px solid #42b983;
    }
  }
  &-arrow {
    content: '';
    width: 0;
    height: 0; 
    display: inline-block;
    line-height: 1em;
    /* vertical-align定义的自身相对于父元素的基线的定位方式 */
    vertical-align: middle; 
  }
  &-right {
    border-left: 6px solid #999;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-right: none;
  }
  &-down {
    transform: rotate(90deg);
    transform-origin: 0% 100%;
  }
  // &-down {
  //   border-top: 6px solid #999;
  //   border-right: 3px solid transparent;
  //   border-left: 3px solid transparent;
  //   border-bottom: none;
  // }
}
</style>

