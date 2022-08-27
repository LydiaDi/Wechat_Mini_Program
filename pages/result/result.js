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
    one:'',
    two:'',
    three:'',
    four:'',
    build:'',
    room:'',
    len:3,
    sex:'',
    cla:'',
    fu:0,
    state:3,
    twoName:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    console.log('uid='+options.uid);
    var a=options.uid;
    this.studentInfo(a);
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
          self.setData({
            ret:res.data.ret,
            sex:res.data.data.sql[0].Sex,
            cla:res.data.data.sql[0].Major
          })

          //判断男女，并根据性别分别在对应的结果表中查询该班级是否进行了分配
          if (res.data.data.sql[0].Sex=='男') {
              that.isAssignBoy(res.data.data.sql[0].Major,a);
          } else {
              that.isAssignGirl(res.data.data.sql[0].Major,a);
          }
        } else {
        }
      }
    })
  },
  //查看该学生是否进行了分配、如果进行了分配，分配结果是否进行了发布
  isAssignBoy:function(cla,a){
    var that=this;

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

          //如果上述判断结果为state=1，即信息已发布，对分配信息进行显示
          if (res.data.data.sql[0].State==1) {
            that.showBoyOne(a);
          } else {
            self.setData({
              fu:3
            })
          }
  
        //在结果表中没有搜索到信息，表明还没有进行分配
        } else {
          self.setData({
            fu:1
          })
        }
      }
    })
  },
  isAssignGirl:function(cla,a){
    var that=this;

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

    //如果上述判断结果为state=1，即信息已发布，对分配信息进行显示
    if (res.data.data.sql[0].State==1) {
          that.showGirlOne(a);
        } else {
          self.setData({
            fu:3
          })
        }

        //在结果表中没有搜索到信息，表明还没有进行分配
        } else {
          self.setData({
            fu:1
          })
        }
      }
    })
  },
  showBoyOne:function(a){
    var that=this;

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
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.two=='无') {
          } else {
            //var name=that.getName(that.data.two);
            that.getNameTwo(that.data.two);
            //console.log(that.data.name);
            //that.setData({
             // two:that.data.name
            //})
            //console.log(that.data.two)
          }
          //判断第3个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
          //判断第4个同学是否存在，存在的话找到对应的姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
          }
        //说明登录者并非位于床位1，接下来在床位2中此寻找此学生
        } else {
          that.showBoyTwo(a);
        }
      }
    })
  },
  showBoyTwo:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultboy inner join sr_user on sr_resultboy.Two = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            //two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          //其实床位1的同学必然存在，无需进行判断，但是多此一举没有太大影响
          if (that.data.one=='无') {
          } else {
            that.getNameOne(that.data.one);
          }
          //判断第3个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
          }
        } else {
          that.showBoyThree(a);
        }
      }
    })
  },
  showBoyThree:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultboy inner join sr_user on sr_resultboy.Three = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            two:res.data.data.sql[0].Two,
            //three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.one=='无') {
          } else {
            that.getNameOne(that.data.one);
          }
          //判断第2个同学是否存在，存在的话找出姓名
          if (that.data.two=='无') {
          } else {
            that.getNameTwo(that.data.two);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
            }     
        } else {
          that.showBoyFour(a);
        }
      }
    })
  },
  showBoyFour:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultboy inner join sr_user on sr_resultboy.Four = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            //four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.one=='无') {
          } else {
            that.getNameOne(that.data.one);
          }
          //判断第2个同学是否存在，存在的话找出姓名
          if (that.data.two=='无') {
          } else {
            that.getNameTwo(that.data.two);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
        } else {
          //便利了四个床位都没有学生信息的情况几乎是不存在的，因此在此else中无需写任何语句
          //that.showBoyThree(a);
        }
      }
    })
  },
  //根据床位1的学生的id找到对应的学生姓名（对男生女生均适用）
  getNameOne:function(id){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_user where Identity='"+id+"';"
      },
      success:function(res){
        console.log(res.data)
         // var na=res.data.data.sql[0].Name;
          //console.log(name);
          that.setData({
            name:res.data.data.sql[0].Name,
            one:res.data.data.sql[0].Name
          })
          console.log(that.data.name);
      }
    })
  },
  //根据床位2的学生的id找到对应的学生姓名（对男生女生均适用）
  getNameTwo:function(id){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_user where Identity='"+id+"';"
      },
      success:function(res){
        console.log(res.data)
         // var na=res.data.data.sql[0].Name;
          //console.log(name);
          that.setData({
            name:res.data.data.sql[0].Name,
            two:res.data.data.sql[0].Name
          })
          console.log(that.data.name);
      }
    })
  },
  getNameThree:function(id){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_user where Identity='"+id+"';"
      },
      success:function(res){
        console.log(res.data)
         // var na=res.data.data.sql[0].Name;
          //console.log(name);
          that.setData({
            name:res.data.data.sql[0].Name,
            three:res.data.data.sql[0].Name
          })
          console.log(that.data.name);
      }
    })
  },
  getNameFour:function(id){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_user where Identity='"+id+"';"
      },
      success:function(res){
        console.log(res.data)
         // var na=res.data.data.sql[0].Name;
          //console.log(name);
          that.setData({
            name:res.data.data.sql[0].Name,
            four:res.data.data.sql[0].Name
          })
          console.log(that.data.name);
      }
    })
  },
  showGirlOne:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultgirl inner join sr_user on sr_resultgirl.One = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.two=='无') {
          } else {
            //var name=that.getName(that.data.two);
            that.getNameTwo(that.data.two);
            //console.log(that.data.name);
            //that.setData({
             // two:that.data.name
            //})
            //console.log(that.data.two)
          }
          //判断第3个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
          }
        } else {
          that.showGirlTwo(a);
        }
      }
    })
  },
  showGirlTwo:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultgirl inner join sr_user on sr_resultgirl.Two = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            //two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.one=='无') {
          } else {
            //var name=that.getName(that.data.two);
            that.getNameOne(that.data.one);
            //console.log(that.data.name);
            //that.setData({
             // two:that.data.name
            //})
            //console.log(that.data.two)
          }
          //判断第3个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
          }
        } else {
          that.showGirlThree(a);
        }
      }
    })
  },
  showGirlThree:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultgirl inner join sr_user on sr_resultgirl.Three = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            two:res.data.data.sql[0].Two,
            //three:res.data.data.sql[0].Three,
            four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.one=='无') {
          } else {
            that.getNameOne(that.data.one);
          }
          //判断第2个同学是否存在，存在的话找出姓名
          if (that.data.two=='无') {
          } else {
            that.getNameTwo(that.data.two);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.four=='无') {
          } else {
            that.getNameFour(that.data.four);
          }
        } else {
          that.showGirlFour(a);
        }
      }
    })
  },
  showGirlFour:function(a){
    var that=this;

    wx.request({
      url: 'http://hn216.api.yesapi.cn/?s=App.SuperTable.SqlQuery',
      method:'POST',
      data:{
        app_key:'F0784EA25C33254F4BA361D5C2A4CF37',
        model_name:'sr_user',
        sql:"select * from sr_resultgirl inner join sr_user on sr_resultgirl.Four = sr_user.Identity where sr_user.Identity='"+a+"';"
      },
      success:function(res){
        console.log(res.data)
        if (res.data.data.sql.length>0) {
          that.setData({
            ret:res.data.ret,
            len:res.data.data.sql.length,
            one:res.data.data.sql[0].One,
            two:res.data.data.sql[0].Two,
            three:res.data.data.sql[0].Three,
            //four:res.data.data.sql[0].Four,
            build:res.data.data.sql[0].Building,
            room:res.data.data.sql[0].Room
          })
          if (that.data.one=='无') {
          } else {
            that.getNameOne(that.data.one);
          }
          //判断第2个同学是否存在，存在的话找出姓名
          if (that.data.two=='无') {
          } else {
            that.getNameTwo(that.data.two);
          }
          //判断第4个同学是否存在，存在的话找出姓名
          if (that.data.three=='无') {
          } else {
            that.getNameThree(that.data.three);
          }
        } else {
          //that.showBoyThree(a);
        }
      }
    })
  }
})