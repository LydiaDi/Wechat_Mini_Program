// pages/result/result.js
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
    currentConfirmedCount:'',
    ret:'',
    two:'',
    three:'',
    four:'',
    build:'',
    room:'',
    len:3,
    sex:'',
    cla:'',
    fu:0,
    state:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    console.log('uid='+options.uid);
    var a=options.uid;
    this.showBoyOne(a);
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
  studentInfo:function(a){
    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_user where Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          self.setData({
            ret:res.data.ret,
            sex:res.data.data.sql[0].Sex,
            cla:res.data.data.sql[0].Major
          })

          //判断男女，并根据男女分别在对应的结果表中查询该班级是否进行了分配
          if (res.data.data.sql[0].Sex=='男') {
              result.isAssignBoy(res.data.data.sql[0].Major);
          } else {
              result.isAssignGirl(res.data.data.sql[0].Major);
            }
        } else {
           self.setData({
           })
          }
       }
    })
  },
  isAssignBoy:function(cla){
    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultboy where Class='"+cla+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          self.setData({
            ret:res.data.ret,
            state:res.data.data.sql[0].State
          })
        } else {
          self.setData({
            fu:1
          })
        }
      }
    })
  },
  isAssignGirl:function(cla){
    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultgirl where Class='"+cla+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          self.setData({
            ret:res.data.ret,
            state:res.data.data.sql[0].State
          })
        } else {
          self.setData({
            fu:1
          })
        }
      }
    })
  },
  showBoyOne:function(a){
    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultboy inner join sr_user on sr_resultboy.One = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          self.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
        } else {
          self.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length
          })
        }
      }
    })
  }
})