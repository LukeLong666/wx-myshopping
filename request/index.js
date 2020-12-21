export const request=(params)=>{
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
      }
    });
  })
}