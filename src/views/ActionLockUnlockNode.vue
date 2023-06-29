<template>
    <!-- 渲染的画布容器 -->
    <div id="ActionLockUnlockNode"></div>
</template>

<script>
import G6 from '@antv/g6';
/* 拖动画布时候不处理锁定的节点 */
const Util = G6.Util;
const abs = Math.abs;
const DRAG_OFFSET = 10;
const body = document.body;
const ALLOW_EVENTS = [16, 17, 18];
/* 拖动画布时候不处理锁定的节点 */

export default {
    name: 'ActionLockUnlockNode',
    mounted() {
        
        //  定义拖动画布时候不处理锁定的节点
        G6.registerBehavior('drag-canvas-exclude-lockedNode', {
            getDefaultCfg() {
                return {
                    direction: 'both',
                };
            },
            getEvents() {
                return {
                    'canvas:mousedown': 'onMouseDown',
                    'canvas:mousemove': 'onMouseMove',
                    'canvas:mouseup': 'onMouseUp',
                    'canvas:click': 'onMouseUp',
                    'canvas:mouseleave': 'onOutOfRange',
                    keyup: 'onKeyUp',
                    keydown: 'onKeyDown',
                };
            },
            updateViewport(e) {
                const origin = this.origin;
                const clientX = +e.clientX;
                const clientY = +e.clientY;
                if (isNaN(clientX) || isNaN(clientY)) {
                    return;
                }
                let dx = clientX - origin.x;
                let dy = clientY - origin.y;
                if (this.get('direction') === 'x') {
                    dy = 0;
                } else if (this.get('direction') === 'y') {
                    dx = 0;
                }
                this.origin = {
                    x: clientX,
                    y: clientY,
                };
                // 和内置 drag-canvas 不同的地方是在这里
                const lockedNodes = this.graph.findAll('node', (node) => !node.hasLocked());
                lockedNodes.forEach((node) => {
                    node.get('group').translate(dx, dy);
                });
            },
            onMouseDown(e) {
                if (this.keydown) {
                    return;
                }

                this.origin = { x: e.clientX, y: e.clientY };
                this.dragging = false;
            },
            onMouseMove(e) {
                if (this.keydown) {
                    return;
                }

                e = Util.cloneEvent(e);
                const graph = this.graph;
                if (!this.origin) {
                    return;
                }
                if (this.origin && !this.dragging) {
                    if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
                        return;
                    }
                    if (this.shouldBegin(e, this)) {
                        e.type = 'dragstart';
                        graph.emit('canvas:dragstart', e);
                        this.dragging = true;
                    }
                }
                if (this.dragging) {
                    e.type = 'drag';
                    graph.emit('canvas:drag', e);
                }
                if (this.shouldUpdate(e, this)) {
                    this.updateViewport(e);
                }
            },
            onMouseUp(e) {
                if (this.keydown) {
                    return;
                }

                if (!this.dragging) {
                    this.origin = null;
                    return;
                }
                e = Util.cloneEvent(e);
                const graph = this.graph;
                if (this.shouldEnd(e, this)) {
                    this.updateViewport(e);
                }
                e.type = 'dragend';
                graph.emit('canvas:dragend', e);
                this.endDrag();
            },
            endDrag() {
                if (this.dragging) {
                    this.origin = null;
                    this.dragging = false;
                    // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
                    const fn = this.fn;
                    if (fn) {
                        body.removeEventListener('mouseup', fn, false);
                        this.fn = null;
                    }
                }
            },
            // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
            onOutOfRange(e) {
                if (this.dragging) {
                    const self = this;
                    const canvasElement = self.graph.get('canvas').get('el');
                    const fn = (ev) => {
                        if (ev.target !== canvasElement) {
                            self.onMouseUp(e);
                        }
                    };
                    this.fn = fn;
                    body.addEventListener('mouseup', fn, false);
                }
            },
            onKeyDown(e) {
                const code = e.keyCode || e.which;
                if (!code) {
                    return;
                }
                if (ALLOW_EVENTS.indexOf(code) > -1) {
                    this.keydown = true;
                } else {
                    this.keydown = false;
                }
            },
            onKeyUp() {
                this.keydown = false;
            },
        });

        // 定义数据源
        const data = {
            // 点集
            nodes: [
                {
                    id: 'node1',
                    x: 100,
                    y: 200,
                },
                {
                    id: 'node2',
                    x: 300,
                    y: 200,
                },
            ],
            // 边集
            edges: [
                // 表示一条从 node1 节点连接到 node2 节点的边
                {
                    source: 'node1',
                    target: 'node2',
                },
            ],
        };

        // 创建 G6 图实例
        const graph = new G6.Graph({
            container: 'ActionLockUnlockNode', // 指定图画布的容器 id，与第 9 行的容器对应
            // 画布宽高
            width: 800,
            height: 500,
            modes: {
                // 拖拽画布,缩放画布,添加的自定义behavior
                // default: ['drag-canvas', 'zoom-canvas', 'drag-canvas-exclude-lockedNode']
                default: ['drag-canvas', 'drag-canvas-exclude-lockedNode']
            },
        });
        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();
    }
}
</script>

<style>
#ActionLockUnlockNode {
    width: 800px;
    height: 500px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>