<template>
    <div class="show-content">
        <p>图的元素（Item）包含图上的节点 Node 、边 Edge 和 Combo 三大类。每个图元素由一个或多个 图形（Shape） 组成，且都会有自己的唯一关键图形（keyShape）。G6 内置了一系列具有不同基本图形样式的节点/边/ Combo，例如，节点可以是圆形、矩形、图片等。G6 中所有内置的元素样式详见 内置节点，内置边，内置 Combo。除了使用内置的节点/边/ Combo 外，G6 还允许用户通过自己搭配和组合 shape 进行节点/边/ Combo 的自定义，详见 自定义节点，自定义边，自定义 Combo。</p>
        <p>图元素具有公共的通用属性和通用方法。图元素的属性包括：</p>
        <ul>
            <li>样式属性，通过 style 字段对象进行配置，和元素的关键图形相关，例如 fill，stroke。可在元素状态改变时被改变。</li>
            <li>其他属性，例如 id、type，不能在元素状态改变是进行改变，可通过 graph.updateItem 进行手动更新。完整的元素属性列表参考：元素配置项。除了各类元素共有的通用属性外，每种节点/边/ Combo 都有各自的特有属性。</li>
        </ul>
        <p>图元素实例上具有对元素进行更新、销毁、获取属性、修改状态等通用方法，同时，对于实例的变更也可以通过调用 graph 上的方法进行。</p>
    </div>
</template>

<script>
// import G6 from "@antv/g6";
export default {
    name: "CoreGraphItem",
};
</script>

<style scoped>
.show-content{
    width:1000px;
    display:block;
    margin:0 auto;
}
</style>