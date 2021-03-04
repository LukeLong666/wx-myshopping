import {request} from "../../request/index.js";

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:""
  },
  TimeId:-1,
  //监听文本框输入事件
  handleInput(e){
    //获取输入框的值
    const {value} = e.detail;
    if(!value.trim()){
      return;
    }
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.setData({isFocus:true});
      this.qsearch(value);
    }, 500);
  }, 
  handleCancel(){
    this.setData({
      isFocus:false,
      inputValue:"",
      goods:[]
    })
  },
  async qsearch(query){
    const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",data:{query}});
    this.setData({
      goods:res.data.message
    })
  } 
})