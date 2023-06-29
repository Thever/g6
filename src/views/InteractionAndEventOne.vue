<template>
    <div class="set-block">
        <p>全部的交互事件参考：https://g6.antv.antgroup.com/api/Event#edge-%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6</p>
        <p>Behavior行为定义参考：https://g6.antv.antgroup.com/api/Behavior </p>
        <!-- 渲染的画布容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: 'InteractionAndEventOne',
    mounted() {
                // 数据源
                const data = {
            nodes: [
                {
                    id: 'node0',
                    x: 100,
                    y: 100,
                    size: 20,
                },
                {
                    id: 'node1',
                    x: 200,
                    y: 200,
                    size: 20,
                },
            ],
            edges: [
                {
                    id: 'edge0',
                    source: 'node0',
                    target: 'node1',
                },
            ],
        };

        // 实例化图
        const graph = new G6.Graph({
            container: 'container',
            width: 1000,
            height: 800,
            // 为方便演示，加粗边
            defaultEdge: {
                style: {
                    lineWidth: 5,
                },
            },
            //  开启相关模式
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
        });

        // 读取数据
        graph.data(data);
        // 渲染图
        graph.render();

        //  node交互事件
        graph.on('node:click', (evt) => {
            console.log(`node:click, 节点被点击了`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dblclick', (evt) => {
            console.log(`node:click, 鼠标双击左键节点时触发，同时会先触发两次 node:click，再触发dblclick`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mouseenter', (evt) => {
            console.log(`node:mouseenter, 鼠标移入节点时触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mousemove', (evt) => {
            console.log(`node:mousemove, 鼠标在节点内部移到时不断触发，不能通过键盘触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mouseout', (evt) => {
            console.log(`node:mouseout, 鼠标移出节点后触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mouseover', (evt) => {
            console.log(`node:mouseover, 鼠标移入节点上方时触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mouseleave', (evt) => {
            console.log(`node:mouseleave, 鼠标移出节点时触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mousedown', (evt) => {
            console.log(`node:mousedown, 鼠标按钮在节点上按下（左键或者右键）时触发，不能通过键盘触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:mouseup', (evt) => {
            console.log(`node:mouseup, 节点上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dragstart', (evt) => {
            console.log(`node:dragstart, 当节点开始被拖拽的时候触发的事件，此事件作用在被拖曳节点上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:drag', (evt) => {
            console.log(`node:drag, 当节点在拖动过程中时触发的事件，此事件作用于被拖拽节点上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dragend', (evt) => {
            console.log(`node:dragend, 当拖拽完成后触发的事件，此事件作用在被拖曳节点上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dragenter', (evt) => {
            console.log(`node:dragenter, 当拖曳节点进入目标元素的时候触发的事件，此事件作用在目标元素上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dragleave', (evt) => {
            console.log(`node:dragleave, 当拖曳节点离开目标元素的时候触发的事件，此事件作用在目标元素上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:dragover', (evt) => {
            console.log(`node:dragleave, 当拖曳节点在另一目标元素上移动时触发此事件，此事件作用在目标元素上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:drop', (evt) => {
            console.log(`node:drop, 被拖拽的节点在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:touchstart', (evt) => {
            console.log(`node:touchstart, 在触控屏上，当节点开始被触碰的时候触发的事件`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:touchmove', (evt) => {
            console.log(`node:touchmove, 在触控屏上，当节点开始被触碰过程中触发的事件`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:touchend', (evt) => {
            console.log(`node:touchend, 在触控屏上，当节点开始被触碰结束的时候触发的事件`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        graph.on('node:contextmenu', (evt) => {
            console.log(`node:contextmenu, 用户在节点上右击鼠标时触发并打开右键菜单`, evt)
            console.log(`获取触发的node`, evt.item)
            console.log(`获取触发的node的相关数据`, evt.item._cfg.model)
        })
        //  edge交互事件
        graph.on('edge:click', (evt) => {
            console.log(`edge:click, 用户在节点上右击鼠标时触发并打开右键菜单`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:dblclick', (evt) => {
            console.log(`edge:dblclick, 鼠标双击左键边时触发，会先触发两次 edge:click，再触发edge:dblclick`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mouseenter', (evt) => {
            console.log(`edge:dblclick, 鼠标移入边时触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mousemove', (evt) => {
            console.log(`edge:mousemove, 鼠标在边上移到时不断触发，不能通过键盘触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mouseout', (evt) => {
            console.log(`edge:mouseout, 鼠标移出边后触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mouseover', (evt) => {
            console.log(`edge:mouseover, 鼠标移入边上方时触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mouseleave', (evt) => {
            console.log(`edge:mouseleave, 鼠标移出边时触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mousedown', (evt) => {
            console.log(`edge:mousedown, 鼠标按钮在边上按下（左键或者右键）时触发，不能通过键盘触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:mouseup', (evt) => {
            console.log(`edge:mouseup, 边上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:dragenter', (evt) => {
            console.log(`edge:dragenter, 当拖曳元素进入目标边元素的时候触发的事件，此事件作用在目标边元素上`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:dragleave', (evt) => {
            console.log(`edge:dragleave, 当拖曳元素离开目标边元素的时候触发的事件，此事件作用在目标边元素上`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:dragover', (evt) => {
            console.log(`edge:dragover, 当拖曳元素在另一目标边上移动时触发此事件，此事件作用在目标边元素上`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:drop', (evt) => {
            console.log(`edge:drop, 被拖拽的元素在目标边元素上同时鼠标放开触发的事件，此事件作用在目标边元素上`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        graph.on('edge:contextmenu', (evt) => {
            console.log(`edge:contextmenu, 用户在边上右击鼠标时触发并打开右键菜单`, evt)
            console.log(`获取触发的edge`, evt.item)
            console.log(`获取触发的edge的相关数据`, evt.item._cfg.model)
        })
        
        //  Combo交互事件，继承所有node事件

        //  Canvas 交互事件
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:click, 鼠标左键单击画布时触发`, evt)
        })
        graph.on('canvas:dblclick', (evt) => {
            console.log(`canvas:dblclick, 鼠标双击左键画布时触发,先触发两次canvas:click，再触发canvas:dblclick`, evt)
        })
        graph.on('canvas:mouseenter', (evt) => {
            console.log(`canvas:mouseenter, 鼠标移入画布时触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mousemove, 鼠标在画布内部移到时不断触发，不能通过键盘触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mouseout, 鼠标移出画布后触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mouseover, 鼠标移入画布上方时触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mouseleave, 鼠标移出画布时触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mousedown, 鼠标按钮在画布上按下（左键或者右键）时触发，不能通过键盘触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:mouseup, 画布上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:contextmenu, 用户在画布上右击鼠标时触发并打开右键菜单`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:dragstart, 当画布开始被拖拽的时候触发的事件，此事件作用在被拖曳画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:drag, 当画布在拖动过程中时触发的事件，此事件作用于被拖拽画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:dragend, 当拖拽完成后触发的事件，此事件作用在被拖曳画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:dragenter, 当拖曳画布进入目标元素的时候触发的事件，此事件作用在目标画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:dragleave, 当拖曳画布离开目标元素的时候触发的事件，此事件作用在目标画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:drop, 被拖拽的元素在空白画布上同时鼠标放开触发的事件，此事件作用在目标画布上`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:touchstart, 在触控屏上，当画布开始被触碰的时候触发的事件`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:touchmove, 在触控屏上，当画布开始被触碰过程中触发的事件`, evt)
        })
        graph.on('canvas:click', (evt) => {
            console.log(`canvas:touchend, 在触控屏上，当画布开始被触碰结束的时候触发的事件`, evt)
        })
        // // 鼠标点击节点，隐藏该节点
        // graph.on('node:click', (ev) => {
        //     const node = ev.item;
        //     console.log('before hide(), the nodevisible = ', node.get('visible'));
        //     node.hide();
        //     console.log('after hide(), the node visible = ', node.get('visible'));
        // });

        // // 鼠标点击边，隐藏该边
        // graph.on('edge:click', (ev) => {
        //     const edge = ev.item;
        //     console.log('before hide(), the edge visible = ', edge.get('visible'));
        //     edge.hide();
        //     console.log('after hide(), the edge visible = ', edge.get('visible'));
        // });

        // // 鼠标点击画布，显示所有节点和边
        // // eslint-disable-next-line no-unused-vars
        // graph.on('canvas:click', (ev) => {
        //     const nodes = graph.getNodes();
        //     const edges = graph.getEdges();
        //     nodes.forEach((node) => {
        //         node.show();
        //     });
        //     edges.forEach((edge) => {
        //         edge.show();
        //     });
        // });
    
    }
}
</script>

<style>
.set-block{
    width:1000px;
    height:auto;
    display:block;
    overflow:hidden;
    margin:0 auto;
}
#container {
    width: 1000px;
    height: 800px;
    display: block;
    margin: 0 auto;
    border: 1px solid skyblue;
}
</style>