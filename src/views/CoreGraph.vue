<template>
    <div>
        <p>Graph 对象的生命周期为：初始化 —> 加载数据 —> 渲染 —> 更新 —> 销毁。</p>
        <div id="CoreGraph"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreGraph",
    mounted() {
        // 实例化 Minimap 插件
        const minimap = new G6.Minimap({
            size: [100, 100],
            className: "minimap",
            type: "delegate",
        });

        // 实例化 Grid 插件
        const grid = new G6.Grid();
        // 定义数据源
        const data = {
            // 点集
            nodes: [
                {
                    id: 'node1',
                    x: 100,
                    y: 200,
                },
                {
                    id: 'node2',
                    x: 300,
                    y: 200,
                },
            ],
            // 边集
            edges: [
                // 表示一条从 node1 节点连接到 node2 节点的边
                {
                    source: 'node1',
                    target: 'node2',
                },
            ],
        };

        // 创建 G6 图实例
        const graph = new G6.Graph({
            container: 'CoreGraph', // 指定图画布的容器 id，与第 9 行的容器对应
            // 画布宽高
            width: 800,
            height: 600,
            //  渲染画布
            renderer: 'canvas', // 默认：'canvas'，可选项：'canvas' / 'svg' , canvas 渲染性能高于 svg, 但是用 svg 渲染支持在自定义节点/边时使用 'dom' 图形(定制样式)
            //  自适应画布
            fitView: false, // 类型：Boolean；默认：'false'。图是否自适应画布。
            fitViewPadding: 0, //  类型：Number | Array；默认：0。图自适应画布时的四周留白像素值。fitView 为 true 时生效。
            fitCenter: false, // 类型：Boolean；默认：'false'。是否平移图使其中心对齐到画布中心。v3.5.1 后支持。
            //  全局元素配置
            // 节点在默认状态下的样式配置（style）和其他配置
            // defaultNode: {
            //     size: 30, //  节点大小
            //     // 节点样式配置
            //     style: {
            //         fill: 'steelblue', // 节点填充色
            //         stroke: '#666', // 节点描边色
            //         lineWidth: 1, // 节点描边粗细
            //     },
            //     // 节点上的标签文本配置
            //     labelCfg: {
            //         // 节点上的标签文本样式配置
            //         style: {
            //             fill: "#fff", // 节点标签文字颜色
            //         },
            //     },
            // },
            // // 边在默认状态下的样式配置（style）和其他配置
            // defaultEdge: {
            //     // 边样式配置
            //     style: {
            //         opacity: 0.6, // 边透明度
            //         stroke: 'grey', // 边描边颜色
            //     },
            //     // 边上的标签文本配置
            //     labelCfg: {
            //         autoRotate: true, // 边上的标签文本根据边的方向旋转
            //     },
            // },
            // // 节点在各状态下的样式
            // nodeStateStyles: {
            //     // hover 状态为 true 时的样式
            //     hover: {
            //         fill: "lightsteelblue",
            //     },
            //     // click 状态为 true 时的样式
            //     click: {
            //         stroke: "#000",
            //         lineWidth: 3,
            //     },
            // },
            // // 边在各状态下的样式
            // edgeStateStyles: {
            //     // click 状态为 true 时的样式
            //     click: {
            //         stroke: "steelblue",
            //     },
            // },

            //  布局相关
            // layout: {
            //     type: "force", // 设置布局算法为 force
            //     linkDistance: 100, // 设置边长为 100
            //     preventOverlap: true, // 设置防止重叠
            //     nodeStrength: -30, //  节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
            //     edgeStrength: 0.1, //  边的作用力，范围是 0 到 1，默认根据节点的出入度自适应
            // },

            //  交互行为相关
            modes: {
                default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
            },

            //  动画相关
            animate: true, // Boolean，可选，全局变化时否使用动画过渡

            //  插件
            plugins: [minimap, grid], // 将 Minimap 和 Grid 插件的实例配置到图上
        });
        // // 读取数据
        // graph.data(data);
        // // 渲染图
        // graph.render();

        //  使用read方法来读取渲染数据
        graph.read(data)
    },
};
</script>

<style scoped>
#CoreGraph {
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