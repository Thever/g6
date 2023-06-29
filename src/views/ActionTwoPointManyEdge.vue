<template>
    <div>
        <p>g6默认的edge样式为line只支持两点间一条edge</p>
        <p>两点间两条连线可以使用设置type:'quadratic',用默认的二阶贝塞尔曲线实现</p>
        <p>再更多连线需要自定义edge来实现了</p>
        <div id="ActionTwoPointManyEdge"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
    name: "ActionTwoPointManyEdge",
    mounted() {

        const edgeTypeColorMap = {
            type1: ["#531dab", "#391085", "#391085"],
            type2: ["#d9d9d9", "#bfbfbf", "#8c8c8c"],
            type3: ["#d3adf7", "#b37feb", "#9254de"]
        };
        // const INNER_CIRCLE_CLASS = "node-inner-circle";
        
        const defaultConf = {
            style: {
                lineAppendWidth: 5,
                lineDash: [0, 0],
                lineDashOffset: 0,
                opacity: 1,
                labelCfg: {
                    style: {
                        fillOpacity: 1
                    }
                }
            },
            /**
             * 绘制边
             * @override
             * @param  {Object} cfg   边的配置项
             * @param  {G.Group} group 边的容器
             * @return {G.Shape} 图形
             */
            drawShape(cfg, group) {
                const item = group.get("item");
                const shapeStyle = this.getShapeStyle(cfg, item);
                const shape = group.addShape("path", {
                    className: "edge-path",
                    attrs: shapeStyle
                });
                return shape;
            },
            drawLabel(cfg, group) {
                const labelCfg = cfg.labelCfg || {};
                const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
                const text = group.addShape("text", {
                    attrs: {
                        ...labelStyle,
                        text: cfg.label,
                        fontSize: 12,
                        fill: "#404040",
                        cursor: "pointer"
                    },
                    className: "edge-label"
                });

                return text;
            },

            /**
             * 获取图形的配置项
             * @internal 仅在定义这一类节点使用，用户创建和更新节点
             * @param  {Object} cfg 节点的配置项
             * @return {Object} 图形的配置项
             */
            getShapeStyle(cfg, item) {
                const { startPoint, endPoint } = cfg;
                const type = item.get("type");

                const defaultStyle = this.getStateStyle("default", true, item);

                if (type === "node") {
                    return Object.assign({}, cfg.style, defaultStyle);
                }

                const controlPoints = this.getControlPoints(cfg);
                let points = [startPoint]; // 添加起始点
                // 添加控制点
                if (controlPoints) {
                    points = points.concat(controlPoints);
                }
                // 添加结束点
                points.push(endPoint);
                const path = this.getPath(points);

                const style = Object.assign({}, { path }, cfg.style, defaultStyle);
                return style;
            },
            getControlPoints(cfg) {
                let controlPoints = cfg.controlPoints; // 指定controlPoints

                if (!controlPoints || !controlPoints.length) {
                    const { startPoint, endPoint } = cfg;
                    const innerPoint = G6.Util.getControlPoint(
                        startPoint,
                        endPoint,
                        0.5,
                        cfg.edgeOffset || 30
                    );
                    controlPoints = [innerPoint];
                }
                return controlPoints;
            },
            /**
             * 获取三次贝塞尔曲线的path
             *
             * @param {array} points 起始点和两个控制点
             * @returns
             */
            getPath(points) {
                const path = [];
                path.push(["M", points[0].x, points[0].y]);
                path.push(["Q", points[1].x, points[1].y, points[2].x, points[2].y]);
                return path;
            },
            /**
             * 根据不同状态，获取不同状态下的样式值
             * @param {string} name
             * @param {string} value
             * @param {Item} item
             */
            getStateStyle(name, value, item) {
                const model = item.getModel();
                const { style = {} } = model;

                const defaultStyle = Object.assign({}, this.style);

                // 更新颜色
                return {
                    ...defaultStyle,
                    lineWidth: 1,
                    stroke:
                        edgeTypeColorMap[model.edgeType] && edgeTypeColorMap[model.edgeType][0],
                    ...style
                };
            }
        };

        G6.registerEdge("quadratic-label-edge", defaultConf, "quadratic");

        const GRAPH_CONTAINER = "ActionTwoPointManyEdge";
        const data = {
            nodes: [
                {
                    id: "node1",
                    x: 100,
                    y: 150,
                    label: "node1"
                },
                {
                    id: "node2",
                    x: 300,
                    y: 150,
                    label: "node2"
                }
            ],
            edges: [
                {
                    source: "node1",
                    target: "node2",
                    edgeType: "type1"
                },
                {
                    source: "node2",
                    target: "node1",
                    edgeType: "type2"
                },
                {
                    source: "node2",
                    target: "node1",
                    edgeType: "type3",
                    edgeOffset: -20
                }
            ]
        };

        const width = document.getElementById(GRAPH_CONTAINER).scrollWidth;
        const height = document.getElementById(GRAPH_CONTAINER).scrollHeight || 500;
        const graph = new G6.Graph({
            container: GRAPH_CONTAINER,
            width,
            height,
            modes: {
                default: [
                    {
                        type: "drag-node",
                        delegate: false
                    }
                ]
            },
            defaultNode: {
                style: {
                    fill: "#DEE9FF",
                    stroke: "#5B8FF9"
                },
                labelCfg: {
                    style: {
                        fontSize: 12
                    }
                }
            },
            defaultEdge: {
                type: "quadratic-label-edge"
            }
        });

        graph.data(data);
        graph.render();

    },
};
</script>

<style scoped>
#ActionTwoPointManyEdge {
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