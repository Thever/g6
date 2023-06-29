<template>
  <div id="app">
    <nav>
      <h1>展示样式与功能</h1>
      起步：
      <router-link to="/">首页</router-link> |
      <router-link to="/demo">demo | </router-link>
      <br />
      入门：
      <router-link to="/introductionview">默认展示效果 | </router-link>
      <router-link to="/introductionviewtwo">优化node 和 edge | </router-link>
      <router-link to="/introductionviewthree">force-layout力布局 | </router-link>
      <router-link to="/introductionviewfour">图的交互 | </router-link>
      <router-link to="/introductionviewfive">插件和工具 | </router-link>
      <router-link to="/introductionviewsix">开启全局动画 | </router-link>
      <br />
      核心概念：
      <router-link to="/coregraph">Graph图 | </router-link>
      <router-link to="/coregraphitem">Graph图元素 | </router-link>
      <router-link to="/coreshape">图形shape | </router-link>
      <router-link to="/corenode">节点node | </router-link>
      <router-link to="/coreedge">边edge | </router-link>
      <router-link to="/corecombo">集合combo | </router-link>
      <router-link to="/corestyle">样式style | </router-link>
      <br />
      相关操作：
      <router-link to="/actionstyle">更新节点或边的样式 | </router-link>
      <router-link to="/actionzindex">更改节点或边的层级 | </router-link>
      <router-link to="/actionshowhide">设置节点或边的显隐 | </router-link>
      <router-link to="/actiontwopointmanyedge">按需求自定义边 | </router-link>
      <router-link to="/actionlockunlocknode">锁定解锁节点 | </router-link>
      <br />
      布局-一般图：
      <br />
      力导向布局:
      <router-link to="/forceone">力导向布局-Force2聚类及固定拖拽节点 | </router-link>
      <router-link to="/forcetwo">力导向布局-基本力导向布局及节点拖拽 | </router-link>
      <router-link to="/forcethree">力导向布局-基本 Force Atlas 2 | </router-link>
      <router-link to="/forcefour">力导向布局-力导向布局防止节点重叠 | </router-link>
      <router-link to="/forcefive">力导向布局-力导向布局聚类 | </router-link>
      <router-link to="/forcesix">力导向布局-定制不同节点的参数 | </router-link>
      <router-link to="/forceseven">力导向布局-固定被拖拽节点 | </router-link>
      <router-link to="/forceeight">力导向布局-力导向布局参数动态变化 | </router-link>
      <router-link to="/forcenine">力导向布局-力导向气泡图 | </router-link>
      <router-link to="/forceten">力导向布局-约束在范围内布局 | </router-link>
      <router-link to="/forceeleven">力导向布局-GForce 固定被拖拽的节点 | </router-link>
      <br />
      Dagre 流程图:
      <router-link to="/dagreone">Dagre 流程图-Dagre 流程图| </router-link>
      <router-link to="/dagretwo">Dagre 流程图-带有 Combo 的流程图| </router-link>
      <router-link to="/dagrethree">Dagre 流程图-自左向右的 Dagre 上对齐| </router-link>
      <router-link to="/dagrefour">Dagre 流程图-自左向右的 Dagre| </router-link>
      <router-link to="/dagrefive">Dagre 流程图-Dagre 布局参数动态变化| </router-link>
      <br />
      Fruchterman 图布局:
      <router-link to="/fruchtermanone">Fruchterman 图布局-基本 Fruchterman 布局| </router-link>
      <router-link to="/fruchtermantwo">Fruchterman 图布局-Fruchterman 聚类布局| </router-link>
      <router-link to="/fruchtermanthree">Fruchterman 图布局-Fruchterman 布局参数动态变化| </router-link>
      <router-link to="/fruchtermanfour">Fruchterman 图布局-Fruchterman 使用 Web-worker| </router-link>
      <router-link to="/fruchtermanfive">Fruchterman 图布局-Fruchterman 固定被拖拽的节点| </router-link>
      <br />
      Radial 辐射布局:
      <router-link to="/radialone">Radial 辐射布局-基本 Radial 辐射布局| </router-link>
      <router-link to="/radialtwo">Radial 辐射布局-防止节点重叠的严格辐射布局| </router-link>
      <router-link to="/radialthree">Radial 辐射布局-防止节点重叠的非严格辐射布局| </router-link>
      <router-link to="/radialfour">Radial 辐射布局-交互扩展节点的辐射布局| </router-link>
      <router-link to="/radialfive">Radial 辐射布局-Radial 布局参数动态变化| </router-link>
      <router-link to="/radialsix">Radial 辐射布局-同层节点按照指定字段聚类| </router-link>
      <br />
      Circular 环形布局：
      <router-link to="/circularone">Circular 环形布局-基本 Circular 布局| </router-link>
      <router-link to="/circulartwo">Circular 环形布局-按照节点度数排序的 Circular 布局| </router-link>
      <router-link to="/circularthree">Circular 环形布局-螺旋线布局| </router-link>
      <router-link to="/circularfour">Circular 环形布局-分割环形布局| </router-link>
      <router-link to="/circularfive">Circular 环形布局-Circular 布局参数动态变化| </router-link>
      <br />
      Grid 网格布局：
      <router-link to="/gridone">Grid 网格布局-基本 Grid 网格布局| </router-link>
      <router-link to="/gridtwo">Grid 网格布局-指定排序方式的网格布局| </router-link>
      <br />
      Concentric 同心圆布局:
      <router-link to="/concentricone">Concentric 同心圆布局-基本 Concentric 同心圆布局| </router-link>
      <br />
      MDS 布局:
      <router-link to="/mdsone">MDS 布局-基本 MDS 布局| </router-link>
      <br />
      Arc Diagram 弧线图:
      <router-link to="/arcdiagramone">Arc Diagram 弧线图-基本弧线图| </router-link>
      <router-link to="/arcdiagramtwo">Arc Diagram 弧线图-环形弧线图| </router-link>
      <br />
      Combo 相关布局:
      <router-link to="/comboone">Combo 相关布局-ComboCombined 组合布局| </router-link>
      <router-link to="/combotwo">Combo 相关布局-基本 Combo 力导向布局| </router-link>
      <br />
      Gpu 图布局:
      <router-link to="/gpuone">Gpu 图布局-GPU Fruchterman 小数据| </router-link>
      <router-link to="/gputwo">Gpu 图布局-GPU Fruchterman 复杂数据| </router-link>
      <router-link to="/gputhree">Gpu 图布局-GPU Fruchterman 复杂数据 + WebWorker| </router-link>
      <router-link to="/gpufour">Gpu 图布局-GPU Fruchterman 聚类布局| </router-link>
      <router-link to="/gpufive">Gpu 图布局-GPU Fruchterman 布局参数动态变化| </router-link>
      <router-link to="/gpusix">Gpu 图布局-GPU gForce 小数据| </router-link>
      <router-link to="/gpuseven">Gpu 图布局-GPU gForce 复杂数据| </router-link>
      <router-link to="/gpueight">Gpu 图布局-CPU gForce 小数据| </router-link>
      <br />
      布局机制:
      <router-link to="/layoutone">布局机制-布局切换| </router-link>
      <router-link to="/layouttwo">布局机制-子图布局| </router-link>
      <router-link to="/layoutthree">布局机制-流水线子图布局| </router-link>
      <router-link to="/layoutfour">布局机制-数据动态切换| </router-link>
      <router-link to="/layoutfive">布局机制-自定义二分图布局| </router-link>
      <router-link to="/layoutsix">布局机制-布局时机监听| </router-link>
      <br />
      AI智能布局推荐:
      <router-link to="/layoutai">AI智能布局推荐-AI智能布局| </router-link>
      <br />
      交互与事件:
      <router-link to="/interactionandeventone">监听和绑定事件| </router-link>
      <router-link to="/interactionandeventtwo">内置的 Behavior| </router-link>
      <router-link to="/interactionandeventthree">自定义交互 Behavior| </router-link>
      <router-link to="/interactionandeventfour">交互模式mode| </router-link>
      <router-link to="/interactionandeventfive">状态| </router-link>
      <br />
      基础动画:
      <router-link to="/animationshow">基础动画| </router-link>
      <router-link to="/animationshowtwo">状态与动画| </router-link>
      <br />
      常用插件:
      <router-link to="/pluginone">提示框| </router-link>
      <router-link to="/plugintwo">上下文菜单| </router-link>
      <router-link to="/pluginthree">Minimap| </router-link>
      <router-link to="/pluginfour">边绑定| </router-link>
      <router-link to="/pluginfive">工具栏| </router-link>
      <router-link to="/pluginsix">时间轴| </router-link>
      <router-link to="/pluginseven">鱼眼放大镜| </router-link>
      <router-link to="/plugineight">边过滤镜| </router-link>
      <router-link to="/pluginnine">对齐线| </router-link>
      <router-link to="/pluginten">图例| </router-link>
      <hr>
      <br />
      凯子带你学G6:
      <router-link to="/learnone">起步| </router-link>
      <router-link to="/learntwo">canvas绘制图形| </router-link>
      <router-link to="/learnthree">节点和边的样式,交互模式| </router-link>
      <router-link to="/learnfour">拖拽添加节点| </router-link>
      <router-link to="/learnfive">拖拽添加节点封装组件| </router-link>
      <router-link to="/learnsix">自定义节点| </router-link>
      <router-link to="/learnseven">自定义节点2| </router-link>
      <router-link to="/learneight">自定义行为| </router-link>
      <router-link to="/learnnine">自定义边| </router-link>
      <router-link to="/learnten">自定义combo(泳道图)| </router-link>
      <router-link to="/learneleven">自定义脑图| </router-link>
      <router-link to="/learntweleve">自定义拖拽| </router-link>
      <router-link to="/learnthirteen">iconfont处理| </router-link>
      <br />
      <router-link to="/learnfourteen">图片合成| </router-link>
      <router-link to="/learnfifteen">自定义两侧展开的复杂节点| </router-link>
      <router-link to="/learnsixteen">多种交互模式切换| </router-link>
      <br />
      自己写编辑器：
      <router-link to="/startone">1.选择添加节点| </router-link>
    </nav>
    <router-view />
  </div>
</template>
<style>
nav {
  text-align: center;
  padding-bottom: 10px;
}

/* 插件样式 */
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}

#contextMenu {
  position: absolute;
  list-style-type: none;
  padding: 10px 8px;
  left: -150px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
}

#contextMenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0px;
}

#contextMenu li:hover {
  color: #aaa;
}

.g6-minimap-container {
  border: 1px solid #e2e2e2;
}

.g6-minimap-viewport {
  border: 2px solid rgb(25, 128, 255);
}
</style>
