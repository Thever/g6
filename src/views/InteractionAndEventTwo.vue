<template>
    <div class="set-block">
        <p>更多内置的Behavior可参考：https://g6.antv.antgroup.com/manual/middle/states/default-behavior</p>
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'InteractionAndEventTwo',
    mounted() {
        // 定义数据源
        const data = {
            // 点集
            nodes: [
                {
                    id: 'node1',
                    x: 100,
                    y: 200,
                },
                {
                    id: 'node2',
                    x: 300,
                    y: 200,
                },
            ],
            // 边集
            edges: [
                // 表示一条从 node1 节点连接到 node2 节点的边
                {
                    source: 'node1',
                    target: 'node2',
                },
            ],
        };

        // 创建 G6 图实例
        const graph = new G6.Graph({
            container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
            // 画布宽高
            width: 1000,
            height: 800,
            //  使用behavior
            modes: {
                default: ['drag-node', 'drag-canvas']
            }
        });
        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();
    }
}
</script>

<style>
.set-block {
    width: 1000px;
    height: auto;
    display: block;
    overflow: hidden;
    margin: 0 auto;
}

#container {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>