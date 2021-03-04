// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: '体验问题',
      isActive: true
    }, {
      id: 1,
      value: '商品,商家投诉',
      isActive: false
    }],
    chooseImages:[]
  },
  handleTabsItemChange(e) {
    const index = e.detail.index;
    //修改原数组
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(result)=>{
        this.setData({chooseImages:[...this.data.chooseImages,...result.tempFilePaths]});
      }
    })
  },
  handleRemoveImg(e){
    const index = e.currentTarget.dataset.index;
    let {chooseImages} = this.data;
    chooseImages.splice(index,1);
    this.setData({chooseImages});
  }
})