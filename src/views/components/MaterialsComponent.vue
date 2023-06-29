<template>
  <!-- data-shape 用来存储图形类型来进行处理 -->
  <div class="materials">
    <i draggable data-shape="rect" class="iconfont icon-rect" @dragstart="dragstart" />
    <i draggable data-shape="circle" class="iconfont icon-circle" @dragstart="dragstart" />
    <i draggable data-shape="ellipse" class="iconfont icon-ellipse" @dragstart="dragstart" />
    <i draggable data-shape="diamond" class="iconfont icon-diamond" @dragstart="dragstart" />
  </div>
</template>

<script>
export default {
  name: 'MaterialsComponent',
  methods: {
    //  处理拖拽开始时间
    dragstart(event) {
      //  原生事件写入 dragSource 属性值
      event.dataTransfer.setData('dragSource', JSON.stringify({
        //  把 data-shape 存储的图形类型赋值给 shape
        shape: event.target.getAttribute('data-shape'),
      }));
    },
  },
};
</script>

<style scoped>
.materials {
  width: 80px;
}

.iconfont {
  display: block;
  margin: 20px auto;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  text-align: center;
  cursor: move;
}
.iconfon:hover {
  transform: scale(1.2);
}
</style>
