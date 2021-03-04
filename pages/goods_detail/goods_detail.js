import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //获取页面栈
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    console.log(currentPage);
    let options = currentPage.options;
    const goodsId = options.goods_id;
    this.getGoodsDetail(goodsId);

  },

  //获取商品详情
  async getGoodsDetail(goods_id){
    const res = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id}})
    const goodsObjS = res.data.message;
    this.GoodsInfo = goodsObjS;
    
    //获取收藏数组
    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v=>{v.goods_id===this.GoodsInfo.goods_id});
    this.setData({
      goodsObj:{
        goods_name:goodsObjS.goods_name,
        goods_price:goodsObjS.goods_price,
        goods_introduce:goodsObjS.goods_introduce,
        pics:goodsObjS.pics
      },
      isCollect
    });
  },

  //点击收藏
  handleCollect(){
    let isCollect = false;
    //获取收藏数组
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏成功!',
        icon:'success',
        mask:true
      })
    }else{
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功!',
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({isCollect});
  },

  handlePreviewImage(e){
    let urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    })
  },

  //加入购物车
  handleCartAdd(e){
    let cart = wx.getStorageSync('cart')||[];
    //判断是否已经存在
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon:'seccuess',
      mask:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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