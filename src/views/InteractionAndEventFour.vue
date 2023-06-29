<template>
    <div class="set-block">
        <p>默认拖动节点；点击节点，拖动画布；点击画布，拖动节点</p>
        <p>交互模式详情可参考：https://g6.antv.antgroup.com/manual/middle/states/mode</p>
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'InteractionAndEventFour',
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
                default: ['drag-node'],
                edit: ['drag-canvas']
            },
        });
        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();

        //  点击节点拖动画布
        graph.on('node:click', (e) => {
            console.log({ e })
            //  切换模式
            graph.setMode('edit')
        })
        //  点击画布拖动节点
        graph.on('canvas:click', (e) => {
            console.log({ e })
            //  切换模式
            graph.setMode('default')
        })
        // // 向 default 模式中添加名为 drag-canvas 的行为，并使用行为的默认配置
        // graph.addBehaviors('drag-canvas', 'default');

        // // 从 default 模式中移除名为 drag-canvas 的行为
        // graph.removeBehaviors('drag-canvas', 'default');

        // // 向 edit 模式中添加名为 drag-canvas 的行为，并定义个性化配置
        // graph.addBehaviors(
        //   {
        //     type: 'drag-canvas',
        //     direction: 'x',
        //   },
        //   'edit',
        // );

        // // 从 edit 模式中移除名为 drag-canvas 的行为
        // graph.removeBehaviors('drag-canvas', 'edit');

        // // 一次向 default 模式中添加多个行为
        // graph.addBehaviors(['drag-canvas', 'zoom-canvas'], 'default');

        // // 一次从 default 模式中移除多个行为
        // graph.removeBehaviors(['drag-canvas', 'zoom-canvas'], 'default');

        // // --------

        // // 更新 'default' 模式下的 behavior 'zoom-canvas'
        // graph.updateBehavior('zoom-canvas', { sensitivity: 1.5, enableOptimize: true}, 'default');

        // // 更新 'select' 模式下的 behavior 'click-select'
        // graph.updateBehavior('click-select', { trigger: 'ctrl' }, 'select');
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