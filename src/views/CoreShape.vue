<template>
    <div class="show-content">
        <p>Shape的生命周期为：初始化渲染 —> 更新 —> 操作 —> 销毁。</p>
        <p>Shape 作为 Graph 上的核心元素，这几个阶段都需要考虑，但是销毁可以交给 Graph 来处理，所以在定义 Shape 时不需要考虑，仅需要考虑三个阶段即可：</p>
        <ul>
            <li>绘制：从无到有的绘制 Shape 及文本；draw(cfg, group): 绘制，提供了绘制的配置项（数据定义时透传过来）和图形容器，必须返回合理的图形作为 keyShape；</li>
            <li>更新：数据发生改变导致 Shape 及文本发生变化；update(cfg, n): 更新，更新时的配置项（更新的字段和原始字段的合并）和元素对象；</li>
            <li>操作：给 Shape 添加状态，如：selected，active 等。setState(name, value, item): 响应节点/边/ Combo 状态的变化。</li>
        </ul>
        <div>keyShape：决定shape交互渲染的关键结构图形</div>
        <div class="show-img">
            <div>
                <p>keyShape:rect</p>
                <img src="@/assets/keyshape-rect.png" alt="">
            </div>
            <div>
                <p>keyShape:circle</p>
                <img src="@/assets/keyShap-circle.png" alt="">
            </div>
        </div>
        <div id="CoreShape"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "CoreShape",
    mounted() {
        const data = {
            nodes: [
                {
                    //  坐标
                    x: 100,
                    y: 100,
                    //  标签
                    label: 'rect',
                    //  形状
                    type: 'rect',
                    //  样式
                    style: {
                        // 仅在 keyShape 上生效
                        fill: 'lightblue',
                        stroke: '#888',
                        lineWidth: 1,
                        radius: 7,
                    },
                    //  启用的连接点
                    linkPoints: {
                        top: true,
                        bottom: true,
                        left: true,
                        right: true,
                        // ... 四个圆的样式可以在这里指定
                    },
                    // labelCfg: {...} // 标签的样式可以在这里指定
                },
                //  使用自定义节点
                {
                    id: 'node2',
                    dataType: 'YELLOWCODE',
                    keyInfo: '男 / 22岁',
                    name: "Sing",
                    x: 150,
                    y: 150,
                    type: 'card-node'
                },
                {
                    id: 'node1',
                    dataType: 'REDCODE',
                    keyInfo: '男 / 22岁',
                    name: "Sing",
                    x: 350,
                    y: 200,
                    type: 'card-node'
                }
            ],
        };
        // 点配置
        const CODES = {
            REDCODE: "#F5222D",
            YELLOWCODE: "#f7dc6f",
            GREENCODE: "#41912b"
        };
        const getNodeConfig = (node) => {
            return {
                fontColor: "#000", // 文字颜色
                bgColor: CODES[node.dataType] || "#41912b", // 背景颜色
                mainColor: "#fff", // 信息内容的背景颜色
                fontSize: 16, // 字体大小
            }
        }
        // 基准绘制方法
        const boxHeight = 80,
            boxWidth = 180,
            padding_Top = 10,
            padding_Left = -10,
            mainWidth = 90,
            imageRect = 60;
        const nodeBasicMethod = {
            // 创建点位置
            createNodeBox: (group, config, width, height) => {
                // 父级容器
                const container = group.addShape('rect', {
                    attr: {
                        x: 0,
                        y: 0,
                        width,
                        height
                    },
                    name: 'father-shape',
                    draggable: true,
                });
                // 主体
                group.addShape('rect', {
                    attrs: {
                        x: -width / 2,
                        y: 0,
                        width,
                        height,
                        fill: config.bgColor,
                        stroke: config.bgColor,
                        radius: 10,
                        cursor: 'pointer',
                    },
                    name: 'main-shape',
                    draggable: true,
                });
                // 文字部分
                group.addShape('rect', {
                    attrs: {
                        x: padding_Left,
                        y: padding_Top,
                        width: mainWidth,
                        height: boxHeight - padding_Top * 2,
                        fill: config.mainColor,
                        stroke: config.mainColor,
                        radius: 2,
                        cursor: 'pointer',
                    },
                    name: 'text-shape',
                    draggable: true,
                });
                return container;
            },
            // 做一些预处理,和初始化设置
            setState: (name, value, item) => {
                // eslint-disable-next-line no-unused-vars
                const group = item.getContainer();
            },
            afterDraw: (cfg, group) => {
                // eslint-disable-next-line no-unused-vars
                group.on('click', (e) => {
                    console.log('you click: ' + cfg.id)
                })
            }
        }
        // 自定义节点样式 
        G6.registerNode('card-node', {
            //  使用canvas渲染
            draw: (cfg, group) => {
                const config = getNodeConfig(cfg);
                const container = nodeBasicMethod.createNodeBox(group, config, boxWidth, boxHeight);
                // 文字添加
                group.addShape('text', {
                    attrs: {
                        text: cfg.name,
                        x: 0,
                        y: boxHeight / 2 - config.fontSize,
                        fontSize: config.fontSize,
                        textAlign: 'left',
                        textBaseline: 'middle',
                        fill: config.fontColor,
                    },
                    name: 'name-text-shape',
                    draggable: true,
                });
                group.addShape('text', {
                    attrs: {
                        text: cfg.keyInfo,
                        x: 0,
                        y: boxHeight / 2 + config.fontSize,
                        fontSize: config.fontSize,
                        textAlign: 'left',
                        textBaseline: 'middle',
                        fill: config.fontColor,
                    },
                    name: 'keyInfo-text-shape',
                    draggable: true,
                });
                // 头像
                group.addShape('image', {
                    attrs: {
                        x: padding_Left - imageRect - 5,
                        y: boxHeight / 2 - imageRect / 2,
                        img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
                        width: imageRect,
                        height: imageRect
                    },
                    name: 'image-shape',
                    draggable: true,
                });
                return container
            },
            setState: nodeBasicMethod.setState,
            afterDraw: nodeBasicMethod.afterDraw
        })
        const graph = new G6.Graph({
            container: 'CoreShape',
            width: 500,
            height: 300,
            nodeStateStyles: {
                //  可以设置多种状态来对应激活
                // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
                hover: {
                    fillOpacity: 0.1,
                    lineWidth: 3,
                },
            },
        });
        graph.data(data);
        graph.render();
        // 监听鼠标进入节点事件
        graph.on('node:mouseenter', (evt) => {
            const node = evt.item;
            // 激活该节点的 hover 状态
            graph.setItemState(node, 'hover', true);
        });
        // 监听鼠标离开节点事件
        graph.on('node:mouseleave', (evt) => {
            const node = evt.item;
            // 关闭该节点的 hover 状态
            graph.setItemState(node, 'hover', false);
        });
    },
};
</script>

<style scoped>
#CoreShape {
    width: 500px;
    height: 300px;
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