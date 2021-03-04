import { getSetting, chooseAddress, openSetting,showModal,showToast } from "../../utils/asyncWx";
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
  },

  //点击获取收货地址
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      console.log(address);
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let cart = this.data.cart;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked = !cart[index].checked;
    
    this.setCart(cart);
  },

  //设置购物车状态等
  setCart(cart){
    wx.setStorageSync('cart', cart);
    //全选
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    });
    if(cart.lenght==0){
      allChecked=false;
    }

    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
  },

  handleItemAllCheck(){
    let cart = this.data.cart;
    let allChecked = this.data.allChecked;
    allChecked = !allChecked;
    cart.forEach(v=>{
      v.checked = allChecked;
    });
    this.setCart(cart);
  },

  async handleItemNumEdit(e){
    const {id,operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index= cart.findIndex(v=>v.goods_id===id);
    cart[index].num+=operation;
    if(cart[index].num<1){
      cart[index].num=1;
      const res = await showModal({content:"是否将该商品从购物车中删除?"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }
    this.setCart(cart);
  },

  //结算
  async handlePay(){
    //判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:'您还没有选择收货地址!'});
      return;
    }
    //是否选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品!"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
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
    const cart = wx.getStorageSync('cart')||[];
    this.setData({
      address
    })
    this.setCart(cart);
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