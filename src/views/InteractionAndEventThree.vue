<template>
    <div class="set-block">
        <p>自定义交互 Behavior 可参考: https://g6.antv.antgroup.com/manual/middle/states/custom-behavior</p>
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'InteractionAndEventThree',
    mounted() {
        //  自定义交互 registerBehavior
        G6.registerBehavior('activate-node', {
            getDefaultCfg() {
                return {
                    multiple: true
                };
            },
            getEvents() {
                return {
                    'node:click': 'onNodeClick',
                    'canvas:click': 'onCanvasClick'
                };
            },
            onNodeClick(e) {
                const graph = this.graph;
                const item = e.item;
                if (item.hasState('active')) {
                    graph.setItemState(item, 'active', false);
                    return;
                }
                // this 上即可取到配置，如果不允许多个 'active'，先取消其他节点的 'active' 状态
                if (!this.multiple) {
                    this.removeNodesState();
                }
                // 置点击的节点状态 'active' 为 true
                graph.setItemState(item, 'active', true);
            },
            onCanvasClick(e) {
                // shouldUpdate 可以由用户复写，返回 true 时取消所有节点的 'active' 状态，即将 'active' 状态置为 false
                if (this.shouldUpdate(e, self)) {
                    this.removeNodesState();
                }
            },
            removeNodesState() {
                graph.findAllByState('node', 'active').forEach(node => {
                    graph.setItemState(node, 'active', false);
                });
            }
        });
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
            container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
            // 画布宽高
            width: 1000,
            height: 800,
            //  使用behavior
            modes: {
                default: ['activate-node']
            },
            //  设置nodeState时的样式状态
            nodeStateStyles:{
                //  active状态样式
                active:{
                    fill: 'red'
                }
            }
        });
        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();
    }
}
</script>

<style>
.set-block {
    width: 1000px;
    height: auto;
    display: block;
    overflow: hidden;
    margin: 0 auto;
}

#container {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>