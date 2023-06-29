<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'ForceThree',
    mounted() {
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
            },
            layout: {
                type: 'forceAtlas2',
                preventOverlap: true,
                kr: 10,
                center: [250, 250],
            },
            defaultNode: {
                size: 20,
            },
        });

        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
            .then((res) => res.json())
            .then((data) => {
                data.nodes.forEach(node => {
                    node.x = Math.random() * 1;
                });
                // eslint-disable-next-line no-unused-vars
                graph.on('afterlayout', e => {
                    graph.fitView()
                })
                graph.data(data);
                graph.render();
            });
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