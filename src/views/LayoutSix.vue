<template>
    <!-- 渲染的画布容器 -->
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'LayoutSix',
    mounted() {
        const data = {
            nodes: [
                {
                    id: '0',
                    label: '0',
                },
                {
                    id: '1',
                    label: '1',
                },
                {
                    id: '2',
                    label: '2',
                },
                {
                    id: '3',
                    label: '3',
                },
                {
                    id: '4',
                    label: '4',
                },
                {
                    id: '5',
                    label: '5',
                },
                {
                    id: '6',
                    label: '6',
                },
                {
                    id: '7',
                    label: '7',
                },
                {
                    id: '8',
                    label: '8',
                },
                {
                    id: '9',
                    label: '9',
                },
            ],
            edges: [
                {
                    source: '0',
                    target: '1',
                },
                {
                    source: '0',
                    target: '2',
                },
                {
                    source: '0',
                    target: '3',
                },
                {
                    source: '0',
                    target: '4',
                },
                {
                    source: '0',
                    target: '5',
                },
                {
                    source: '0',
                    target: '7',
                },
                {
                    source: '0',
                    target: '8',
                },
                {
                    source: '0',
                    target: '9',
                },
                {
                    source: '2',
                    target: '3',
                },
                {
                    source: '4',
                    target: '5',
                },
                {
                    source: '4',
                    target: '6',
                },
                {
                    source: '5',
                    target: '6',
                },
            ],
        };

        const tipDiv = document.createElement('div');
        const container = document.getElementById('container');
        container.appendChild(tipDiv);
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            layout: {
                type: 'force',
                preventOverlap: true,
                nodeSize: 20,
            },
            modes: {
                default: ['drag-node'],
            },
        });

        graph.on('beforelayout', function () {
            tipDiv.innerHTML =
                'Doing force-directed layout... the text will be changed after the layout being done.';
        });
        graph.on('afterlayout', function () {
            tipDiv.innerHTML = 'Done!';
        });

        graph.data(data);
        graph.render();

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