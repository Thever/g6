<template>
    <div class="home">
        <p>拖拽调整节点大小</p>
        <button @click="setEdit">点我切换模式：{{ mode }}</button>
        <div id="mountNode"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
// import treeJson from '@/treeData.json'
export default {
    data() {
        return {
            //  graph实例化容器
            graph: undefined,
            //  是否是编辑模式
            mode: 'default'
        };
    },
    methods: {
        init() {
            // const data = {
            //   nodes: [
            //     {
            //       id: 'rect',
            //       label: 'rect',
            //       x: 250,
            //       y: 150,
            //     },
            //   ],
            // };

            //  注册自定义节点
            G6.registerNode('rect-node', {
                //  绘制节点
                draw(cfg, group) {
                    //  节点样式
                    const style = this.getShapeStyle(cfg, group)
                    const shape = group.addShape('rect', {
                        attrs: style,
                        name: 'rect-node'
                    })
                    group.addShape('text', {
                        attrs: {
                            fontSize: 14,
                            fill: '#666',
                            text: cfg.label,
                            x: -16,
                            y: 6,
                        },
                        name: 'node-label'
                    })
                    //  TODO
                    //  1.添加虚拟节点
                    group.addShape('rect', {
                        attrs: {
                            ...style,
                            //  边框
                            stroke: '#1890ff',
                            //  背景
                            fill: '#e7f7fe',
                            fillOpacity: 0.7
                        },
                        classNmae: 'rect-node-shadow',
                        //  默认不显示
                        visible: false
                    })
                    //  2.添加控制点
                    this.addControlPoints(group, style)
                    return shape
                },
                addControlPoints(group, style) {
                    group.addShape('circle', {
                        attrs: {
                            r: 4,
                            //  边框
                            fill: '#1890ff',
                            x: 0,
                            y: -style.height / 2,
                            cursor: 'ns-resize',
                        },
                        visible: false,
                        //  添加className用于区分节点
                        className: 'control-point',
                        //  背景
                        name: 'top-point',
                    })
                    group.addShape('circle', {
                        attrs: {
                            r: 4,
                            //  填充背景色
                            fill: '#1890ff',
                            //  添加看不见边框
                            stork: '#fff',
                            strokeOpacity: 0,
                            x: style.width / 2,
                            y: 0,
                            cursor: 'ew-resize',
                        },
                        visible: false,
                        //  添加className用于区分节点
                        className: 'control-point',
                        //  背景
                        name: 'right-point',
                    })
                    group.addShape('circle', {
                        attrs: {
                            r: 4,
                            //  填充背景色
                            fill: '#1890ff',
                            //  添加看不见边框
                            stork: '#fff',
                            strokeOpacity: 0,
                            x: 0,
                            y: style.height / 2,
                            cursor: 'ns-resize',
                        },
                        visible: false,
                        //  添加className用于区分节点
                        className: 'control-point',
                        //  背景
                        name: 'bottom-point',
                    })
                    group.addShape('circle', {
                        attrs: {
                            r: 4,
                            //  填充背景色
                            fill: '#1890ff',
                            //  添加看不见边框
                            stork: '#fff',
                            strokeOpacity: 0,
                            x: -style.width / 2,
                            y: 0,
                            cursor: 'ew-resize',
                        },
                        visible: false,
                        //  添加className用于区分节点
                        className: 'control-point',
                        //  背景
                        name: 'left-point',
                    })
                },
                //  处理节点更新
                update(cfg, item) {
                    const model = item.getModel()
                    const group = item.getContainer()
                    const node = group.getFirst()
                    const { width, height } = model.style
                    //  更新属性
                    node.attr({
                        width,
                        height,
                        //  调整位置
                        x: -width / 2,
                        y: -height / 2
                    })
                    group.getChildren().forEach(child => {
                        if (child.cfg.className === 'rect-node-shadow') {
                            //  本体
                            child.attr({
                                width,
                                height,
                                //  调整位置
                                x: -width / 2,
                                y: -height / 2
                            })
                        } else if (child.cfg.className === 'control-point') {
                            //  四个控制点
                            switch (child.cfg.name) {
                                case 'top-point':
                                    child.attr({
                                        y: -height / 2
                                    })
                                    break
                                case 'right-point':
                                    child.attr({
                                        x: width / 2
                                    })
                                    break
                                case 'bottom-point':
                                    child.attr({
                                        y: height / 2
                                    })
                                    break
                                case 'left-point':
                                    child.attr({
                                        x: -width / 2
                                    })
                                    break
                            }
                        } else {
                            // 非目标情况
                        }
                    })
                },
                //  node状态设置
                setState(name, value, item) {
                    // console.log(`进入了`)
                    // console.log({ name, value, item })
                    if (name === 'graphMode') {
                        const visible = value === 'edit'
                        const group = item.getContainer()
                        const children = group.getChildren()

                        children.forEach(child => {
                            //  如果是自定义节点
                            if (child.cfg.className === 'rect-node-shadow' || child.cfg.className === 'control-point') {
                                //  切换显隐
                                if (visible) {
                                    child.show()
                                } else {
                                    child.hide()
                                }
                            }
                        })
                    }
                }
            }, 'rect')


            const width = document.getElementById('mountNode').scrollWidth;
            const height = document.getElementById('mountNode').scrollHeight || 500;
            const graph = new G6.Graph({
                container: 'mountNode',
                width,
                height,
                // translate the graph to align the canvas's center, support by v3.5.1
                fitCenter: true,
                modes: {
                    default: ['drag-canvas', 'drag-node'],
                },
                // //  默认节点
                // defaultNode: {
                //   /* node type */
                //   type: 'rect',
                //   /* node size */
                //   size: [80, 40],
                //   /* style for the keyShape */
                //   // style: {
                //   //   fill: '#9EC9FF',
                //   //   stroke: '#5B8FF9',
                //   //   lineWidth: 3,
                //   //   radius: 10
                //   // },
                //   labelCfg: {
                //     /* label's position, options: center, top, bottom, left, right */
                //     position: 'center',
                //     /* label's offset to the keyShape, 4 by default */
                //     //   offset: 12,
                //     /* label's style */
                //     //   style: {
                //     //     fontSize: 20,
                //     //     fill: '#ccc',
                //     //     fontWeight: 500
                //     //   }
                //   },
                //   /* configurations for four linkpoints */
                //   linkPoints: {
                //     top: true,
                //     right: true,
                //     bottom: true,
                //     left: true,
                //     /* linkPoints' size, 8 by default */
                //     //   size: 5,
                //     /* linkPoints' style */
                //     //   fill: '#ccc',
                //     //   stroke: '#333',
                //     //   lineWidth: 2,
                //   },
                //   /* icon configuration */
                //   icon: {
                //     /* whether show the icon, false by default */
                //     show: true,
                //     /* icon's img address, string type */
                //     // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                //     /* icon's size, 20 * 20 by default: */
                //     //   width: 40,
                //     //   height: 40
                //   },
                // },
                //  将rect-node自定义节点作为默认节点
                defaultNode: {
                    type: 'rect-node',
                    style: {
                        width: 140,
                        height: 40,
                        radius: 4,
                        fill: '#ecf6fc',
                        stroke: '#999'
                    },
                    labelCfg: {
                        style: {
                            fontSize: 14
                        }
                    }
                }
                /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
                // nodeStateStyles: {
                //   // node style of active state
                //   active: {
                //     fillOpacity: 0.8,
                //   },
                //   // node style of selected state
                //   selected: {
                //     lineWidth: 5,
                //   },
                // },
            })

            //  原本节点渲染
            // graph.data(data);
            // graph.render();

            //  自定义节点渲染
            graph.read({
                nodes: [{
                    id: '0',
                    x: 350,
                    y: 350,
                    label: 'node'
                }]
            })

            // graph.on('node:mouseenter', (evt) => {
            //   const { item } = evt;
            //   graph.setItemState(item, 'active', true);
            // });

            // graph.on('node:mouseleave', (evt) => {
            //   const { item } = evt;
            //   graph.setItemState(item, 'active', false);
            // });

            //  将graph指向vue本地实例
            this.graph = graph

            graph.on('node:click', (evt) => {
                console.log(`节点点击了`)
                console.log({ evt })
                //  节点设置选中状态
                const { item } = evt;
                graph.setItemState(item, 'selected', true);
                //  获取model
                // const model =  item.getModel()
                //  宽高自增
                // model.style.width += 5
                // model.style.height += 5
                //  更新节点
                // this.graph.updateItem(evt.item, model)
            });

            //  记录事件行为
            let dragging = false
            //  存储当前坐标
            const p = {
                x: 0,
                y: 0
            }
            this.graph.on('node:mousedown', evt => {
                //  鼠标按下
                if (this.mode === 'edit' && !dragging) {
                    //  记录坐标
                    p.x = evt.x
                    p.y = evt.y
                    //  更改拖拽状态
                    dragging = true
                }
            })
            this.graph.on('node:mousemove', evt => {
                //  鼠标拖动
                if (this.mode === 'edit' && dragging) {
                    //  查看当前的传入的拖动的锚点是哪个
                    console.log(`node:mousemove`)
                    console.log({ evt })
                    //  更新节点
                    //  这里要结合具体锚点和拖动的x,y距离来进行处理，待完善
                    // this.updateNodeSize(evt.item, evt.x > p.x ? evt.x - p.x : p.x - evt.x, evt.y > p.y ? evt.y - p.y : p.y - evt.y)
                    this.updateNodeSize(evt.item, evt.x - p.x, evt.y - p.y)
                    //  存储坐标
                    p.x = evt.x
                    p.y = evt.y
                }
            })
            this.graph.on('node:mouseup', evt => {
                //  鼠标抬起
                if (this.mode === 'edit' && dragging) {
                    console.log({ evt })
                    //  更改拖拽状态
                    dragging = false
                }
            })
            this.graph.on('node:mouseleave', evt => {
                //  鼠标离开
                if (this.mode === 'edit' && dragging) {
                    console.log({ evt })
                    //  更改拖拽状态
                    dragging = false
                }
            })
            // eslint-disable-next-line no-unused-vars
            // graph.on('canvas:click', (evt) => {
            //   graph.getNodes().forEach((node) => {
            //     graph.clearItemStates(node);
            //   });
            // });

        },
        //  默认和编辑状态切换
        setEdit() {
            //  更改状态
            if (this.mode === 'default') {
                this.mode = 'edit'
            } else {
                this.mode = 'default'
            }
            //  获取第一个节点
            const item = this.graph.findById('0')
            //  设置编辑状态
            this.graph.setItemState(item, 'graphMode', this.mode)
        },
        //  更新节点大小
        updateNodeSize(item, dx, dy) {
            //  获取model
            const model = item.getModel()
            //  设置宽高
            model.style.width += dx * 2
            model.style.height += dy * 2
            //  更新节点
            this.graph.updateItem(item, model)
        }

    },
    mounted() {
        this.init();
    },
};
</script>
<style>
#mountNode {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>
