<template>
    <div class="show-content">
        <p>G6自带节点类型让用户使用,用户还能自定义节点,如果用DOM来作为内容，渲染renderer需要使用svg模式，anchorPoint可以指定节点连线的位置，本demo在vue中使用，故不设计G6中JSX语法和REACT定义节点的方式</p>
        <div id="CoreNode"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreNode",
    mounted() {
        //  自定义节点-菱形
        G6.registerNode('diamond', {
            //  用来配置自定义节点的样式和状态
            // options: {
            //     style: {},
            //     stateStyles: {
            //         hover: {},
            //         selected: {},
            //     },
            // },
            /**
             * 绘制节点，包含文本
             * @param  {Object} cfg 节点的配置项
             * @param  {G.Group} group 图形分组，节点中图形对象的容器
             * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
             * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
             */
            //  不继承 single-node 自己写draw方法
            draw(cfg, group) {
                // 如果 cfg 中定义了 style 需要同这里的属性进行融合
                const keyShape = group.addShape('path', {
                    attrs: {
                        path: this.getPath(cfg), // 根据配置获取路径
                        stroke: cfg.color ? cfg.color : '#000', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
                    },
                    // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                    name: 'path-shape',
                    // 设置 draggable 以允许响应鼠标的图拽事件
                    draggable: true,
                });
                if (cfg.label) {
                    // 如果有文本
                    // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                    // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                    // style.text = cfg.label;
                    // eslint-disable-next-line no-unused-vars
                    const label = group.addShape('text', {
                        // attrs: style
                        attrs: {
                            x: 0, // 居中
                            y: 0,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: cfg.label,
                            fill: '#666',
                        },
                        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                        name: 'text-shape',
                        // 设置 draggable 以允许响应鼠标的图拽事件
                        draggable: true,
                    });
                }
                return keyShape;
            },
            //  继承 single-node，update，setState 方法在  single-node 中都有实现，这里仅需要复写 draw 方法即可
            // draw(cfg, group) {
            //     const size = this.getSize(cfg); // 转换成 [width, height] 的模式
            //     const color = cfg.color;
            //     const width = size[0];
            //     const height = size[1];
            //     //  / 1 \
            //     // 4     2
            //     //  \ 3 /
            //     const path = [
            //         ['M', 0, 0 - height / 2], // 上部顶点
            //         ['L', width / 2, 0], // 右侧顶点
            //         ['L', 0, height / 2], // 下部顶点
            //         ['L', -width / 2, 0], // 左侧顶点
            //         ['Z'], // 封闭
            //     ];
            //     const style = G6.Util.mix(
            //         {},
            //         {
            //             path: path,
            //             stroke: color,
            //         },
            //         cfg.style,
            //     );
            //     // 增加一个 path 图形作为 keyShape
            //     const keyShape = group.addShape('path', {
            //         attrs: {
            //             ...style,
            //         },
            //         draggable: true,
            //         name: 'diamond-keyShape', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            //     });
            //     // 返回 keyShape
            //     return keyShape;
            // },
            // 自定义方法，返回菱形的路径
            getPath(cfg) {
                const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
                const width = size[0];
                const height = size[1];
                //  / 1 \
                // 4     2
                //  \ 3 /
                const path = [
                    ['M', 0, 0 - height / 2], // 上部顶点
                    ['L', width / 2, 0], // 右侧顶点
                    ['L', 0, height / 2], // 下部顶点
                    ['L', -width / 2, 0], // 左侧顶点
                    ['Z'], // 封闭
                ];
                return path;
            },
            /**
             * 绘制后的附加操作，默认没有任何操作
             * @param  {Object} cfg 节点的配置项
             * @param  {G.Group} group 图形分组，节点中图形对象的容器
             */
            afterDraw(cfg, group) {
                console.log({ cfg, group })
            },
            //  更新节点后的操作
            /**
             * 更新节点，包含文本
             * @override
             * @param  {Object} cfg 节点的配置项
             * @param  {Node} node 节点
             */
            update(cfg, node) {
                const group = node.getContainer(); // 获取容器
                const shape = group.get('children')[0]; // 按照添加的顺序
                const style = {
                    path: this.getPath(cfg),
                    stroke: cfg.color,
                };
                shape.attr(style); // 更新属性
                // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
                // 通过 label.attr() 更新文本属性即可
            },
            /**
             * 更新节点后的操作，一般同 afterDraw 配合使用
             * @override
             * @param  {Object} cfg 节点的配置项
             * @param  {Node} node 节点
             */
            afterUpdate(cfg, node) {
                console.log({ cfg, node })
            },
            /**
             * 响应节点的状态变化。
             * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
             * @param  {String} name 状态名称
             * @param  {Object} value 状态值
             * @param  {Node} node 节点
             */
            setState(name, value, node) {
                console.log({ name, value, node })
            },
            /**
             * 获取锚点（相关边的连入点）
             * @param  {Object} cfg 节点的配置项
             * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
             */
            getAnchorPoints(cfg) {
                console.log({ cfg })
            },
        },
            // 注意这里继承了 'single-node'
            'single-node',
        )
        //  自定义节点-动画
        const Util = G6.Util;
        G6.registerNode(
            'inner-animate',
            {
                afterDraw(cfg, group) {
                    const size = cfg.size;
                    const width = size[0] - 12;
                    const height = size[1] - 12;
                    //  添加图片
                    const image = group.addShape('image', {
                        attrs: {
                            x: -width / 2,
                            y: -height / 2,
                            width,
                            height,
                            img: cfg.img,
                        },
                        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                        name: 'image-shape',
                    });
                    image.animate(
                        (ratio) => {
                            const toMatrix = Util.transform(
                                [1, 0, 0, 0, 1, 0, 0, 0, 1],
                                [['r', ratio * Math.PI * 2]],
                            );
                            return {
                                matrix: toMatrix,
                            };
                        },
                        {
                            repeat: true,
                            duration: 3000,
                            easing: 'easeCubic',
                        },
                    );
                },
            },
            // 继承了 rect 节点
            'rect',
        );
        // 基于 rect 扩展出新的图形
        G6.registerNode(
            'custom',
            {
                options: {
                    size: [100, 50],
                    style: {
                        lineWidth: 100
                    }
                },
                // 响应状态变化
                setState(name, value, item) {
                    console.log(`custom - setState `)
                    console.log({ name, value, item })
                    const group = item.getContainer();
                    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
                    //  点击事件事件
                    if (name === 'selected') {
                        if (value) {
                            shape.attr('fill', 'red');
                        } else {
                            shape.attr('fill', 'white');
                        }
                    }
                    //  鼠标浮动事件
                    if (name === 'running') {
                        if (value) {
                            console.error(`running true`)
                            // shape.animate(
                            //     {
                            //         r: 20,
                            //     },
                            //     {
                            //         repeat: true,
                            //         duration: 1000,
                            //     },
                            // );
                            shape.attr('fill', 'blue');
                        } else {
                            console.error(`running false`)

                            shape.attr('fill', 'red');
                            //  添加纹理
                            // shape.attr('fill', 'p(a)https://gw.alipay.com/cube.png');
                            // shape.stopAnimate();
                            // shape.attr('r', 10);
                        }
                    }
                },
            },
            'rect',
        );
        //  自定义dom节点
        G6.registerNode(
            'my-node',
            {
                draw: (cfg, group) => {
                    return group.addShape('dom', {
                        attrs: {
                            width: 230,
                            height: 60,
                            // 传入 DOM 的 html，这里要根据上下行流量来做状态灯更改判断
                            html: `<div style="width:230px;height:60px;background:skyblue;line-height:60px;text-align:center;">自定义dom节点</div>`
                        },
                        //  不允许拖动
                        draggable: false
                    })
                }
            },
            'single-node'
        )
        //  node 节点数据
        const data = {
            //  node包含了全部的内置节点和属性
            nodes: [
                //  G6内置节点
                {
                    //  数据中配置的属性优先级要大于defaultNode配置的属性内容
                    //  通用属性
                    id: 'node_circle',  //  节点id
                    x: 100, //  x坐标
                    y: 100, //  y坐标
                    type: 'circle', //  指定节点类型
                    size: 80,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#2649df', // 节点填充色
                        stroke: '#3e08ed',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#6908ed', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.1, //  设置填充的 alpha 或透明值 
                        cursor: 'help', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'circle',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'left', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#782fdb', // 文本颜色
                            stroke: '#beaad8', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node_rect',
                    x: 200,
                    y: 100,
                    type: 'rect',
                    size: 80,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#2010f7', // 节点填充色
                        stroke: '#776df6',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#8b83f5', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'grab', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    //  rect 没有 icon 属性
                    // icon: {
                    //     show: true, //  是否显示 icon
                    //     // img: '...', //  icon 的地址或 base64
                    //     // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                    //     width: 25,  // icon 的宽度, 默认为 16
                    //     height: 25, // icon 的高度, 默认为 16
                    // },
                    label: 'rect',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'top', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#2010f7', // 文本颜色
                            stroke: '#776df6', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-ellipse',
                    x: 330,
                    y: 100,
                    size: 80,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#c005fe', // 节点填充色
                        stroke: '#cc49f7',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#e08ffb', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'all-scroll', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    //  ellipse不支持icon
                    // icon: {
                    //     show: true, //  是否显示 icon
                    //     // img: '...', //  icon 的地址或 base64
                    //     // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                    //     width: 25,  // icon 的宽度, 默认为 16
                    //     height: 25, // icon 的高度, 默认为 16
                    // },
                    label: 'ellipse',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'right', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#05ff40', // 文本颜色
                            stroke: '#36f462', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-diamond',
                    x: 460,
                    y: 100,
                    type: 'diamond',
                    size: 80,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#fa0101', // 节点填充色
                        stroke: '#f74646',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#f57070', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'col-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'diamond',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#cd0606', // 文本颜色
                            stroke: '#c94141', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-triangle',
                    x: 560,
                    y: 100,
                    type: 'triangle',
                    size: 60,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#fc9b02', // 节点填充色
                        stroke: '#f9af3a',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#fac26b', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'n-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'triangle',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#b47108', // 文本颜色
                            stroke: '#7e6031', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-star',
                    x: 660,
                    y: 100,
                    type: 'star',
                    size: [60, 30],   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#f84f04', // 节点填充色
                        stroke: '#f4763f',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#f69265', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'e-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'star',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#d1480b', // 文本颜色
                            stroke: '#b44717', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-image',
                    x: 760,
                    y: 100,
                    type: 'image',
                    size: 50,   // Number | Array , 图片大小, size 为单个值时，表示宽高相等
                    //  图片url地址
                    img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                    // 节点的样式属性。
                    style: {
                        // fill: '#f84f04', // 节点填充色
                        // stroke: '#f4763f',  //  节点的描边颜色
                        // lineWidth: 1, //  描边宽度
                        // lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        // shadowColor: '#f69265', // 阴影颜色
                        // shadowBlur: 1, //   阴影范围
                        // shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        // shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        // opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        // fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        // 一般来设置鼠标交互
                        cursor: 'e-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    //  裁剪图片配置
                    clipCfg: {
                        show: false,    //  是否启用裁剪功能
                        type: 'circle', //  裁剪的图片形状,支持 'circle'、'rect'、'ellipse'
                        // circle
                        r: 50,  //  剪裁 type 为  'circle' 时生效, 剪裁圆形的半径
                        // ellipse
                        rx: 10, //  剪裁 type 为 'ellipse' 时生效,剪裁椭圆的长轴半径
                        ry: 15, //  剪裁 type 为 'ellipse' 时生效,剪裁椭圆的短轴半径
                        // rect
                        width: 15,  //  剪裁 type 为 'rect' 时生效, 剪裁矩形的宽度
                        height: 15, //  剪裁 type 为 'rect' 时生效, 剪裁矩形的高度
                        // 坐标
                        x: 0,   //  裁剪图形的 x 坐标, 默认为 0
                        y: 0    //  裁剪图形的 y 坐标, 默认为 0
                    },
                    //  文本文字
                    label: 'image',
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#a7fe00', // 文本颜色
                            stroke: '#b6f936', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
                        // hover 状态为 true 时的样式
                        hover: {
                            fill: "lightsteelblue",
                        },
                        // click 状态为 true 时的样式
                        click: {
                            stroke: "#000",
                            lineWidth: 3,
                        },
                    }
                },
                {
                    id: 'node-modelRect',
                    x: 900,
                    y: 100,
                    type: 'modelRect',
                    size: [200, 60],   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#00deff', // 节点填充色
                        stroke: '#4de5fc',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#a6f0fb', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'e-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'modelRect',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#07b7d1', // 文本颜色
                            stroke: '#07899c', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
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
                    //  modelRect 节点特有
                    //  配置左侧的小矩形形状
                    preRect: {
                        show: true, //  是否显示左侧小矩形
                        fill: '#f759ab',    //  左侧小矩形的填充色
                        width: 100,   //  左侧小矩形的宽度
                        radius: 5   //  左侧小矩形的圆角弧度
                    },
                    //  配置左侧logoIcon
                    logoIcon: {
                        show: true,    //  是否显示图标
                        img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',    //  图标图片
                        width: 20,  //  图标的宽度
                        height: 20, //  	图标的高度
                        offset: -14   //  图标的左右偏移量, 默认为0
                    },
                    //  配置右侧stateicon
                    stateIcon: {
                        show: true,    //  是否显示图标
                        img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',    //  图标图片
                        width: 20,  //  图标的宽度
                        height: 20, //  	图标的高度
                        offset: 0   //  图标的左右偏移量, 默认为-5
                    },
                    //  描述字段
                    description: '这个一段描述',
                    descriptionCfg: {
                        //  距离上方标签文本的垂直距离
                        paddingTop: 2,
                        //  通用的style属性样式
                        style: {
                            fill: '#f84f04', // 节点填充色
                            stroke: '#f4763f',  //  节点的描边颜色
                            lineWidth: 1, //  描边宽度
                            lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                            shadowColor: '#f69265', // 阴影颜色
                            shadowBlur: 1, //   阴影范围
                            shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                            shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                            opacity: 1,  //  设置绘图的当前 alpha 或透明值
                            fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                            cursor: 'zoom-in', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                        }
                    }
                },
                {
                    id: 'node-donut',
                    x: 1060,
                    y: 100,
                    type: 'donut',
                    size: 60,   //  Number / Array,节点大小
                    //  Array,指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
                    anchorPoints: [0.5, 0.5],
                    //  视觉上的四个锚点
                    linkPoints: {
                        top: true,  //  是否显示上部的圆点
                        bottom: true,   //  是否显示底部的圆点
                        left: true, //  是否显示左侧的圆点
                        right: true,    //  是否显示右侧的圆点
                        size: 10,    //  圆点的大小
                        fill: '#000',  //  圆点的填充色
                        stroke: 'skyblue', //  圆点的描边颜色
                        lineWidth: 3    //  圆点描边的宽度
                    },
                    // 节点的样式属性。
                    style: {
                        fill: '#9508f8', // 节点填充色
                        stroke: '#ac40f8',  //  节点的描边颜色
                        lineWidth: 1, //  描边宽度
                        lineDash: [3], //  Number[] 描边虚线，数组代表实、虚长度
                        shadowColor: '#cd8ef9', // 阴影颜色
                        shadowBlur: 1, //   阴影范围
                        shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                        shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                        opacity: 1,  //  设置绘图的当前 alpha 或透明值
                        fillOpacity: 0.5, //  设置填充的 alpha 或透明值 
                        cursor: 'n-resize', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    icon: {
                        show: true, //  是否显示 icon
                        // img: '...', //  icon 的地址或 base64
                        // text: 'left', // icon 的 iconfont,如果解析失败就显示对应的字符
                        width: 25,  // icon 的宽度, 默认为 16
                        height: 25, // icon 的高度, 默认为 16
                    },
                    label: 'donut',    //  文本文字
                    //  文本配置项
                    labelCfg: {
                        position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                        offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                        //  标签的样式属性。
                        style: {
                            fill: '#8308d8', // 文本颜色
                            stroke: '#5d0d95', // 文本描边颜色
                            lineWidth: 1, //  文本描边粗细
                            opacity: 1, //  文本透明度
                            fontFamily: '', //  文本字体
                        }
                    },
                    //  设置节点状态样式
                    stateStyles: {
                        /* 
                        设置不同状态下不同style样式，需要调用方法控制时候激活
                        激活：
                            graph.setItemState(item, 'bodyState', 'health');
                            graph.setItemState(item, 'selected', true);
                            graph.setItemState(item, 'active', true);
                        取消：
                            // 取消单个状态
                            graph.clearItemStates(item, 'selected');
                            graph.clearItemStates(item, ['selected']);
                            // 取消多个状态
                            graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
                        */
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
                    //  donut 节点特有
                    //  甜甜圈统计字段, { [key: string]: number }
                    donutAttrs: {
                        prop1: 10,
                        prop2: 20,
                        prop3: 25,
                        prop4: 10,
                    },
                    //  甜甜圈色板, { [key: string]: string }
                    donutColorMap: {
                        prop1: '#8eaade',
                        prop2: '#55a9f2',
                        prop3: '#0d47b5',
                        prop4: '#7b8085'
                    }
                },
                //  自定义节点-菱形
                { id: 'd-node1', x: 50, y: 300, type: 'diamond' }, // 最简单的
                { id: 'd-node2', x: 150, y: 300, type: 'diamond', size: [50, 100] }, // 添加宽高
                { id: 'd-node3', x: 250, y: 300, color: 'red', type: 'diamond' }, // 添加颜色
                { id: 'd-node4', x: 350, y: 300, label: '菱形', type: 'diamond' }, // 附加文本
                //  自定义节点动画
                {
                    id: 'animation',
                    x: 50,
                    y: 450,
                    size: [40, 40],
                    type: 'inner-animate',
                    img:
                        'data:image/webp;base64,UklGRq4FAABXRUJQVlA4IKIFAABwHwCdASo8ADwAPiEMhEGhhv6rQAYAgS2NHsdCq/4D8AOoA64OEUAj/XPxVwyvRGvyO/gGxN/t3oK/1X6zesX3L/p/RP/2HCgKAB9AGeAbCB+AGwAbQBtA/8c/m/4PYHTonm+SzRH6B9sv2i/rOZC+G/ln9l/ML/GdoD7APcA/TD+09QDzAfrX+vHYM9AD+Uf0zrAPQA/bH0vv2t+CH9qf2R+A39e6X098/I7IAcLcs8Gjmc/9T7gPbX9H+wJ+rPVV9En9ZmBI5oUiYhkYHIVjRr9hzCTPcV5Rs/wjjIHkxPgtr/3ALZSuUm146HHwqQVA23hnnqH/4aJ/k4v4hU6RBZ0AAAD+//8ARPyL9yWIlAbWBAD0oKSqlYWreuRa3Oj02u+TvSQS8iwMYewUYTWLDNp9wOlFJaWnqE+za35UwUXuDAT6T0I4fwY+u+qrRVhl+S1ir4X7BQiNswug5AX+MjQcXEeUwfSIEUT+DFPCr+BUiwTbFxLni7fv61vRbmXoauLz4tiqOFTzEGP8tNXP5+H7mZVGfNjIxapT3FGUtqBdp/SD5cTOYOkn2fawkpqpCSqf2+CfiGWtIF673fEzlk/hIbWDhQ81C/ddxLn609d/5efckbdZ8HZbhhVmM82/Uat7CFmw1SH5xCxRxEEhjpf1EP1Xn5q9VZfm1+OFTab/MN67Xha8K//5oVBlMgZALE653X0fas/+2xMqiyCu5Wa7PHsCwbBwqROfNmzi4LPOTjkFPHVKDD1Nfj4/sul6cANdF68rf2jszlyZsUUoLTP7H3swSroc3ssNXSRVAcYd7+iBZpfoAYWvKgnr+Hv62fHZX5ZbjYbYzVjq6fsXkubto858NuUx4+ILb5y7dP6W3/IYVeUSF0yZseKIZhOMs9BBf5uB2Y3Ott//+1OG7hYINzcqigrzWAOJbSmVw3G0ULywkobx+rvfk8VmZFzQGgP/+4T74mp/vsZyM1NLguiTO2gNO05tcpXwveq5mrcweXrJ/bRZDmU2KBrnXhkXq+735c+UHTFq4h4jMOPm5shKioB6XaqhUf3DJlMg8937g/SKjrgD0H5sNm0/k4FfilBbcrsjc3dd6cwEYJo3CNhe3SpNJ2geNXyV4/hq/BZXZ1kiVknjmf5cUx7Tv/9Sb+fQ/DgAsRNSz1wiVodiLjP7aVrkxbWx5gJ8U/j0o1Ipm/nyDZRPrQXmbPAcy1eDDejxTDBKe42ElHpC2QlFdhOedsp4i9QVjt8EqWGy1YzPaGqZhCVg/LWt8/+4BmiCzNGtpR21MGJf4kI/n/1sbe36e1QBCBAx4EVfTM82ZM2lh0P189e7eY0A3NzXWVrUek8SEn+DYYCQeEaC5hDHGreFHT1baY6KyrFx3G9oMm3fLrCqmNjFRnZa3LB/5m8FgCpq9B/1OCLRE5GzVTZnVzj/4V38PgCIpX16Kznijf01+MkDeS9oCF2hEXQ9tr+mPLrjGy4Cg5fyLgyCj1fUq33nMf79Svli2h83m3gqkoxJcXvBetFQP8V/gRjBNGmFXK5TfwLhbolWEjDqUGK3n+hxzQLif9zreYO88EIRTUNbzE1/Sn7rBEtjB0uawNje5OubWsB62SOlMZoZpxrDbMb4UvQrODPhSafmhcYe9zm/dHxssMfUthhDKjyMhoRhngPjbzfGXmIV2Omgrn/zbefK/PawUGSH6x4Qk4HCN4/X8S+XCf51JJtOQeHST/yfwg69uMkE07SONnhGUrL6j5oQn6JI+zkaH/H/P/Ti/pfOTfAWxQNiMvWX08mqbuUweFSQ/G5YUP/uCvZAXutf1+Nhl2jj/n4/fPOihPjwvfFnnjOaQvs9PSpF33d+396LASZ3IID/4UP4pf9eOMXw82ccoUUUHX6MfBWyBDvARCrdPmerUwKwW+lBIAe1dsAAAA==',
                    label: 'Image Rotate',
                    labelCfg: {
                        position: 'right',
                    },
                },
                //  交互节点
                { id: 'custom', x: 250, y: 450, label: 'custom专用', type: 'custom' },
                //  dom节点
                {
                    id: 'my-node1',
                    x: 100,
                    y: 550,
                    type: 'my-node',
                },
                //  锚点
                {
                    id: 'node1',
                    label: 'node1',
                    x: 100,
                    y: 700,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0, 1],
                        [0.5, 1],
                    ],
                    type: 'rect',
                },
                {
                    id: 'node2',
                    label: 'node2',
                    x: 300,
                    y: 700,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0.5, 0],
                        [1, 0.5],
                    ],
                    type: 'rect',
                },
            ],
            edges: [
                {
                    source: 'node1',
                    target: 'node2',
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    targetAnchor: 0,
                    style: {
                        endArrow: true,
                    },
                },
                {
                    source: 'node2',
                    target: 'node1',
                    // 该边连入 source 点的第 1 个 anchorPoint，
                    sourceAnchor: 1,
                    // 该边连入 source 点的第 1 个 anchorPoint，
                    targetAnchor: 1,
                    style: {
                        endArrow: true,
                    },
                },
            ],
        };
        //  实例化G6 graph
        const graph = new G6.Graph({
            container: 'CoreNode',
            width: 1500,
            height: 1200,
            //  渲染方式 'canvas' / 'svg',使用自定义节点-DOM节点必须用 'svg' 模式
            renderer: 'svg',
            //  配置node默认属性
            defaultNode: {
                //  默认的节点类型
                type: 'rect',
                //  默认通用样式
                style: {
                    fill: '#87CEF3', // 节点填充色
                    stroke: '#eaff8f',  //  节点的描边颜色
                    lineWidth: 1, //  描边宽度
                    lineDash: [1], //  Number[] 描边虚线，数组代表实、虚长度
                    shadowColor: '#d8d8d8', // 阴影颜色
                    shadowBlur: 1, //   阴影范围
                    shadowOffsetX: 0.5, //  阴影 x 方向偏移量
                    shadowOffsetY: 0.5, //  阴影 y 方向偏移量
                    opacity: 1,  //  设置绘图的当前 alpha 或透明值
                    fillOpacity: 0.1, //  设置填充的 alpha 或透明值 
                    cursor: 'wait', //  鼠标在该节点上时的鼠标样式，CSS 的 cursor 选项都支持,参考网址 https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                },
                //  配置label
                label: '默认节点',
                labelCfg: {
                    position: 'bottom', //  文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
                    offset: 10, //  文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
                    //  标签的样式属性。
                    style: {
                        fill: 'red', // 文本颜色
                        stroke: '#000', // 文本描边颜色
                        lineWidth: 1, //  文本描边粗细
                        opacity: 1, //  文本透明度
                        fontFamily: '', //  文本字体
                    }
                }
            }
        });
        graph.data(data);
        graph.render();

        //  节点点击事件
        graph.on('node:click', (ev) => {
            const node = ev.item;
            console.log({ ev, node })
            //  传入节点， 要设置的state状态属性名，state状态属性值
            graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
        });

        // 鼠标移动到上面 running，移出结束
        graph.on('node:mouseenter', (ev) => {
            const node = ev.item;
            graph.setItemState(node, 'running', true);
        });

        graph.on('node:mouseleave', (ev) => {
            const node = ev.item;
            graph.setItemState(node, 'running', false);
        });

        const listener = (dom) => {
            const nodeId = dom.id;
            if (!nodeId) return;
            const node = graph.findById(nodeId);
            let stroke = '';
            if (!node.hasState('selected')) {
                stroke = '#f00';
                graph.setItemState(node, 'selected', true);
            } else {
                stroke = '#5B8FF9';
                graph.setItemState(node, 'selected', false);
            }
            graph.updateItem(nodeId, {
                style: {
                    stroke,
                },
            });
        };
        const bindClickListener = () => {
            const domNodes = document.getElementsByClassName('dom-node');
            for (let i = 0; i < domNodes.length; i++) {
                const dom = domNodes[i];
                // eslint-disable-next-line no-unused-vars
                dom.addEventListener('click', (e) => {
                    listener(dom);
                });
            }
        };

        bindClickListener();

        // eslint-disable-next-line no-unused-vars
        graph.on('afterupdateitem', (e) => {
            bindClickListener();
        });
        // eslint-disable-next-line no-unused-vars
        graph.on('afterrender', (e) => {
            bindClickListener();
        });

    },
};
</script>

<style scoped>
#CoreNode {
    width: 1500px;
    height: 1200px;
    display: block;
    border: 1px solid skyblue;
    margin: 0 auto;
    /* 不添加会导致tooltip错位 */
    position: relative;
    left: -250px;
}

.show-content {
    width: 1000px;
    display: block;
    margin: 0 auto;
    text-align: left;
    overflow: visible;
}

.show-img {
    display: flex;
}

.show-img div {
    display: block;
    overflow: hidden;
}
</style>