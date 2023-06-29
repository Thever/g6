<template>
    <div class="show-content">
        <p>G6 提供了 8 种内置边：</p>
        <ul>
            <li>line：直线，不支持控制点</li>
            <li>polyline：折线，支持多个控制点</li>
            <li>arc：圆弧线</li>
            <li>quadratic：二阶贝塞尔曲线</li>
            <li>cubic：三阶贝塞尔曲线</li>
            <li>cubic-vertical：垂直方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点</li>
            <li>cubic-horizontal：水平方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点</li>
            <li>loop：自环</li>
        </ul>
        <p>边的样式可参考自定义边：https://g6.antv.antgroup.com/manual/middle/elements/edges/custom-edge<br/>和边动画 https://g6.antv.antgroup.com/examples#scatter-edge来结合实现 </p>
        <div id="CoreEdge"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreEdge",
    mounted() {
        const data = {
            nodes: [
                {
                    id: 'a1',
                    x: 30,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0, 1],
                        [0.5, 1],
                    ],
                },
                {
                    id: 'a2',
                    x: 60,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0, 1],
                        [0.5, 1],
                    ],
                },
                {
                    id: 'b1',
                    x: 130,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'b2',
                    x: 160,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'c1',
                    x: 230,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'c2',
                    x: 260,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'd1',
                    x: 430,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'd2',
                    x: 460,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'e1',
                    x: 530,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'e2',
                    x: 560,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'f1',
                    x: 630,
                    y: 100,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
                {
                    id: 'f2',
                    x: 660,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    // anchorPoints: [
                    //     [0, 1],
                    //     [0.5, 1],
                    // ],
                },
            ],
            edges: [
                {
                    id: 'a',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'a1',   //  起始点 id
                    target: 'a2',   //  结束点 id
                    type: 'line',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 10, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.triangle(10, 20, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    label: 'line',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 36    //  文本字体大小
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
                    id: 'b',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'b1',   //  起始点 id
                    target: 'b2',   //  结束点 id
                    type: 'polyline',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    // sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    // targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 1, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.vee(10, 20, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                        //  polyline专属属性
                        radius: Math.PI / 2, //  numbe, 拐弯处的圆角弧度, 若不设置则为直角，polyline 特有
                        offset: 20, //   拐弯处距离节点最小距离, 默认为 5
                    },
                    label: 'polyline',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 24    //  文本字体大小
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
                    // polyline专属属性
                    // 控制点数组,不指定按算法生成，指定按数组中的点进行生成
                    // controlPoints: [{ x: 10, y: 20 }, { x: 20, y: 25 }],
                    routeCfg: {
                        gridSize: 10, //  number,计算折线的网格大小，值越小性能消耗越高,默认值10
                        maxAllowedDirectionChange: Math.PI / 2, // 允许的最大转角角度，弧度制
                        obstacles: [] // 需要躲避的障碍节点对象
                    }
                },
                {
                    id: 'c',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'c1',   //  起始点 id
                    target: 'c2',   //  结束点 id
                    type: 'quadratic',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    // sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    // targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 1, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    label: 'quadratic',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 24    //  文本字体大小
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
                    // quadratic专属属性
                    // 控制点数组,不指定按算法生成，指定按数组中的点进行生成
                    // controlPoints: [{ x: 10, y: 20 }, { x: 20, y: 25 }],
                    // curveOffset: [], // Number / Number[], 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
                    // curvePosition: [], // Number / Number[], 控制点在两端点连线上的相对位置，范围 0 ～ 1
                },
                {
                    id: 'd',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'd1',   //  起始点 id
                    target: 'd2',   //  结束点 id
                    type: 'cubic',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    // sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    // targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 1, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.circle(10, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    label: 'cubic',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 16    //  文本字体大小
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
                    // cubic专属属性
                    // 控制点数组,不指定按算法生成，指定按数组中的点进行生成
                    // controlPoints: [{ x: 10, y: 20 }, { x: 20, y: 25 }],
                    // curveOffset: [],    //  Number / Number[], 两个控制点距离两端点连线的距离，可理解为控制边的弯曲程度。为 Number 类型时两个控制点分别在连线两侧且与连线距离相等
                    // minCurveOffset: [], //  Number / Number[], 两个控制点距离两端点连线的最小距离距离，可理解为控制边的弯曲程度，用于防止过于“平缓”的曲线，当 curveOffset 未指定时生效。为 Number 类型时两个控制点分别在连线两侧且与连线距离相等
                    // curvePosition: 1, // Number / Number[], 两个控制点在两端点连线上的相对位置，范围 0 ～ 1
                },
                {
                    id: 'e',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'e1',   //  起始点 id
                    target: 'e2',   //  结束点 id
                    type: 'arc',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    // sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    // targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 1, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.diamond(10, 20, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    label: 'arc',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 16    //  文本字体大小
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
                    // arc专属属性
                    // curveOffset: 20, // Number, 圆弧顶端距离两线中心位置的距离, 数值绝对值大小控制圆弧的大小，正负控制圆弧弯曲的方向，默认为 20。arc 边特有
                },
                {
                    id: 'f',    //  边唯一 ID，必须是唯一的 string,可以省略不写
                    source: 'f1',   //  起始点 id
                    target: 'f2',   //  结束点 id
                    type: 'loop',   //  指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    // sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    // targetAnchor: 0,
                    style: {
                        stroke: 'steelblue',    //  边的颜色
                        lineWidth: 1,   //  边宽度
                        lineAppendWidth: 1, // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                        // endArrow: true, //  Boolean / Object,为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        endArrow: {
                            path: G6.Arrow.rect(10, 20, 25),
                            d: 25
                        },
                        startArrow: true, //  Boolean / Object,为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头,endArrow: {path: G6.Arrow.vee(10, 20, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）d: 10 // 偏移量}
                        strokeOpacity: 0.9, //	边透明度
                        shadowColor: 'steelblue', // 阴影颜色
                        shadowBlur: 0.3, // 阴影模糊程度
                        shadowOffsetX: 1, //  阴影 x 方向偏移量
                        shadowOffsetY: 1, //  阴影 y 方向偏移量
                        lineDash: [1, 1], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
                        cursor: 'alias', // 鼠标在该边上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                    },
                    label: 'loop',
                    labelCfg: {
                        refX: 1,    //  标签在 x 方向的偏移量
                        refY: 1,    //  标签在 y 方向的偏移量
                        position: 'middle',  //  文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
                        autoRotate: false, // 标签文字是否跟随边旋转，默认 false
                        //  标签的样式属性
                        style: {
                            fill: 'skyblue',    //  文本颜色
                            stroke: 'skyblue',  //  文本描边颜色
                            lineWidth: 1,   //  文本描边粗细
                            opacity: 1, //  文本透明度
                            // fontFamily: '', //  文本字体
                            fontSize: 16    //  文本字体大小
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
                    // loop专属属性
                    loopCfg: {
                        position: 'top', // 指定自环与节点的相对位置。默认为：top。支持的值有：top, top-right, right,bottom-right, bottom, bottom-left, left, top-left
                        dist: 1, // 从节点 keyShape 的边缘到自环最顶端的位置，用于指定自环的曲度，默认为节点的高度。
                        clockwise: false, // 指定是否顺时针画环，默认为  true。
                        pointPadding: 5, // 对于非圆形节点设置的连接点与节点中心坐标（top-right，bottom-right,top-left,bottom-left较特殊，为四个角坐标）在 x 轴或 y 轴方向的偏移量，默认为  节点宽高中最小值的1/4
                    }
                },
            ],
        };
        const graph = new G6.Graph({
            container: 'CoreEdge',
            width: 1000,
            height: 500,
            //  也可以全局定义默认边样式
            defaultEdge: {}
        });
        graph.data(data);
        graph.render();
    },
};
</script>

<style scoped>
#CoreEdge {
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