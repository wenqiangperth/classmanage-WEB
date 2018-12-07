<template>
    <div>
      <div id="head" class="head">
        <div class="title"><i class="iconfont icon-yonghu icon0"></i><span style="float: left">{{username}}</span>
          <el-dropdown class="plus" trigger="click">
            <i class="el-icon-plus icon1 icon0" style="font:25px bolder"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-bell icon0"></i>&nbsp;&nbsp;个人页</el-dropdown-item>
              <el-dropdown-item>
                <div @click="returnLogin"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="empty"></div>
      <div class="main">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="hover" class="card">
              <div @click="gotoCourseManage" class="card1">
                <i class="iconfont icon-kecheng icon0"></i>
                我的课程
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="card">
              <div @click="gotoSeminar" class="card1">
                <i class="el-icon-service icon0"></i>
                讨论课
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="hover" class="card">
              <el-badge is-dot class="item">
                <i class="el-icon-date icon0"></i>
              </el-badge>
              我的待办
            </el-card>
          </el-col>
          <el-col :span="12" >
            <el-card shadow="hover" class="card">
              <div @click="SetAccount">
                <i class="el-icon-setting icon0"></i>
                账户设置
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
          id: '',
          password: '',
          username: ''
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
        }
      }
    }
</script>

<style scoped>
  .head{
    height: 70px;
    width:100%;
    background-color: #CCFF99;
  }
  .title{
    display: block;
    text-align: center;
    line-height: 70px;
  }
  .plus{
    float:right;
    margin-right: 3%;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }
  .icon-yonghu {
    float: left;
    font-size: 25px;
    margin-left: 15px;
    line-height: 70px;
  }
  .empty{
    width:100%;
    height:50px;
  }

  .main {
    width: 50%;
    margin: auto;
  }
  .card{
    height:100px;
    border-radius: 10px;
    text-align: center;
    margin-top: 10px;
    background-color: #99CCCC;
  }


  @media (max-width: 640px) {
    .main {
      width: 100%;
    }
  }
  .item {
    margin-top: 5px;
    margin-right: 6px;
  }


</style>
