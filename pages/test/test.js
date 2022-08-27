// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //canIUseGetUserProfile: false,
    //canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
    dreamCode:'',
    dreamResult:[],
    code:'',
    name:'',
    confirmedCount:'',
    curedCount:'',
    currentConfirmedCount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this
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
  test:function(){
    wx.request({
      url: 'http://api.tianapi.com/txapi/dream/index',
      method:'GET',
      data:{
        key:'4942a1499379a20d21981856760ccfd9',
        num:5,
        word:"龙"
      },
      success:function(res){
        console.log(res.data)
        self.setData({
          dreamCode:res.data.code,
          dreamResult:res.data.newslist
        })
      }
    })
  }
})