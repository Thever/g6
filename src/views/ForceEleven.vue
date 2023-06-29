<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'ForceEleven',
    mounted() {
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            layout: {
                type: 'gForce',
                gravity: 10,
                edgeStrength: 100,
                nodeStrength: 100,
            },
            defaultNode: {
                size: 15,
            },
            fitView: true,
            modes: {
                default: ['drag-canvas', 'zoom-canvas']
            }
        });

        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
            .then((res) => res.json())
            .then((data) => {
                graph.data({
                    nodes: data.nodes,
                    edges: data.edges.map(function (edge, i) {
                        edge.id = 'edge' + i;
                        return Object.assign({}, edge);
                    }),
                });
                graph.render();

                // eslint-disable-next-line no-unused-vars
                graph.on('node:dragstart', function (e) {
                    const forceLayout = graph.get('layoutController').layoutMethods[0];
                    forceLayout.stop()
                });

                graph.on('node:drag', function (e) {
                    refreshDragedNodePosition(e);
                    graph.layout()
                });

                if (typeof window !== 'undefined')
                    window.onresize = () => {
                        if (!graph || graph.get('destroyed')) return;
                        if (!container || !container.scrollWidth || !container.scrollHeight) return;
                        graph.changeSize(container.scrollWidth, container.scrollHeight);
                    };
            });

        function refreshDragedNodePosition(e) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
            model.x = e.x;
            model.y = e.y;
        }
    }
}
</script>

<style>
#container {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>