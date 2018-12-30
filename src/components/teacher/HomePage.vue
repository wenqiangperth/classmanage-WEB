<template>
  <div class="body0">
      <div id="head" class="head">
        <div class="title"><i class="el-icon-close icon1 icon0"></i><span>个人主页</span>
          <el-dropdown class="plus" trigger="click">
            <i class="el-icon-plus icon0" style="font:25px bolder;color:white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-date" @click="gotoBacklog">&nbsp;&nbsp;待 办</i></el-dropdown-item>
              <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="main">
        <el-card style="width: 100%">
          <fieldset>
            <legend style="font-size: 20px;color:#66cccc;">xxXX课堂管理系统XXxx </legend>
            <span style="float: left;font-weight: bold">欢迎您: {{teacher.name}}老师！</span>
            <br>
            <p>当前账户信息: {{teacher.account}}</p>
            <p></p>
          </fieldset>
        </el-card>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-card shadow="hover" class="card">
              <div @click="gotoCourseManage">
                <i class="iconfont icon-kecheng icon11"></i>
                <div>
                  <span class="font0">我的课程</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="card">
              <div @click="SetAccount">
                <i class="el-icon-setting icon2"></i>
                <div>
                  <span class="font0">账户设置</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
    export default {
      name: "HomePage",
      data() {
        return {
          teacher: {},

        }
      },
      created() {
        let that = this;
        that.$axios({
          method: 'GET',
          url: '/user/information',
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(response => {
            if (response.status === 200) {
              that.teacher=response.data;
              console.log(that.teacher);
              window.localStorage['token'] = response.headers.authorization;
            }
          })
          .catch((e) => {
            console.log(e);
          })
      },
      methods:{
          SetAccount(){
            this.$router.push({
              path:'/teacher/AccountManage',
              query:{
                teacher:this.teacher,
                //token:this.token
              }
            });
          },
        returnLogin() {
            this.$router.push({path:'/'});
        },
        gotoCourseManage() {
          this.$router.push({
            path: '/teacher/CourseManage',
            name: 'CourseManage',
            params: {
              account: this.account
            }
          });
        },
        gotoSeminar() {
          this.$router.push({path: '/teacher/TotalSeminar'});
        },
        gotoBacklog(){
          this.$router.push({
            path: '/teacher/Backlog',
            name: 'Backlog',
            params: {
              teacherId: this.teacher.id
            }
          });
        }
      },
      watch: {
        '$route': 'getData'
      }
    }
</script>

<style scoped>
  .icon11{
    font-size: 55px;
    color: #66cccc;
  }
  .icon2{
    font-size: 60px;
    color: #66cccc;
  }
  .font0{
    font-family: 宋体;
    font-weight: bold;
  }

  .card{
    height:100px;
    text-align: center;
    margin-top: 20px;
    border:none;
    background-color: #fff;
  }

</style>
