<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'GpuSeven',
    mounted() {
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            animate: true,
            defaultNode: {
                size: 10,
                style: {
                    lineWidth: 2,
                    stroke: '#5B8FF9',
                    fill: '#C6E5FF',
                },
            },
            defaultEdge: {
                size: 1,
                color: '#e2e2e2',
                style: {
                    endArrow: {
                        path: 'M 0,0 L 8,4 L 8,-4 Z',
                        fill: '#e2e2e2',
                    },
                },
            },
            layout: {
                type: 'gForce',
                gpuEnabled: true,
                maxIteration: 1000,
            },
        });

        fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
            .then((res) => res.json())
            .then((data) => {
                graph.data(data);
                graph.render();
            });

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
            };

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