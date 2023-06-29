<template>
    <div>
        <select id="selector">
            <option value="default">默认模式</option>
            <option value="addNode">点击添加节点</option>
            <option value="addEdge">点击添加连线</option>
        </select>
        <div id="mountNode"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
    data() {
        return {
            addNodeList: [
                { word: '', val: 'rect'}
            ]
        }
    },
    mounted() {
        const data = {
            nodes: [{
                id: 'node1',
                x: 100,
                y: 200
            }, {
                id: 'node2',
                x: 300,
                y: 200
            }, {
                id: 'node3',
                x: 300,
                y: 300
            }],
            edges: [{
                id: 'edge1',
                target: 'node2',
                source: 'node1'
            }]
        };


        const graph = new G6.Graph({
            container: 'mountNode',
            width: 500,
            height: 500,
            modes: {
                default: ['drag-node'],
            },
        });

        graph.data(data);
        graph.render();

        document.getElementById('selector').addEventListener('change', e => {
            const value = e.target.value;
            graph.setMode(value);
        });
    },
};
</script>

<style scoped>
.select-wrap {
    position: absolute;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    max-height: 160px;
    overflow: auto;
}

.select-wrap li {
    margin: 5px 0;
    padding: 0 10px;
    cursor: pointer;
}

.select-wrap li :hover {
    background: #f7f7f7;
}
#mountNode{
    width:500px;
    height:500px;
    background:skyblue;
}
</style>
