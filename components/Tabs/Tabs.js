// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      //获取值
      const index = e.currentTarget.dataset.index;
      //出发 父组件的时间
      this.triggerEvent("tabsItemChange",{index});
      console.log(index);
    }
  }
})
