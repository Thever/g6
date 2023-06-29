<template>
    <div class="root">
        <div id="headPanel">
            <span class="logo">G6 入门教程 - 拖拽节点</span>
            <i class="gb-toggle-btn" />
        </div>
        <!-- 左侧功能栏 -->
        <item-panel @canvas-add-node="canvasAddNode" />
        <!-- canvas 挂载节点 -->
        <!-- 不用自己计算画布拖拽缩放偏移量了，直接从event对象里获取xy，就是当前坐标在画布上的位置了 -->
        <!-- event.x event.y -->
        <div id="graph" />
    </div>
</template>
<script>
import G6 from '@antv/g6';
import ItemPanel from './ItemPanel';

export default {
    components: {
        ItemPanel,
    },
    data() {
        return {
            graph: null,
            canvasOffset: {
                x: 0,
                y: 0,
                dx: 0,
                dy: 0,
            },
        };
    },
    mounted() {
        // 创建画布
        this.$nextTick(() => {
            this.createGraphic();
        });
    },
    beforeDestroy() {
        //  路由变更删除画布
        this.graph.destroy();
    },
    methods: {
        //  画布绘制
        createGraphic() {
            const graph = new G6.Graph({
                container: document.getElementById('graph'),
                width: window.innerWidth - 80,
                height: window.innerHeight - 80,
                defaultNode: {
                    type: 'rect',
                },
                defaultEdge: {
                    type: 'polyline',
                },
                fitCenter: true,
                fitView: true,
                modes: {
                    // default: ['drag-canvas', 'zoom-canvas'],
                    default: ['drag-canvas', 'drag-node'],
                },
            });

            this.graph = graph;
            this.bindEvents();
        },
        bindEvents() {
            //  获取画布
            const canvas = document.getElementById('graph').children[0];

            // 拖拽开始事件
            this.graph.on('dragstart', e => {
                console.log(`dragstart e`)
                console.log(e)
                this.canvasOffset.x = e.clientX;
                this.canvasOffset.y = e.clientY;
            });

            // 拖拽结束事件
            this.graph.on('dragend', e => {
                //  通过计算
                this.canvasOffset.dx = this.canvasOffset.dx + e.clientX - this.canvasOffset.x;
                this.canvasOffset.dy = this.canvasOffset.dy + e.clientY - this.canvasOffset.y;
                //  直接获取
                this.canvasOffset.dx = e.x;
                this.canvasOffset.dy = e.y;
                canvas.setAttribute('dx', this.canvasOffset.dx);
                canvas.setAttribute('dy', this.canvasOffset.dy);
            });
        },
        canvasAddNode(e) {
            const shape = e.target.getAttribute('data-shape');

            this.graph.addItem('node', {
                label: shape,
                type: shape,
                //  这里-40是因为添加节点后画布会偏移
                x: e.clientX - this.canvasOffset.dx - 40,
                y: e.clientY - this.canvasOffset.dy - 40,
                size: [120, 40],
            });
        },
    },
};
</script>
<style scoped>
#graph{
    display:block;
    width:calc( 100vw - 80px);
    height:calc( 100vh - 80px);
    background:skyblue;
    float:left;
}
</style>