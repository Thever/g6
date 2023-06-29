<template>
    <div>
        <p>数据的样式优先级大于default设置的属性，可以通过graph.updateItem()方法来设置实例化之后的样式</p>
        <div id="ActionStyle"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "ActionStyle",
    mounted() {
        const data = {
            nodes: [
                {
                    id: 'node1',
                    label: 'node1',
                    style: {
                        fill: '#fff',
                        fontSize: 12,
                        //  数据中边框设置为红色
                        stroke: 'red'
                    },
                },
            ],
        };

        const graph = new G6.Graph({
            container: 'ActionStyle',
            width: 1000,
            height: 800,
            defaultNode: {
                type: 'circle',
                style: {
                    fill: '#fff',
                    fontSize: 14,
                },
            },
            defaultEdge: {
                type: 'line-with-arrow',
                style: {
                    fill: '#fff',
                    fontSize: 14,
                },
            },
        });

        // graph.data(data);
        // graph.render();
        graph.read(data)

        //  将边框设置为蓝色
        graph.updateItem('node1', {
            // 节点的样式
            style: {
                stroke: 'blue',
            },
        });
    },
};
</script>

<style scoped>
#ActionStyle {
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