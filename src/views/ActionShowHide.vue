<template>
    <div>
        <p>g6支持直接控制node,edge和combo的显隐</p>
        <p>node: nodeItem.show() nodeItem.hide()</p>
        <p>edge: edgeItem.show() edgeItem.hide()</p>
        <p>combo: comboItem.show comboItem.hide()</p>
        <div id="ActionShowHide"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "ActionShowHide",
    mounted() {
        // 数据源
        const data = {
            nodes: [
                {
                    id: 'node0',
                    x: 100,
                    y: 100,
                    size: 20,
                },
                {
                    id: 'node1',
                    x: 200,
                    y: 200,
                    size: 20,
                },
            ],
            edges: [
                {
                    id: 'edge0',
                    source: 'node0',
                    target: 'node1',
                },
            ],
        };

        // 实例化图
        const graph = new G6.Graph({
            container: 'ActionShowHide',
            width: 800,
            height: 600,
            // 为方便演示，加粗边
            defaultEdge: {
                style: {
                    lineWidth: 2,
                },
            },
        });

        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();

        // 鼠标点击节点，隐藏该节点
        graph.on('node:click', (ev) => {
            const node = ev.item;
            console.log('before hide(), the nodevisible = ', node.get('visible'));
            node.hide();
            console.log('after hide(), the node visible = ', node.get('visible'));
        });

        // 鼠标点击边，隐藏该边
        graph.on('edge:click', (ev) => {
            const edge = ev.item;
            console.log('before hide(), the edge visible = ', edge.get('visible'));
            edge.hide();
            console.log('after hide(), the edge visible = ', edge.get('visible'));
        });

        // 鼠标点击画布，显示所有节点和边
        // eslint-disable-next-line no-unused-vars
        graph.on('canvas:click', (ev) => {
            const nodes = graph.getNodes();
            const edges = graph.getEdges();
            nodes.forEach((node) => {
                node.show();
            });
            edges.forEach((edge) => {
                edge.show();
            });
        });
    },
};
</script>

<style scoped>
#ActionShowHide {
    width: 800px;
    height: 600px;
    display: block;
    border: 1px solid skyblue;
    margin: 0 auto;
    /* 不添加会导致tooltip错位 */
    position: relative;
}

p {
    text-align: center;
}

p a {
    display: inline;
}
</style>