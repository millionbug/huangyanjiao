<template>
  <div>
    <div class="container">
      <div class="float-parent">
        <div class="child-float-left"></div>
        <div class="child-float-right"></div>
      </div>
      <p class="not">当一个元素浮动之后，它会被移出正常的文档流，然
        后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰
        到另外一个浮动的元素。在下面的图片中，有三个红色的正方形。其中
        有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被
        放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，
        它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
      </p>
    </div>
    <div class="half-border"></div>
  </div>
</template>

<style>
.float-parent {
  margin: 50px;
  background: #999;
  /* height: 200px; */
}

.child-float-left {
  float: left;
  height: 40px;
  width: 40px;
  background: #900;
}
.half-border {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 20px;
  position: relative;
}
.half-border::before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  width: 200%;
  height: 200%;
  border-radius: 5px;
  border: 1px solid #333;
  transform: scale(0.5)
}
</style>

