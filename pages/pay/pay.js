import { getSetting, chooseAddress, openSetting,showModal,showToast,requestPayment } from "../../utils/asyncWx";
import {request} from "../../request/index.js";
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0,
  },

  //点击支付
  async handleOrderPay(){
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return;
    }
    console.log("已经存在token");

    const header = {Authorization:token};
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>{
      goods.push({goods_id:v.goods_id,goods_number:v.num,goods_price:v.goods_price});
    });
    const orderParams = {order_price,consignee_addr,goods};
    const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create",method:"post",data:orderParams,header:header});
    const order_number = res.data.message.order_number;

    //预支付接口
    const res2 = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder",method:"post",header:header,data:{order_number}});
    const pay = res2.data.message.pay;
    console.log(pay);
    const res3 = await requestPayment(pay);
    console.log(res3);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //收货地址
    const address = wx.getStorageSync('address');
    //购物车数据
    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num;
    })
    this.setData({
      address,cart,totalNum,totalPrice
    })
    
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