// pages/login/login.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    pwd: '',
    len:'',
    dataPwd:'',
    ret:'',
    fu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取输入的id值
  haveId(event) {
     this.setData({
     id: event.detail.value
    })
  },
  //获取输入的pwd值
  havePwd(event) {
    this.setData({
    pwd: event.detail.value
  })
  },
 //点击登陆时，对所输入的数据进行验证，验证成功过后跳转到首页
 confirm: function () {
  var that=this;

  var studentId = this.data.id
  var studentPwd  = this.data.pwd
  console.log(studentId,studentPwd)
  
  //查询数据库中是否存在所填的的id值
  wx.request({
    url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
    method:'POST',
    data:{
      app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
      model_name:'sr_user',
      sql:"select * from sr_user where Identity='"+studentId+"';"
    },
    success:function(res){
      console.log(res.data)
      if (res.data.data.sql.length>0) {
        if (res.data.data.sql[0].Password==studentPwd) {
          console.log('a')
          wx.navigateTo({
            url: '../nav/nav?uid='+studentId})
        } else {
          that.setData({
            fu:2
          })
          //console.log('b')
          //console.log(res.data.data.sql[0].Password)
          }
      } else {
        that.setData({
          fu:1
        })
        }
    }
  })
}
})