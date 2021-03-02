
let ajaxTimes=0;
export const request=(params)=>{
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask:true
  });
  //定义公共url
  //const baseUrl = "https://";
  //
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          setTimeout(() => {
            wx.hideLoading();
          }, 200);
        }
      }
    });
  })
}