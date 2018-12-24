<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>组队信息
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon1 icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty"></div>
    <div class="main">
      <el-collapse accordion v-for="(item,index) in groups"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            <div style="font-weight: bold">
              &nbsp;&nbsp;<i class="header-icon el-icon-star-off el-icon0"></i>&nbsp;&nbsp;{{item.name}}
              <span v-show="item.valid===false" style="color: red;"><i class="el-icon-warning"></i></span>
            </div>
          </template>
          <el-card style="width:100%">
            <div slot="header">
              <!--<span>组长:{{item.leaderId}}</span>-->
            </div>
            <el-table
              :data="item.members"
              style="width: 100%;margin: auto"
            >
              <el-table-column
                prop="account"
                label="学号"
                width="130"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="130"
                align="center">
              </el-table-column>
              <!--<el-table-column
                prop="isLeader"
                label="是否组长"
                width="80"
                align="center">
              </el-table-column>-->
            </el-table>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
  export default {
    name: "StudentGroups",
    data() {
      return {
        courseId: '',
        courseName: '',
        info: [{}],
        classInfo: [],
        groups: [
          {
            name: '1-1 Untitled',
            valid: false,
            members: [
              {
                id: 1,
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader: true
              },
              {
                id: 2,
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader: false
              },
              {
                id: 3,
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader: false
              },
              {
                id: 4,
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader: false

              }
            ]
          }
        ]
      }
    },
    created() {
      this.getParams();
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/team',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            console.log(data);
            that.info = data;
            /* that.groups=[];
             for (let i = 0; i < data.length; i++) {
               that.data[i].members.push(
                 {
                   id: data[i].leader.id,
                   account: data[i].leader.account,
                   name: data[i].leader.name,
                 }
               );
               that.groups.push(
                 {
                   name: data[i].name,
                   valid: data[i].valid,
                   members: data[i].members
                 }
               )
             }*/
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到组队信息'
            })
          }
        })
        .catch(e => {
          console.log(e);
        });
      that.$axios({
        method: 'GET',
        url: '/course/' + that.$data.courseId + '/class',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            window.localStorage['token'] = res.headers.authorization;
            let data = res.data;
            console.log(data);
            this.classInfo = data;
          } else if (res.status === 400) {
            this.$message({
              type: 'error',
              message: '错误的ID格式'
            })
          } else if (res.status === 404) {
            this.$message({
              type: 'error',
              message: '未找到组队信息'
            })
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    methods: {
      getParams() {
        var routerParams = this.$route.params.courseId;
        this.courseId = routerParams;
        this.courseName = this.$route.params.courseName;
      },
      gotoBacklog() {
        this.$router.push({path: '/teacher/Backlog'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      gotoHomePage(){
        this.$router.push({path: '/teacher/HomePage'});
      }

    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

</style>

