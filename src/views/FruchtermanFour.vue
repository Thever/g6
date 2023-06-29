<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'FruchtermanFour',
    mounted() {
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = (container.scrollHeight || 500) - 20;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML =
            'Doing layout... web-worker is enabled in this demo, so the layout will not block the page.';
        container.appendChild(descriptionDiv);

        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            layout: {
                type: 'fruchterman',
                maxIteration: 1000,
                gravity: 1,
                workerEnabled: true,
            },
            animate: true,
            defaultNode: {
                size: 10,
            },
            defaultEdge: {
                size: 1,
            },
        });

        graph.on('afterlayout', () => {
            descriptionDiv.innerHTML = 'Done!';
        });

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
            };

        fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
            .then((res) => res.json())
            .then((data) => {
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
    /* 保证tooltips正常展示 */
    position: relative;
}
</style>