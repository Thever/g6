<template>
    <div class="set-block">
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'PluginOne',
    mounted() {
        G6.registerNode(
            'rNode',
            {
                drawShape: (cfg, group) => {
                    const rect = group.addShape('rect', {
                        attrs: {
                            x: -cfg.size[0] / 2,
                            y: -cfg.size[1] / 2,
                            width: cfg.size[0],
                            height: cfg.size[1],
                            ...cfg.style,
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: 'rect-shape',
                    });
                    const responseRect = group.addShape('rect', {
                        attrs: {
                            width: 30,
                            height: 15,
                            x: -cfg.size[0] / 2 + 5,
                            y: -cfg.size[1] / 2 + 5,
                            fill: '#fff',
                            stroke: cfg.style.stroke,
                            lineWidth: 1,
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: 'tooltip-response-shape',
                    });
                    const responseText = group.addShape('text', {
                        attrs: {
                            text: 'hover here!',
                            fill: '#f00',
                            x: -cfg.size[0] / 2 + 10,
                            y: -cfg.size[1] / 2 + 10,
                            textBaseline: 'top',
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: 'tooltip-response-text-shape',
                    });
                    const textBBox = responseText.getBBox();
                    responseRect.attr({
                        width: textBBox.width + 10,
                        height: textBBox.height + 10,
                    });
                    return rect;
                },
            },
            'rect',
        );
        const data = {
            nodes: [
                {
                    id: '0',
                    label: 'A',
                    x: 220,
                    y: 100,
                    description: 'This is node A.',
                    subdescription: 'This is subdescription of node A.',
                },
                {
                    id: '2',
                    label: 'No Tooltip',
                    x: 150,
                    y: 310,
                    description: 'This is node B.',
                    subdescription: 'This is subdescription of node B.',
                },
                {
                    id: '3',
                    label: 'C',
                    x: 320,
                    y: 310,
                    description: 'This is node C.',
                    subdescription: 'This is subdescription of node C.',
                },
            ],
            edges: [
                {
                    id: 'e1',
                    source: '0',
                    target: '2',
                    description: 'This is edge from node 0 to node 2.',
                },
                {
                    id: 'e2',
                    source: '0',
                    target: '3',
                    description: 'This is edge from node 0 to node 3.',
                },
            ],
        };
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = 'Hover the sub rect with red border to show the tooltip.';
        const container = document.getElementById('container');
        container.appendChild(descriptionDiv);

        const width = container.scrollWidth;
        const height = (container.scrollHeight || 500) - 30;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            linkCenter: true,
            defaultNode: {
                size: [100, 100],
                type: 'rNode',
                style: {
                    fill: '#DEE9FF',
                    stroke: '#5B8FF9',
                },
            },
            defaultEdge: {
                style: {
                    stroke: '#b5b5b5',
                    lineAppendWidth: 3,
                },
            },
            modes: {
                default: [
                    'drag-node',
                    {
                        type: 'tooltip',
                        formatText: function formatText(model) {
                            const text = 'description: ' + model.description;
                            return text;
                        },
                        offset: 30,
                        shouldBegin: (e) => {
                            if (e.item.getModel().id === '2') return false;
                            const target = e.target;
                            if (target.get('name') === 'tooltip-response-text-shape') return true;
                            return false;
                        },
                    },
                ],
            },
        });
        graph.data(data);
        graph.render();

        graph.on('node:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('node:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });
        graph.on('edge:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('edge:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });
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
    /* 保证tooltip展示正常 */
    position: relative;
}
</style>