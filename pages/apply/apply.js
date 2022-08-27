// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    sex:'',
    id:'',
    email:'',
    num:'',
    col:'',
    cla:'',
    pho:'',
    a:'',
    b:'',
    s:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    console.log('uid='+options.uid);
    var a=options.uid;
    this.show(a);
    self.setData({
        id:options.uid
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

  },
  show: function (a) {
    var that=this;

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
          that.setData({
            ret:res.data.ret,
            sex:res.data.data.sql[0].Sex,
            cla:res.data.data.sql[0].Major,
            name:res.data.data.sql[0].Name,
            email:res.data.data.sql[0].Email,
            num:res.data.data.sql[0].StudentNumber,
            col:res.data.data.sql[0].College,
            pho:res.data.data.sql[0].Phone
          })
        } else {
          }
      }
    })
  },
  //获取输入的调换原因
  haveA(event) {
    this.setData({
    a: event.detail.value
   })
  },
 //获取输入的具体内容
  haveB(event) {
   this.setData({
   b: event.detail.value
   })
  },
 //点击确定时，将数据插入数据库
 confirm: function () {
  var that=this;

  var a = this.data.a
  var b  = this.data.b
  console.log(a,b)
  
  //将数据插入数据库
  wx.request({
    url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.Create',
    method:'POST',
    data:{
      app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
      model_name:'sr_message',
      data:{"Accept":"111","Send":this.data.id,"Content":"调换原因"+a+"; 具体内容"+b}
    },
    success:function(res){
      console.log(res.data)
      that.setData({
         s:1
      })
    }
  })
 }
})