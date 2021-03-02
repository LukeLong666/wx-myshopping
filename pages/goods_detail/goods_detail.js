import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goodsId = options.goods_id;
    this.getGoodsDetail(goodsId);
  },

  //获取商品详情
  async getGoodsDetail(goods_id){
    const res = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id}})
    const goodsObjS = res.data.message;
    this.GoodsInfo = goodsObjS;
    this.setData({
      goodsObj:{
        goods_name:goodsObjS.goods_name,
        goods_price:goodsObjS.goods_price,
        goods_introduce:goodsObjS.goods_introduce,
        pics:goodsObjS.pics
      }
    })
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