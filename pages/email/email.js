// pages/email/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes:[],
    time:'',
    con:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    console.log('uid='+options.uid);
    var a=options.uid;
    this.show(a);
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

  },
  show: function (a) {
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_message inner join sr_user on sr_message.Accept = sr_user.Identity where sr_user.Identity="+a
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            mes:res.data.data.sql
          })
        } else {
          }
      }
    })
  }
})