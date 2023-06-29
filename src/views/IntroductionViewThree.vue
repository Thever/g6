<template>
    <div id="mountNode3"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'IntroductionViewThree',
    mounted() {
        const graph = new G6.Graph({
            container: 'mountNode3', //  渲染容器
            width: 800, //  宽度
            height: 600,    //  高度
            /* 使用自带的布局方式就不想要指定兼容画布 */
            // fitView: true,  //  是否将图适配到画布中
            // fitViewPadding: [20, 40, 50, 20],   //  画布上四周的留白宽度
            //  指定布局方式
            layout: {
                type: 'force', // 设置布局算法为 force
                linkDistance: 100, // 设置边长为 100
                preventOverlap: true, // 设置防止重叠
            },
            // 节点在默认状态下的样式配置（style）和其他配置
            defaultNode: {
                size: 30,   //  节点大小
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
                        fill: '#fff',   // 节点标签文字颜色
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
                    autoRotate: true,   // 边上的标签文本根据边的方向旋转
                },
            },
        });
        //  async异步请求韩阿虎
        const main = async () => {
            //  获取数据
            const response = await fetch(
                'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
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
                node.style.stroke = '#666';
                node.style.fill = 'steelblue';
                //  根据 class 来生成 node 类型
                switch (node.class) {
                    case 'c0': {
                        node.type = 'circle';
                        break;
                    }
                    case 'c1': {
                        node.type = 'rect';
                        node.size = [35, 20];
                        break;
                    }
                    case 'c2': {
                        node.type = 'ellipse';
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
                edge.style.stroke = 'grey';
            });
            // console.log({ remoteData })
            graph.data(remoteData);
            graph.render();
        };
        main();
    }
}
</script>

<style scoped>
#mountNode3 {
    width: 800px;
    height: 600px;
    display: block;
    border: 1px solid skyblue;
    margin: 0 auto;
}
</style>