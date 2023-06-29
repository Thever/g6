<template>
    <div class="show-content">
        <p>可以设置全局的默认样式，也可以在对应数据中设置样式，也可以再实例化后</p>
        <div id="CoreStyle"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreStyle",
    mounted() {
        const data = {
            nodes: [
                {
                    x: 100,
                    y: 100,
                    id: 'node1',
                    label: 'node1',
                    //  数据中指定样式
                    labelCfg: {
                        style: {
                            fill: 'red',
                            fontSize: 12,
                        },
                    },
                    style: {
                        lineWidth: 3,
                        //  描边渐变色
                        stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
                    }
                },
                {
                    x: 100,
                    y: 200,
                    id: 'node2',
                    label: 'node2',
                },
                {
                    x: 200,
                    y: 200,
                    id: 'node3',
                    label: 'node3',
                },
            ],
            edges: [
                {
                    id: 'a1',
                    source: 'node1',
                    target: 'node2'
                },
                {
                    id: 'a2',
                    source: 'node1',
                    target: 'node3'
                },
            ]
        };
        const graph = new G6.Graph({
            container: 'CoreStyle',
            width: 1000,
            height: 500,
            //  默认节点样式
            defaultNode: {
                labelCfg: {
                    position: 'left',
                    style: {
                        background: {
                            fill: '#ffffff',
                            stroke: 'green',
                            padding: [3, 2, 3, 2],
                            radius: 2,
                            lineWidth: 3,
                        },
                    },
                }
            },
            //  默认边样式
            defaultEdge: {
                labelCfg: {
                    autoRotate: true,
                    style: {
                        background: {
                            fill: '#ffffff',
                            stroke: '#000000',
                            padding: [2, 2, 2, 2],
                            radius: 2,
                        },
                    },
                }
            }
        })
        graph.data(data);
        graph.render();

        //  实例化后用方法更新样式
        // const node = graph.findById('node2')
        graph.updateItem('node2', {
            // 节点的样式
            style: {
                stroke: 'blue',
                //  天空渐变色
                fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
            },
            // 节点上文本的样式
            labelCfg: {
                style: {
                    fill: 'green',
                    fontSize: 12,
                },
            },
        });
    },
};
</script>

<style scoped>
#CoreStyle {
    width: 1000px;
    height: 500px;
    display: block;
    border: 1px solid skyblue;
    margin: 0 auto;
    /* 不添加会导致tooltip错位 */
    position: relative;
}

.show-content {
    width: 1000px;
    display: block;
    margin: 0 auto;
    text-align: left;
}

.show-img {
    display: flex;
}

.show-img div {
    display: block;
    overflow: hidden;
}
</style>