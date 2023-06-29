<template>
    <div class="root">
        <div id="headPanel">
            <span class="logo">G6 入门教程 - 节点连线</span>
        </div>
        <div class="workspace">
            <MaterialsComponent />
            <!-- canvas 挂载节点 -->
            <div id="graph"></div>
        </div>
    </div>
</template>
<script>
import G6 from '@antv/g6';
import MaterialsComponent from './components/MaterialsComponent';
//  原始节点
const data = {
    nodes: [{
        id: '0',
        x: 300,
        y: 200,
        label: '1',
    }, {
        id: '1',
        x: 300,
        y: 400,
        label: '2',
    }]
};
//  锚点的配置
const anchorPointMap = [
    //  锚点位置参考：https://g6.antv.antgroup.com/manual/middle/elements/nodes/anchorpoint
    //  左锚点
    [0, 0.5],
    // [0.25, 0.25],
    //  上锚点
    [0.5, 0],
    //  右锚点
    [1, 0.5],
    //  下锚点
    [0.5, 1],
];

export default {
    components: {
        MaterialsComponent,
    },
    data() {
        return {
            //  存储g6画布
            graph: null,
        };
    },
    mounted() {
        // 创建画布
        this.$nextTick(() => {
            this.createGraphic();
        });
    },
    beforeDestroy() {
        //  离开组件销毁画布
        this.graph.destroy();
    },
    methods: {
        //  创建画布
        createGraphic() {
            //  引入G6网格背景
            const grid = new G6.Grid();
            //  配置实例化G6画布
            const graph = new G6.Graph({
                //  渲染容器，设置宽高
                container: document.getElementById('graph'),
                width: window.innerWidth - 40,
                height: window.innerHeight - 40,
                //  定义全局默认节点样式
                defaultNode: {
                    //  矩形
                    type: 'rect',
                    //  锚点使用配置对象
                    anchorPoints: anchorPointMap,
                    //  节点样式
                    style: {
                        //  宽170
                        width: 170,
                        //  高50
                        height: 50,
                        //  圆角4
                        radius: 4,
                        //  填充色
                        fill: '#5cbc5a',
                        //  描边
                        stroke: '#5cbc5a',
                    },
                    //  标签配置
                    labelCfg: {
                        //  样式
                        style: {
                            //  标签大小
                            fontSize: 14,
                            //  文字颜色
                            fill: '#fff',
                        },
                    },
                },
                //  默认边
                defaultEdge: {
                    //  三阶贝塞尔曲线
                    type: 'cubic',
                    //  样式
                    style: {
                        //  描边色
                        stroke: '#ed6fb1',
                    },
                },
                //  交互模式
                modes: {
                    //  默认：拖拽节点，拖拽画布
                    default: ['drag-node', 'drag-canvas'],
                },
                //  插件：网格背景
                plugins: [grid],
            });
            //  将G6实例指向Vue本地变量，方便使用
            this.graph = graph;
            //  读取数据，渲染， read方法 === setData + render
            this.graph.read(data);
            // 绘制锚点
            this.drawAnchors();
            //  绑定事件
            this.bindEvents();
        },
        // 绘制可视锚点
        drawAnchors() {
            //  循环绘制节点
            this.graph.getNodes().forEach(item => {
                this.drawAnchor(item);
            });
        },
        //  绘制节点的方法
        drawAnchor(item) {
            //  从实例对象 model 属性中获取必要信息
            const { id, style: { width, height } } = item.get('model');
            //  获取实例上的group
            const group = item.get('group');
            //  目前根据配置信息只有4个锚点，后面如果是数据中带锚点的话注意修改循环次数
            for (let i = 0; i < 4; i++) {
                //  获取当前锚点坐标
                const x = width * (anchorPointMap[i][0] - 0.5);
                const y = height * (anchorPointMap[i][1] - 0.5);
                // 添加锚点
                // 其实是在实例化item下的group中添加内容
                group.addShape('circle', {
                    attrs: {
                        r: 5,
                        cursor: 'move',
                        stroke: '#333',
                        fill: '#fff',
                        x,
                        y,
                    },
                    //  记录锚点位置，方便后续使用
                    anchorIndex: i,
                    //  响应拖拽事件
                    draggable: true,
                    //  统一命名锚点
                    name: 'anchor',
                    //  用锚点实例化节点的node id来标识
                    //  配合上方的anchorIndex，可以确认锚点
                    nodeId: id,
                });
            }
        },
        // 绑定画布事件，进行统一封装，方便调用
        bindEvents() {
            //  默认的边配置文件
            const edgeCfg = {
                //  拖拽开始id
                sourceId: '',
                //  拖拽开始锚点
                sourceAnchor: '',
                //  拖拽开始的坐标
                startPoint: {
                    x: 0,
                    y: 0,
                },
            };

            // 画布监听释放事件
            this.graph.on('drop', e => {
                //  如果是外部封装组件拖拽的
                if (e.originalEvent.dataTransfer) {
                    //  从原生事件中获取图形类型
                    const { shape } = JSON.parse(e.originalEvent.dataTransfer.getData('dragSource'));
                    //  画布中按坐标添加对应类型的图形
                    this.graph.addItem('node', {
                        type: shape,
                        label: Math.random() * 100,
                        x: e.canvasX,
                        y: e.canvasY,
                    });
                }
            });

            // 开始拖拽
            this.graph.on('anchor:dragstart', e => {
                console.log(`anchor:dragstart e`)
                console.log(e)
                //  阻止原本默认的锚点事件，不过这个版本的框架就阻拦了原本事件冒泡
                e.stopPropagation && e.stopPropagation();
                //  获取节点信息
                const node = e.item;
                //  获取节点的包围盒
                const bBox = node.getBBox();
                //  获取节点的容器
                //  等价于 const group = node.get('group')
                const group = node.getContainer();
                //  获取节点数据模型，解构获取 id
                const { id } = node.getModel();
                //  获取使用锚点的序号
                const { anchorIndex } = e.target.cfg;
                //  获取锚点的配置
                const p = anchorPointMap[anchorIndex];
                //  存储拖拽开始的相关信息
                //  x坐标
                edgeCfg.startPoint.x = e.canvasX;
                //  y坐标
                edgeCfg.startPoint.y = e.canvasY;
                //  拖拽目标id
                edgeCfg.sourceId = id;
                //  拖拽目标的锚点信息
                edgeCfg.sourceAnchor = anchorIndex;
                // 添加虚线
                const line = group.addShape('path', {
                    attrs: {
                        stroke: '#1890FF',
                        lineDash: [5, 3],
                        //  path中存储拖拽开始的位置
                        path: [
                            ['M', bBox.width * (p[0] - 0.5), bBox.height * (p[1] - 0.5)],
                        ],
                    },
                    name: 'dashed-path',
                });
                //  将当前节点，节点的group,line，放到画布最高层
                node.toFront();
                group.toFront();
                line.toFront();
                // console.log('dragstart', edgeCfg);
            });

            // 拖拽中
            this.graph.on('anchor:drag', e => {
                //  阻止原本默认的锚点事件，不过这个版本的框架就阻拦了原本事件冒泡
                e.stopPropagation && e.stopPropagation();
                //  获节点
                const node = e.item;
                //  获取节点容器，group
                const group = node.getContainer();
                //  获取虚线  
                const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');
                //  获取节点的包围盒
                const canvasBox = group.get('children')[0].get('canvasBBox');
                //  如果有虚线
                if (dashedPath) {
                    // 获取拖拽开始存储的内容节点
                    const { path } = dashedPath.attrs;
                    /* 计算方法:
                    * 鼠标在画布上的位置 - box左上角 - width/2 => 当前鼠标的坐标
                    * 位置减一是为了避免覆盖结束位置，以目标node中心判断，在左x-1,在右x+1，在上y+1,在下y-1
                    */
                    //  生成结束点
                    path[1] = ['L', e.x - canvasBox.x - canvasBox.width / 2 - 1, e.y - canvasBox.y - canvasBox.height / 2 - 1];
                    //  添加虚线路径
                    dashedPath.attr({
                        //  将数据拼接成路径
                        path: [[...path[0]], path[1]],
                    });
                    //  将虚线移到到画布最高层
                    dashedPath.toFront();
                }
            });

            // 拖拽结束
            this.graph.on('anchor:dragend', e => {
                //  阻止原本默认的锚点事件，不过这个版本的框架就阻拦了原本事件冒泡
                e.stopPropagation && e.stopPropagation();

                if (e.target.cfg.name === 'anchor' && e.target.cfg.nodeId !== e.item.getModel().id) {
                    // 移动到了其他锚点上，且其他锚点的id与开始的锚点不同
                } else {
                    // 没有移到其他锚点上
                    // 此时应删除连线, 并清空 edge 对象
                    edgeCfg.sourceId = '';
                    edgeCfg.anchorIndex = '';
                }

                // 移除虚线
                const node = e.item;
                const group = node.getContainer();
                const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');

                if (dashedPath) {
                    dashedPath.remove();
                }
            });

            // 在锚点上释放鼠标
            this.graph.on('anchor:drop', e => {
                //  阻止原本默认的锚点事件，不过这个版本的框架就阻拦了原本事件冒泡
                e.stopPropagation && e.stopPropagation();
                //  获取当前节点id
                const { id } = e.item.getModel();
                //  获取锚点index
                const { anchorIndex } = e.target.cfg;

                // 发生连线
                if (edgeCfg.sourceId) {
                    // 添加连线
                    this.graph.addItem('edge', {
                        fill: '#333',
                        label: 'edge',
                        source: edgeCfg.sourceId,
                        sourceAnchor: edgeCfg.sourceAnchor,
                        target: id,
                        targetAnchor: anchorIndex,
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.workspace {
    display: flex;
}

#graph {
    margin-left: 0;
}</style>
