<template>
    <div>
      <div id="head" class="head">
        <div class="title"><span>个人主页</span>
          <el-dropdown class="plus" trigger="click">
            <i class="el-icon-plus icon0" style="font:25px bolder"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-date" @click="gotoBacklog">&nbsp;&nbsp;待 办</i></el-dropdown-item>
              <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
              <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="per-info b-line">
        <div class="per-pic">
          <img src="../../assets/user.png"/>
        </div>
        <div class="per-in">
          <h2>{{username}}</h2>
          <span>教工号：{{id}}</span>
        </div>
      </div>
      <div class="main">
        <el-row>
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
          id: '123456789',
          password: '',
          username: '邱明'
        }
      },
      created() {
        this.getData();
      },
      methods:{
        getData() {
          this.id = this.$route.query.id;
          this.password = this.$route.query.password;
          this.username = this.$route.query.username;
          console.log('id', this.id);
          console.log('password', this.password);
          console.log('username', this.username);

        },
          SetAccount(){
            this.$router.push({path:'/teacher/AccountManage'});
          },
        returnLogin() {
            this.$router.push({path:'/'});
        },
        gotoCourseManage() {
          this.$router.push({path: '/teacher/CourseManage'});
        },
        gotoSeminar() {
          this.$router.push({path: '/teacher/SeminarPage'});
        },
        gotoBacklog(){
          this.$router.push({path:'/teacher/Backlog'});
        }
      }
    }
</script>

<style scoped>
  .per-info{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 15px;
    position: relative;
    background-color: #f4f4f5;
  }

  .b-line{
    position: relative;
  }

  .per-pic{
    width:60px;
    height:60px;
    margin-right:0.6rem;
    position:relative;
  }

  .per-pic img{
    width:80px;
    height:80px;
    display:block;
    border:none;
    border-radius:100%;
  }

  .per-in{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: #333;
  }

  .per-in h2{
    font-weight:normal;
    font-size:1.2rem;
  }

  .per-in span{
    font-size:0.8rem;
    color:#9e9e9e;
    position:relative;
    padding-right:25px;
  }

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
