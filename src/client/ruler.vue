<template>
  <div>
    <div class="test"></div>
    <div class="ruler-container">
      <div id="ruler" ref="ruler" class="ruler" @mousemove="fingerMove">
        <ul>
          <li v-for="value in 198" :key="value">
            <span class="dividing-number" v-if="dividing(value)">
              <span class="center-sol">{{dividing(value)}}</span>
            </span>
          </li>
        </ul>
        <div @click="fixed('leftFixed')" class="left-bottom" :class="leftFixed && 'fixed'"></div>
        <div @mousedown="holdon" @mouseover="drop" @mouseup="drop" @mousemove="dragRule" class="center-bottom" :class="rulerHoldOn && 'fixed'"></div>
        <div @click="fixed('rightFixed')" class="right-bottom" :class="rightFixed && 'fixed'"></div>
      </div>
      <div class="modal"></div>
    </div>
  </div>
</template>

<script lang="ts">
import throttle from '../tool/throttle.js'
export default {
  data() {
    return {
      width: 20,
      height: 5,
      referenceTop: 0,
      referenceLeft: 0,
      leftFixed: false,
      rightFixed: false,
      rulerHoldOn: false
    }
  },
  mounted() {
    let ruler = document.querySelector('#ruler') || {};
    this._ruler = ruler;
    let distanceObj = ruler.getBoundingClientRect() || {};
    this.referenceLeft = distanceObj.left;
    this.referenceTop = distanceObj.top;
  },
  methods: {
    holdon() {
      this.rulerHoldOn = true;
    },
    drop() {
      this.rulerHoldOn = false;
    },
    moveTo(left, top) {
      left = left - 300;
      top = top - 60;
      console.log(this._ruler, left, top)
      this._ruler.style.left = left + 'px';
      this._ruler.style.top = top + 'px';
    },
    dragRule: throttle(function(e) {
      console.log(this.rulerHoldOn)
      if (!this.rulerHoldOn) {
        return;
      }
      e.stopPropagation();
      let left = e.clientX;
      let top = e.clientY;
      this.moveTo(left, top);
    }, {
      timeout: 300
    }).run,
    fixed(direction) {
      this[direction] = !this[direction];
    },
    fingerMove: throttle(function(e) {
    }, {
      first: true,
      timeout: 3000
    }).run,
    dividing(value) {
      if (value === 0 || value === this.width * 10) {
        return '';
      }
      if (value % 10) {
        return '';
      }
      return value / 10;
    }
  },
  computed: {
    color() {
      return 0;
    },
    coordinate() {
      return 0;
    }
  }
}
</script>

<style lang="scss">
.test {
  margin: 100px 0 0 100px;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background: #234433;
}
.ruler-container {

}
.ruler {
  position: fixed;
  top: 600px;
  left: 100px;
  margin: auto;
  width: 600px;
  height: 60px;
  border: 1px solid #000;
  ul, li {
    list-style: none;
  }
  ul {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  li {
    border-left: 1px solid #000;
    height: 8px;
    position: relative;    
  }
  li:nth-child(5n) {
    height: 15px;
  }
  li:nth-child(10n) {
    height: 20px;
  }
  .dividing-number {
    position: absolute;
    top: 100%;
    left: 0;
  }
  .center-sol { //margin的参考系是父元素的宽度，纵向排版时为父元素的高度
    margin-left: -50%;
  }
  .left-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0px;
    height: 0px;
    border-bottom: 20px solid #345345;
    border-right: 20px solid transparent;
  }
  .right-bottom {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0px;
    height: 0px;
    border-bottom: 20px solid #345345;
    border-left: 20px solid transparent;
  }
  .center-bottom {
    bottom: 0px;
    left: 50%;
    margin-left: -20px;
    height: 20px;
    width: 40px;
    background-color: #345345;
    position: absolute;
  }
  .fixed {
    border-color: #FF4B7D;
  }
}
</style>
