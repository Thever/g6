<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'ForceFour',
    mounted() {
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            layout: {
                type: 'force',
                preventOverlap: true,
            },
            modes: {
                default: ['drag-canvas'],
            },
        });

        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
            .then((res) => res.json())
            .then((data) => {
                const nodes = data.nodes;
                // randomize the node size
                nodes.forEach((node) => {
                    node.size = Math.random() * 30 + 5;
                });
                graph.data({
                    nodes,
                    edges: data.edges.map(function (edge, i) {
                        edge.id = 'edge' + i;
                        return Object.assign({}, edge);
                    }),
                });
                graph.render();

                graph.on('node:dragstart', function (e) {
                    graph.layout();
                    refreshDragedNodePosition(e);
                });
                graph.on('node:drag', function (e) {
                    const forceLayout = graph.get('layoutController').layoutMethods[0];
                    forceLayout.execute();
                    refreshDragedNodePosition(e);
                });
                graph.on('node:dragend', function (e) {
                    e.item.get('model').fx = null;
                    e.item.get('model').fy = null;
                });
            });

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
            };

        function refreshDragedNodePosition(e) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
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