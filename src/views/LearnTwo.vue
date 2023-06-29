<template>
    <div class="set-block">
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'LearnThree',
    mounted() {
        this.createGraphic()
    },
    methods: {
        createGraphic() {
            const graph = new G6.Graph({
                container: document.getElementById('container'),
                width: window.innerWidth,
                height: window.innerHeight - 40,
                fitView: true,
                fitViewPadding: [50],
                layout: {
                    type: 'dagre',
                },
                defaultNode: {
                    type: 'circle',
                    style: {
                        r: 30,
                    },
                },
                defaultEdge: {
                    type: 'line',
                },
                nodeStateStyles: {
                    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                    hover: {
                        fill: 'lightsteelblue',
                    },
                    // 鼠标点击节点，即 click 状态为 true 时的样式
                    click: {
                        stroke: 'steelblue',
                        lineWidth: 3,
                    },
                },
                modes: {
                    default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'brush-select'],
                },
            });

            const data = {
                nodes: [
                    {
                        id: '1',
                        label: 'node 1',
                    },
                    {
                        id: '2',
                        label: 'node 2',
                    },
                    {
                        id: '3',
                        label: 'node 3',
                    },
                    {
                        id: '4',
                        label: 'node 4',
                    },
                ],
                edges: [
                    {
                        source: '1',
                        target: '2',
                    },
                    {
                        source: '1',
                        target: '3',
                    },
                    {
                        source: '2',
                        target: '4',
                    },
                    {
                        source: '3',
                        target: '4',
                    },
                ],
            };

            this.graph = graph;
            this.graph.read(data); // 读取数据

            // canvas 点击事件
            this.graph.on('canvas:click', e => {
                console.log('graph on click', e);
                const nodes = this.graph.findAllByState('node', 'click');

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'click', false);
                });
            });

            // 节点点击事件
            this.graph.on('node:click', e => {
                console.log('node on click', e);
                const nodes = this.graph.findAllByState('node', 'click');

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'click', false);
                });
                this.graph.setItemState(e.item, 'click', true);
            });

            // 节点鼠标事件
            this.graph.on('node:mouseenter', e => {
                this.graph.setItemState(e.item, 'hover', true);
            });
            this.graph.on('node:mouseleave', e => {
                this.graph.setItemState(e.item, 'hover', false);
            });
        },
    }
}
</script>

<style>
.set-block {
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    justify-content: center;
}

#container {
    width: 100%;
    height: calc(100vh - 40px);
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>