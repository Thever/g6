<template>
    <div class="set-block">
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
</div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'LearnOne',
    mounted() {
        const graph = new G6.Graph({
            container: document.getElementById('container'),
            width: window.innerWidth,
            height: window.innerHeight,
            layout: {
                type: 'dagre',
            },
            defaultNode: {
                type: 'rect',
            },
            defaultEdge: {
                type: 'polyline',
            },
            fitView: true,
            modes: {
                default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
            }
        });

        const data = {
            nodes: [
                {
                    id: '1',
                    label: 'alps_file1',
                },
                {
                    id: '2',
                    label: 'alps_file2',
                },
                {
                    id: '3',
                    label: 'alps_file3',
                },
                {
                    id: '4',
                    label: 'sql_file1',
                },
                {
                    id: '5',
                    label: 'sql_file2',
                },
                {
                    id: '6',
                    label: 'feature_etl_1',
                },
                {
                    id: '7',
                    label: 'feature_etl_1',
                },
                {
                    id: '8',
                    label: 'feature_extractor',
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
                {
                    source: '4',
                    target: '5',
                },
                {
                    source: '5',
                    target: '6',
                },
                {
                    source: '6',
                    target: '7',
                },
                {
                    source: '6',
                    target: '8',
                },
            ],
        };

        graph.read(data);
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