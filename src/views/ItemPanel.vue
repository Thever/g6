<template>
  <div
    id="itemPanel"
    ref="itemPanel"
  >
    <i class="iconfont icon-h-drag" />
    <!-- data-shape 用来存储图形类型来进行处理 -->
    <div class="icon-tool">
      <i
        draggable="true"
        data-shape="circle"
        class="iconfont icon-circle"
        title="icon-circle"
      />
      <i
        draggable="true"
        data-shape="rect"
        class="iconfont icon-rect"
        title="icon-rect"
      />
      <i
        draggable="true"
        data-shape="ellipse"
        class="iconfont icon-ellipse"
        title="icon-ellipse"
      />
      <i
        draggable="true"
        data-shape="diamond"
        class="iconfont icon-diamond"
        title="icon-diamond"
      />
      <i
        draggable="true"
        data-shape="modelRect"
        class="iconfont icon-model-rect"
        title="icon-model-rect"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemPanel',
    mounted () {
      // 拖拽结束
      this.$refs.itemPanel.querySelector('.icon-tool').addEventListener('dragend', e => {
        if(e.target.classList.contains('iconfont')) {
          this.$emit('canvas-add-node', e);
        }
      });

      // 阻止默认动作
      document.addEventListener('drop', e => {
        e.preventDefault();
      }, false);
    },
  };
</script>
<style scoped>
  #itemPanel{
    display:block;
    float:left;
  }
  .icon-tool{
    width:40px;
    display:block;
    overflow:hidden;
  }
  .icon-tool .iconfont{
    width: 40px;
    height: 40px;
    display:block;
  }
  .icon-circle{
    background:red;
  }
  .icon-circle::after{
    content:'circle'
  }
  .icon-rect{
    background:yellow;
  }
  .icon-rect::after{
    content:'rect'
  }
  .icon-ellipse{
    background:blue;
  }
  .icon-ellipse::after{
    content: 'ellipse',
  }
  .icon-diamond{
    background:pink;
  }
  .icon-diamond::after{
    content: 'diamond',
  }
  .icon-model-rect{
    background:skyblue;
  }
  .icon-model-rect::after{
    content: 'rect',
  }
</style>