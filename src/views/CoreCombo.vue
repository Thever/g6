<template>
    <div class="show-content">
        <p>G6 提供的 rect 和 circle combo 已经能满足日常使用需要：</p>
        <div id="CoreCombo"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreCombo",
    mounted() {
        const data = {
            nodes: [
                {
                    x: 100,
                    y: 100,
                    id: 'node1',
                    label: 'node1',
                    comboId: 'comboA' // node1 属于 comboA
                },
                {
                    id: 'node2',
                    label: 'node2',
                    comboId: 'comboB' // node2 属于 comboB
                },
                {
                    id: 'node3', // node3 不属于任何 combo
                    label: 'node3'
                },
            ],
            combos: [
                { // 定义 comboA
                    id: 'comboA',
                    label: 'a',
                    parentId: 'comboC'
                },
                { // 定义 comboB
                    id: 'comboB',
                    label: 'b',
                    parentId: 'comboB'
                },
                { // 定义 comboC，这是一个空的 combo
                    id: 'comboC'
                },
                // ...
            ]
        };
        const graph = new G6.Graph({
            container: 'CoreCombo',
            width: 1000,
            height: 500,
            //  全局配置默认combo属性
            defaultCombo: {
                // id需要单独指定,唯一标识符
                // parentId:'xxx', 该 Combo 的父 Combo 的 ID
                type: 'circle', //  指定该 Combo 的类型，可以是内置 Combo 的类型名，也可以是自定义 Combo 的类型名。默认是 'circle'
                // size: 30, // Combo 的最小尺寸（非固定尺寸），默认 'circle' 类型 Combo 的 size 为 20，'rect' 类型的为 [20, 5]
                // fixSize: 30, // 固定该 Combo 的尺寸，不指定时 Combo 大小由内部元素的分布和大小来决定。若指定了 fixSize 而没有指定 fixCollapseSize，则即使该 Combo 在收起状态下仍然保持 fixSize 指定的尺寸
                // fixCollapseSize: 30, // 固定该 Combo 收起时的尺寸，不指定时，若未指定 fixSize 则由 size 决定收起时的尺寸，否则统一为 fixSize 尺寸 ｜
                // padding: 10, // 该 Combo 内边距，默认 'circle' 类型 Combo 的 padding 为 25，'rect' 类型的为 [25, 20, 15, 20]
                collapsed: false, // 该 Combo 是否收起。在渲染前配置 collapsed: true 在 combo 数据中，初次渲染时将默认收起
                //  v4.6.8 起支持 该 Combo 在收起状态下展示的图片
                // collapsedSubstituteIcon: {
                //     show: false,    //  是否展示，默认不展示
                //     img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ',    //  Icon 图片地址,默认存在图片
                //     width: 30,  //  Icon 图片的宽度，不设置则将使用 Combo 收起时的宽度
                //     height: 30  //  Icon 图片高度，不设置则将使用 Combo 收起时的高度
                // },
                //  样式配置
                // style: {
                //     fill: 'skyblue',    //  Combo 填充色
                //     fillOpacity: 0.9,   //  设置填充的 alpha 或透明值
                //     stroke: 'blue', //  Combo 的描边颜色
                //     lineWidth: 2,   //  描边宽度
                //     shadowColor: '#d8d8d8', // 阴影颜色
                //     shadowBlur: 1,  //  阴影范围
                //     shadowOffsetX: 1,   //  阴影 x 方向偏移量
                //     shadowOffsetY: 1,   //  阴影 y 方向偏移量
                //     opacity: 0.9,   //  设置绘图的当前 alpha 或透明值
                //     cursor: 'zoom-out', //  鼠标在该 Combo 上时的鼠标样式,参考https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                // },
                //  标签名
                // label: 'combo',
                //  标签配置
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
                        // fontSize: 36    //  文本字体大小
                    }
                },
            }
        });
        graph.data(data);
        graph.render();
    },
};
</script>

<style scoped>
#CoreCombo {
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