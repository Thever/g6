<template>
    <div class="set-block">
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
                    comboId: 'comboA',
                    label: 'node1',
                    //  在数中定义样式
                    stateStyles: {
                        hover: {
                            fill: 'blue',
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: 'yellow',
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node2',
                    x: 200,
                    y: 200,
                    comboId: 'comboA',
                    label: 'node2'
                },
                {
                    id: 'node3',
                    x: 300,
                    y: 200,
                    comboId: 'comboB',
                    label: 'node3'
                },
            ],
            // 边集
            edges: [
                // 表示一条从 node1 节点连接到 node2 节点的边
                {
                    source: 'node1',
                    target: 'node2',
                },
                {
                    source: 'node2',
                    target: 'node3',
                    //  在数据中定义样式
                    stateStyles: {
                        click: {
                            stroke: 'red',
                        },
                    }
                },
            ],
            //  combo
            combos: [
                {
                    id: 'comboA',
                    label: 'A'
                },
                {
                    id: 'comboB',
                    label: 'B',
                    //  在数据中定义样式
                    stateStyles: {
                        click: {
                            fill: '#05f55a',
                            stroke: '#0e7e36',
                            lineWidth: 5,
                        },
                    }
                }
            ]
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
            },
            // 节点在各状态下的样式
            nodeStateStyles: {
                // hover 状态为 true 时的样式
                hover: {
                    fill: 'lightsteelblue',
                },
                // click 状态为 true 时的样式
                click: {
                    stroke: '#000',
                    lineWidth: 3,
                },
            },
            // 边在各状态下的样式
            edgeStateStyles: {
                // click 状态为 true 时的样式
                click: {
                    stroke: 'steelblue',
                },
            },
            // 集合在各状态下的样式
            comboStateStyles: {
                // click 状态为 true 时的样式
                click: {
                    fill: '#0dccf5',
                    stroke: 'blue',
                    lineWidth: 5,
                },
            },
        });
        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();

        // 监听鼠标进入节点
        graph.on('node:mouseenter', (e) => {
            const nodeItem = e.item;
            // 设置目标节点的 hover 状态 为 true
            graph.setItemState(nodeItem, 'hover', true);
        });
        // 监听鼠标离开节点
        graph.on('node:mouseleave', (e) => {
            const nodeItem = e.item;
            // 设置目标节点的 hover 状态 false
            graph.setItemState(nodeItem, 'hover', false);
        });
        // 监听鼠标点击节点
        graph.on('node:click', (e) => {
            // 先将所有当前有 click 状态的节点的 click 状态置为 false
            const clickNodes = graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
                graph.setItemState(cn, 'click', false);
            });
            const nodeItem = e.item;
            // 设置目标节点的 click 状态 为 true
            graph.setItemState(nodeItem, 'click', true);
        });
        // 监听鼠标点击节点
        graph.on('edge:click', (e) => {
            // 先将所有当前有 click 状态的边的 click 状态置为 false
            const clickEdges = graph.findAllByState('edge', 'click');
            clickEdges.forEach((ce) => {
                graph.setItemState(ce, 'click', false);
            });
            const edgeItem = e.item;
            // 设置目标边的 click 状态 为 true
            graph.setItemState(edgeItem, 'click', true);
        });
        // 监听鼠标点击节点
        graph.on('combo:click', (e) => {
            // 先将所有当前有 click 状态的节点的 click 状态置为 false
            const clickNodes = graph.findAllByState('combo', 'click');
            clickNodes.forEach((cn) => {
                graph.setItemState(cn, 'click', false);
            });
            const nodeItem = e.item;
            // 设置目标节点的 click 状态 为 true
            graph.setItemState(nodeItem, 'click', true);
        });
        //  点击画布取消 node 和 edge 的选中状态
        graph.on('canvas:click', (e) => {
            console.log(`画布点击了,清除全部的选中状态`)
            console.log({ e })
            //  取消 node 选中
            const clickNodes = graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
                graph.setItemState(cn, 'click', false);
            });
            //  取消 edge 选中
            const clickEdges = graph.findAllByState('edge', 'click');
            clickEdges.forEach((ce) => {
                graph.setItemState(ce, 'click', false);
            });
            //  取消 combo 选中
            const clickCombo = graph.findAllByState('combo', 'click');
            clickCombo.forEach((cn) => {
                graph.setItemState(cn, 'click', false);
            });
        })
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