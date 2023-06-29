<template>
    <div>
        <p>node 和 edge 动画效果参考：<a href="https://g6.antv.antgroup.com/examples#scatter-viewport">https://g6.antv.antgroup.com/examples#scatter-viewport</a></p>
        <div id="mountNode6"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "IntroductionViewSix",
    mounted() {
        // 实例化 Minimap 插件
        const minimap = new G6.Minimap({
            size: [100, 100],
            className: "minimap",
            type: "delegate",
        });

        // 实例化 Grid 插件
        const grid = new G6.Grid();
        
        const graph = new G6.Graph({
            container: "mountNode6", //  渲染容器
            width: 800, //  宽度
            height: 600, //  高度
            /* 使用自带的布局方式就不想要指定兼容画布 */
            // fitView: true,  //  是否将图适配到画布中
            // fitViewPadding: [20, 40, 50, 20],   //  画布上四周的留白宽度
            //  指定布局方式
            layout: {
                type: "force", // 设置布局算法为 force
                linkDistance: 100, // 设置边长为 100
                preventOverlap: true, // 设置防止重叠
                nodeStrength: -30, //  节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
                edgeStrength: 0.1, //  边的作用力，范围是 0 到 1，默认根据节点的出入度自适应
            },
            // 节点在默认状态下的样式配置（style）和其他配置
            defaultNode: {
                size: 30, //  节点大小
                // 节点样式配置
                // style: {
                //     fill: 'steelblue', // 节点填充色
                //     stroke: '#666', // 节点描边色
                //     lineWidth: 1, // 节点描边粗细
                // },
                // 节点上的标签文本配置
                labelCfg: {
                    // 节点上的标签文本样式配置
                    style: {
                        fill: "#fff", // 节点标签文字颜色
                    },
                },
            },
            // 边在默认状态下的样式配置（style）和其他配置
            defaultEdge: {
                // 边样式配置
                // style: {
                //     opacity: 0.6, // 边透明度
                //     stroke: 'grey', // 边描边颜色
                // },
                // 边上的标签文本配置
                labelCfg: {
                    autoRotate: true, // 边上的标签文本根据边的方向旋转
                },
            },
            // 节点在各状态下的样式
            nodeStateStyles: {
                // hover 状态为 true 时的样式
                hover: {
                    fill: "lightsteelblue",
                },
                // click 状态为 true 时的样式
                click: {
                    stroke: "#000",
                    lineWidth: 3,
                },
            },
            // 边在各状态下的样式
            edgeStateStyles: {
                // click 状态为 true 时的样式
                click: {
                    stroke: "steelblue",
                },
            },
            // 内置交互
            modes: {
                default: [
                    "drag-canvas",
                    "zoom-canvas",
                    "drag-node",
                    // 点提示框交互工具的配置
                    {
                        type: "tooltip",
                        formatText(model) {
                            const text =
                                "label: " + model.label + "<br/> class: " + model.class;
                            return text;
                        },
                        // eslint-disable-next-line no-unused-vars
                        shouldUpdate: (e) => {
                            return true;
                        },
                    },
                    // 边提示框交互工具的配置
                    {
                        type: "edge-tooltip",
                        formatText(model) {
                            const text =
                                "source: " +
                                model.source +
                                "<br/> target: " +
                                model.target +
                                "<br/> weight: " +
                                model.weight;
                            return text;
                        },
                        // eslint-disable-next-line no-unused-vars
                        shouldUpdate: (e) => {
                            return true;
                        },
                    },
                ],
            },
            plugins: [minimap, grid], // 将 Minimap 和 Grid 插件的实例配置到图上
            fitCenter: true,    //  居中显示
            animate: true, // Boolean，可选，全局变化时否使用动画过渡
        });
        //  async异步请求韩阿虎
        const main = async () => {
            //  获取数据
            const response = await fetch(
                "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
            );
            const remoteData = await response.json();
            //  获取节点
            const nodes = remoteData.nodes;
            //  获取边
            const edges = remoteData.edges;
            //  处理节点
            nodes.forEach((node) => {
                //  node 添加 style 属性
                if (!node.style) {
                    node.style = {};
                }
                //  统一style属性
                node.style.lineWidth = 1;
                node.style.stroke = "#666";
                node.style.fill = "steelblue";
                //  根据 class 来生成 node 类型
                switch (node.class) {
                    case "c0": {
                        node.type = "circle";
                        break;
                    }
                    case "c1": {
                        node.type = "rect";
                        node.size = [35, 20];
                        break;
                    }
                    case "c2": {
                        node.type = "ellipse";
                        node.size = [35, 20];
                        break;
                    }
                }
            });
            //  处理边
            edges.forEach((edge) => {
                //  edge 添加 style 属性
                if (!edge.style) {
                    edge.style = {};
                }
                // edge 统一 style
                edge.style.lineWidth = edge.weight;
                edge.style.opacity = 0.6;
                edge.style.stroke = "grey";
            });
            // console.log({ remoteData })
            graph.data(remoteData);
            graph.render();

            // 监听鼠标进入节点
            graph.on("node:mouseenter", (e) => {
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 为 true
                graph.setItemState(nodeItem, "hover", true);
            });
            // 监听鼠标离开节点
            graph.on("node:mouseleave", (e) => {
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 false
                graph.setItemState(nodeItem, "hover", false);
            });
            // 监听鼠标点击节点
            graph.on("node:click", (e) => {
                // 先将所有当前有 click 状态的节点的 click 状态置为 false
                const clickNodes = graph.findAllByState("node", "click");
                clickNodes.forEach((cn) => {
                    graph.setItemState(cn, "click", false);
                });
                const nodeItem = e.item;
                // 设置目标节点的 click 状态 为 true
                graph.setItemState(nodeItem, "click", true);
            });
            // 监听鼠标点击节点
            graph.on("edge:click", (e) => {
                // 先将所有当前有 click 状态的边的 click 状态置为 false
                const clickEdges = graph.findAllByState("edge", "click");
                clickEdges.forEach((ce) => {
                    graph.setItemState(ce, "click", false);
                });
                const edgeItem = e.item;
                // 设置目标边的 click 状态 为 true
                graph.setItemState(edgeItem, "click", true);
            });
            //  点击画布取消 node 和 edge 的选中状态
            graph.on("canvas:click", (e) => {
                console.log(`画布点击了`);
                console.log({ e });
                //  取消 node 选中
                const clickNodes = graph.findAllByState("node", "click");
                clickNodes.forEach((cn) => {
                    graph.setItemState(cn, "click", false);
                });
                //  取消 edge 选中
                const clickEdges = graph.findAllByState("edge", "click");
                clickEdges.forEach((ce) => {
                    graph.setItemState(ce, "click", false);
                });
            });
        };
        main();
    },
};
</script>

<style scoped>
#mountNode6 {
    width: 800px;
    height: 600px;
    display: block;
    border: 1px solid skyblue;
    margin: 0 auto;
    /* 不添加会导致tooltip错位 */
    position:relative;
}

/* 插件样式 */
/* .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
} */
p{
    text-align: center;
}
p a{
    display:inline;
}
</style>