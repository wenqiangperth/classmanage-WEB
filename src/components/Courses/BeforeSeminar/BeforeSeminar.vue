<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-plus"></i>
            </span>
            <el-dropdown-menu class="el-dropDown" slot="dropdown">
              <el-dropdown-item command="per">
                <i class="el-icon-menu"></i>
                个人页
              </el-dropdown-item>
              <el-dropdown-item command="course">
                <i class="el-icon-star-on"></i>
                讨论课
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div class="divHeight"></div>
      <div>
        <img src="../../../assets/2.jpg" style="border-radius: 50px"/>
      </div>

      <div class="intro"
           style="height: 50px; background-color: #F0F0F0; display: block">
        <label style="text-align: left; line-height: 50px">
          轮次：
        </label>
        <label style="text-align: center">
          第{{order}}轮
        </label>
      </div>

      <div class="intro"
           style="height: 50px; background-color: #fff; display: block">
        <label style="text-align: left; line-height: 50px">
          主题：
        </label>
        <label style="text-align: center">
          {{topic}}
        </label>
      </div>

      <div class="intro"
           style="height: 50px; background-color: #F0F0F0; display: block">
        <label style="text-align: left; line-height: 50px">
          课次序号：
        </label>
        <label style="text-align: center">
          第1次
        </label>
      </div>

      <div class="intro"
           style="height: 50px; background-color: #fff; display: block">
        <label style="text-align: left; line-height: 50px">
          课程情况：
        </label>
        <label style="text-align: center; color: #66CCCC">
          {{status}}
        </label>
      </div>

      <div class="intro"
           style="height: 50px; background-color: #F0F0F0; display: block">
        <label style="text-align: left; line-height: 50px">
          展示材料：
        </label>
        <a style="text-align: center; color: #66CCCC" >
          查看信息
        </a>
      </div>

      <ul class="time-info">
        <li>报名开始时间：<a>{{startTime}}</a></li>
        <li>报名截止时间：<a>{{endTime}}</a></li>
      </ul>

      <div class="post-seminar">
        <a @click="sign">报名</a>
      </div>

    </div>
</template>

<script>
    export default {
        name: "BeforeSeminar",
      data(){
          return {
            seminarId:'',
            order:'',
            topic:'',
            status:'',
            teamNumLimit:'',
            startTime: '10.1.2018  12:00',
            endTime: '10.7.2018  24:00'
          }
      },
      created(){
          //在此处需要先接收上个页面传入的seminarId

        let that = this;
        that.$axios({
          method:'GET',
          url:'/seminar/seminarId',
          headers:{
            'token':window.localStorage['token']
          },
          params:{
            seminarId:that.seminarId
          }
        })
          .then(res=>{
            if(res.data.status===200){
              console.log(res.data.data);
              let data=res.data.data;
              that.order=data.order;
              that.topic=data.topic;
              that.status=data.status;
              that.teamNumLimit=data.teamNumLimit;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
      methods:{
          sign(){
            this.$router.push({path:'/Courses/BeforeSeminar/signInfo'});
          },
          back(){
              this.$router.push({path:'/Courses/TotalSeminars'});
          }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-380%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(250%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }

  .divHeight{
    height: 20px;
    display: block;
    color: #fff;
  }

  .post-seminar{
    margin:0 10px 15px 10px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .post-seminar a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }

  ul{
    margin: 40px 0 10px 10px;
  }

  ul,li{
    text-align: left;
    list-style-type: none;
    padding: 0;
    line-height: 30px;
  }

  .time-info li a{
    color: red;
  }
</style>
