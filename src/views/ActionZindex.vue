<template>
    <div>
        <p>操作实例边，点的层级后要用graph.paint()方法重新绘制才能生效</p>
        <p>g6 4版本并不支持toFront()和toBack()方法</p>
        <p>可以通过获取对象实例来对对象进行操作：</p>
        <ul>
            <li>nodes: const nodes = graph.getNodes()</li>
            <li>edges: const edges = graph.getEdges()</li>
            <li>combos: const combos = graph.getCombos()</li>
        </ul>
        <div id="ActionZindex"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "ActionZindex",
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
                {
                    id: 'node2',
                    x: 150,
                    y: 150,
                    size: 20,
                },
                {
                    id: 'node3',
                    x: 150,
                    y: 250,
                    size: 20,
                },
                {
                    id: 'node4',
                    x: 150,
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
                {
                    id: 'edge1',
                    source: 'node2',
                    target: 'node3',
                },
            ],
        };

        // 实例化图
        const graph = new G6.Graph({
            container: 'ActionZindex',
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

        // 获取图上的所有边实例
        const nodes = graph.getNodes();


        // 遍历边实例，将所有边提前。
        nodes.forEach(node => {
            // 将节点实例 node 放置到其父级 group 的上方
            node.toFront();
        });
        // 更改层级后需要重新绘制图
        graph.paint();

        // 鼠标进入节点事件
        graph.on('edge:mouseenter', ev => {
            console.log('edge:mouseenter')
            // 获得鼠标当前目标边
            const edge = ev.item;
            // 该边的起始点
            const source = edge.getSource();
            // 该边的结束点
            const target = edge.getTarget();
            // 先将边提前，再将端点提前。这样该边两个端点还是在该边上层，较符合常规。
            edge.toFront();
            source.toFront();
            target.toFront();
            // 注意：必须调用以根据新的层级顺序重绘
            graph.paint();
        });

        // eslint-disable-next-line no-unused-vars
        graph.on('edge:mouseleave', ev => {
            console.log('edge:mouseleave')
            // 获得图上所有边实例
            const edges = graph.getEdges();
            // 遍历边，将所有边的层级放置在后方，以恢复原样
            edges.forEach(edge => {
                // 将边实例 edge 提前到其父级 group 的下方
                edge.toBack();
            });
            // 注意：必须调用以根据新的层级顺序重绘
            graph.paint();
        });

        graph.on('node:mouseenter', ev => {
            console.log('node:mouseenter')
            // 获得鼠标当前目标节点
            const node = ev.item;
            // 获取该节点的所有相关边
            const edges = node.getEdges();
            // 遍历相关边，将所有相关边提前，再将相关边的两个端点提前，以保证相关边的端点在边的上方常规效果
            edges.forEach(edge => {
                //  实例边放到 group 上方
                edge.toFront();
                //  实例边 source 节点放到 group 上方
                edge.getSource().toFront();
                //  实例边 target 节点放到 group 上方
                edge.getTarget().toFront();
            });
            // 注意：必须调用以根据新的层级顺序重绘
            graph.paint();
        });

        // eslint-disable-next-line no-unused-vars
        graph.on('node:mouseleave', ev => {
            console.log('node:mouseleave')
            // 获得图上所有边实例
            const edges = graph.getEdges();
            // 遍历边，将所有边的层级放置在后方，以恢复原样
            edges.forEach(edge => {
                //  实例边 edge 放到 group 下方
                edge.toBack();
            });
            // 注意：必须调用以根据新的层级顺序重绘
            graph.paint();
        });
    },
};
</script>

<style scoped>
#ActionZindex {
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
ul{
    text-align:center;
}
</style>