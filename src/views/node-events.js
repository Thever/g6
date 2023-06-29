export default {
  'nodeState:hover' (name, value, group) {
    //  按index查找所有children
    const _item = group.getChildByIndex(0);
    //  获取样式属性
    const { style } = _item.cfg.attrs;

    if (value) {
      // 设置的状态生效
      _item.attr(style[name]);
    } else {
      // 清除当前状态
      _item.attr(style['nodeState:default']);
    }
  },
  'nodeState:selected' (name, value, group) {
    const _item = group.getChildByIndex(0);
    const { style } = _item.cfg.attrs;
    //  查找文本节点
    const text = group.get('children').find(child => child.cfg.type === 'text');

    if (value) {
      // 设置的状态生效
      _item.attr(style[name]);
      //  文本存在labelCfg才对文本节点进行改造
      if (style[name].labelCfg) {
        text.attr(style[name].labelCfg.style);
      }
    } else {
      // 清除当前状态
      _item.attr(style['nodeState:default']);
    }
  },
};
