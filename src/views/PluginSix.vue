<template>
    <div class="set-block">
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'PluginSix',
    mounted() {
        const data = {
            nodes: [],
            edges: [],
        };

        for (let i = 0; i < 100; i++) {
            const id = `node-${i}`;
            data.nodes.push({
                id,
                date: `2020${i}`,
                value: Math.round(Math.random() * 300),
            });

            data.edges.push({
                source: `node-${Math.round(Math.random() * 90)}`,
                target: `node-${Math.round(Math.random() * 90)}`,
            });
        }

        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = (container.scrollHeight || 500) - 100;
        const timeBarData = [];

        const nodeSize = 20;

        for (let i = 0; i < 100; i++) {
            timeBarData.push({
                date: `2020${i}`,
                value: Math.round(Math.random() * 300),
            });
        }

        const timebar = new G6.TimeBar({
            x: 0,
            y: 0,
            width,
            height: 150,
            padding: 10,
            type: 'trend',
            trend: {
                data: timeBarData,
            },
        });

        // constrained the layout inside the area
        const constrainBox = { x: 10, y: 10, width: 580, height: 450 };

        const onTick = () => {
            let minx = 99999999;
            let maxx = -99999999;
            let miny = 99999999;
            let maxy = -99999999;
            // let maxsize = -9999999;
            data.nodes.forEach((node) => {
                if (minx > node.x) {
                    minx = node.x;
                }
                if (maxx < node.x) {
                    maxx = node.x;
                }
                if (miny > node.y) {
                    miny = node.y;
                }
                if (maxy < node.y) {
                    maxy = node.y;
                }
            });
            const scalex = (constrainBox.width - nodeSize / 2) / (maxx - minx);
            const scaley = (constrainBox.height - nodeSize / 2) / (maxy - miny);
            data.nodes.forEach((node) => {
                node.x = (node.x - minx) * scalex + constrainBox.x;
                node.y = (node.y - miny) * scaley + constrainBox.y;
            });
        };

        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            linkCenter: true,
            plugins: [timebar],
            layout: {
                type: 'force',
                preventOverlap: true,
                onTick,
            },
            defaultNode: {
                size: nodeSize,
                type: 'circle',
                style: {
                    fill: '#DEE9FF',
                    stroke: '#5B8FF9',
                },
            },
            modes: {
                default: ['drag-node'],
            },
        });
        graph.data(data);
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
    position: relative;
}

#container {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
    /* 保证tooltip展示正常 */
    position: relative;
}

.g6-component-toolbar li {
    list-style-type: none !important;
}
</style>