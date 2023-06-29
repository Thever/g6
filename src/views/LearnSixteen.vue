<template>
    <div>
        <select id="selector">
            <option value="default">Default mode</option>
            <option value="addNode">Add Node (by clicking canvas)</option>
            <option value="addEdge">Add Edge (by clicking two end nodes)</option>
        </select>
        <div id="mountNode"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
    mounted() {
        const data = {
            nodes: [{
                id: 'node1',
                x: 100,
                y: 200
            }, {
                id: 'node2',
                x: 300,
                y: 200
            }, {
                id: 'node3',
                x: 300,
                y: 300
            }],
            edges: [{
                id: 'edge1',
                target: 'node2',
                source: 'node1'
            }]
        };

        let addedCount = 0;
        G6.registerBehavior('click-add-edge', {
            getEvents() {
                return {
                    'node:click': 'onClick',
                    mousemove: 'onMousemove',
                    'edge:click': 'onEdgeClick' // 点击空白处，取消边
                };
            },
            onClick(ev) {
                const node = ev.item;
                const graph = this.graph;
                const point = {
                    x: ev.x,
                    y: ev.y
                };
                const model = node.getModel();
                if (this.addingEdge && this.edge) {
                    graph.updateItem(this.edge, {
                        target: model.id
                    });
                    // graph.setItemState(this.edge, 'selected', true);
                    this.edge = null;
                    this.addingEdge = false;
                } else {
                    this.edge = graph.addItem('edge', {
                        source: model.id,
                        target: point
                    });
                    this.addingEdge = true;
                }
            },
            onMousemove(ev) {
                const point = {
                    x: ev.x,
                    y: ev.y
                };
                if (this.addingEdge && this.edge) {
                    this.graph.updateItem(this.edge, {
                        target: point
                    });
                }
            },
            onEdgeClick(ev) {
                const currentEdge = ev.item;
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge == currentEdge) {
                    graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            }
        });

        // Register a custom behavior to add node
        G6.registerBehavior('click-add-node', {
            getEvents() {
                return {
                    'canvas:click': 'onClick'
                };
            },
            onClick(ev) {
                // eslint-disable-next-line no-unused-vars
                const graph = this.graph;
                // eslint-disable-next-line no-unused-vars
                const node = this.graph.addItem('node', {
                    x: ev.canvasX,
                    y: ev.canvasY,
                    id: `node-${addedCount}`, // 生成唯一的 id
                });
                addedCount++;
            }
        });

        const graph = new G6.Graph({
            container: 'mountNode',
            width: 500,
            height: 500,
            modes: {
                default: ['drag-node', 'click-select'],
                addNode: ['click-add-node', 'click-select'],
                addEdge: ['click-add-edge', 'click-select']
            },
            // The node styles in different states
            nodeStateStyles: {
                // The node styles in selected state, corresponds to the built-in click-select behavior
                selected: {
                    stroke: '#666',
                    lineWidth: 2,
                    fill: 'steelblue'
                }
            }
        });

        graph.data(data);
        graph.render();

        document.getElementById('selector').addEventListener('change', e => {
            const value = e.target.value;
            graph.setMode(value);
        });
    },
};
</script>

<style scoped>
.select-wrap {
    position: absolute;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    max-height: 160px;
    overflow: auto;
}

.select-wrap li {
    margin: 5px 0;
    padding: 0 10px;
    cursor: pointer;
}

.select-wrap li :hover {
    background: #f7f7f7;
}
#mountNode{
    width:500px;
    height:500px;
    background:skyblue;
}
</style>
