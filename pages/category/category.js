import { request } from '../../request/index.js'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    //被激活的菜单
    currentIndex:0,
    scrollTop:0
  },
  categoryList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const categoryList = wx.getStorageSync('cates');
    if(!categoryList){
      this.getCategoryList();
    }else{
      if(Date.now()-categoryList.time>1000*60*5){
        console.log("新的");
        this.getCategoryList();
      }else{
        console.log("旧的");
        this.categoryList = categoryList.data;
        let that = this;
        let leftMenuList = this.categoryList.map(v => v.cat_name);
        let rightContent = this.categoryList[0].children;
        that.setData({
          leftMenuList,rightContent
        })
      }
    }
  },

  //获取分类数据
  async getCategoryList() {
    // let that = this;
    // request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    // })
    //   .then(result => {
    //     this.categoryList = result.data.message;

    //     //存入本地存储
    //     wx.setStorageSync('cates', {time:Date.now(),data:this.categoryList});

    //     let leftMenuList = this.categoryList.map(v => v.cat_name);
    //     let rightContent = this.categoryList[0].children;
    //     that.setData({
    //       leftMenuList,rightContent
    //     })
    //   })

    const result = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'});
    this.categoryList = result.data.message;
    //存入本地存储
    let that = this;
    wx.setStorageSync('cates', {time:Date.now(),data:this.categoryList});
    let leftMenuList = this.categoryList.map(v => v.cat_name);
    let rightContent = this.categoryList[0].children;
    that.setData({
      leftMenuList,rightContent
    })
  },

  //左侧菜单点击事件
  handleItemTap(e){
    //获取index
    let index = e.currentTarget.dataset.index;
    //设置右边的内容
    let rightContent = this.categoryList[index].children;
    this.setData({
      scrollTop:0,
      currentIndex:index,
      rightContent
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})