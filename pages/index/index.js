// index.js
// 获取应用实例
const app = getApp()

Page({
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
    room:''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    self=this;
    //var that=this
    //ar id=this.options.uid
    console.log('uid='+options.uid);
    
    var a=options.uid;
    //this.setData({
    // uid:id
    //})
    //var id="410323199907213521";
    //var a='410323199907213526';
    this.sql(a);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  },
  health:function(){
    wx.request({
      url: 'http://api.tianapi.com/txapi/ncovabroad/index',
      method:'GET',
      data:{
        key:'4942a1499379a20d21981856760ccfd9'
      },
      success:function(res){
        console.log(res.data)
        self.setData({
          code:res.data.code,
          name:res.data.newslist[1].provinceName,
          confirmedCount:res.data.newslist[1].yesterdayConfirmedCount,
          curedCount:res.data.newslist[1].curedCount,
          currentConfirmedCount:res.data.newslist[1].currentConfirmedCount
        })
      }
    })
  },
  sql:function(a){
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
        self.setData({
          ret:res.data.ret,
          two:res.data.data.sql[0].Two,
          three:res.data.data.sql[0].Three,
          four:res.data.data.sql[0].Four,
          build:res.data.data.sql[0].Building,
          room:res.data.data.sql[0].Room
        })
      }
    })
  }
})