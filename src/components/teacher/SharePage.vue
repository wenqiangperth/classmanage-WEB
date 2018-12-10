<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>共享设置
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-menu icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell icon0"></i>&nbsp;&nbsp;个人页</el-dropdown-item>
            <el-dropdown-item>
              <div @click="gotoSeminar"><i class="el-icon-service icon0"></i>&nbsp;&nbsp;讨论课</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="returnLogin"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-card class="pause" id="pause">
      <i class="el-icon-warning icon0" style="color:red;font-size: 25px"></i>
      <br><br>
      <br>是否取消与**老师的 共享
      <br><br><br>
      <el-button type="text" style="float: right;color: #99CC00">
        SURE
      </el-button>
      <el-button type="text" style="float:right;margin-right: 5px;color:#99CC00" @click="cancel">CANCEL</el-button>
    </el-card>
    <div class="main">
      <el-collapse accordion v-for="(item,index) in shares"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            <i class="el-icon-share icon0" style="float: left;margin-left: 20px;"></i>{{item.courseName}}({{item.teacher}})
          </template>
          <el-card>
            <table>
              <tr>
                <td style="width: 30%;color:#66cccc">共享类型:</td>
                <td>{{item.shareType}}</td>
              </tr>
              <tr>
                <td style="width: 30%;color:#66cccc">共享情况:</td>
                <td>{{item.courseType}}</td>
              </tr>
            </table>
            <el-button type="info" plain size="small" style="float: right;margin-bottom: 5px" @click="cancelShare">取消共享</el-button>
          </el-card>
        </el-collapse-item>

      </el-collapse>
      <el-button class="btn" type="success" plain style="margin-top: 10px" @click="addShare"><i class="el-icon-plus" style="font-weight: bolder"></i> 新增共享</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SharePage",
    data(){
      return{
        shares:[
          {
            courseName:'J2EE',
            teacher:'邱明',
            shareType:'共享讨论课',
            courseType:'主课程'
          },
          {
            courseName:'软件工程',
            teacher:'王梅红',
            shareType:'共享分组',
            courseType:'从课程'
          }
        ]
      }
    },
    methods:{
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      addShare(){
        this.$router.push({path:'/teacher/AddShare'});
      },
      cancelShare() {
        var share=document.getElementById("pause");
        share.style.display="block";
      },
      cancel(){
        var share=document.getElementById("pause");
        share.style.display="none";
      }
    }
  }
</script>

<style scoped>
  .body0 {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .plus {
    float: right;
    margin-right: 3%;
    line-height: 70px;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }

  .main {
    width: 50%;
    margin: auto;
  }
  .btn{
    width:100%;
    border:none;
    background-color: #66cccc;
    color:white;
  }
  .pause {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 70%;
    height: 200px;
    text-align: center;
    font-size: 14px;
    display: none;
  }


  @media (max-width: 640px) {
    .main {
      width: 100%;
    }
  }

</style>
<style>
  .el-collapse-item__arrow{
    font-weight: bolder;
  }

</style>

