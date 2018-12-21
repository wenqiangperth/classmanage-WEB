<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>组队信息
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon1 icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-date" @click="gotoBacklog">&nbsp;&nbsp;待 办</i></el-dropdown-item>
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
              &nbsp;&nbsp;<i class="header-icon el-icon-star-off el-icon0"></i>&nbsp;&nbsp;{{item.groupId}}&nbsp;&nbsp;{{item.groupName}}
              <span v-show="item.status==='Invaild'" style="color: red;"><i class="el-icon-warning"></i></span>
            </div>
          </template>
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
            <el-table-column
              prop="isLeader"
              label="是否组长"
              width="80"
              align="center">
            </el-table-column>
          </el-table>
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
        groups: [
          {
            groupId: '1-1',
            groupName: 'Untitled',
            status:'Invaild',
            members: [
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:'Yes'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              }
            ]
          },
          {
            groupId: '1-2',
            groupName: 'Untitled',
            status:'Invaild',
            members: [
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:'Yes'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              }
            ]
          },
          {
            groupId: '1-3',
            groupName: 'Untitled',
            status:'success',
            members: [
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:'Yes'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb',
                isLeader:''
              }
            ]
          },
          {
            groupId: '1-4',
            groupName: 'Untitled',
            status:'success',
            leader: {
              account: '24320162202xxx',
              name: 'yyyyyy'
            },
            members: [
              {
                account: '24320162202xxx',
                name: 'bbbbbb'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb'
              },
              {
                account: '24320162202xxx',
                name: 'bbbbbb'
              }
            ]
          }
        ]
      }
    },
    methods: {
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
        this.$router.push({path:'teacher/HomePage'});
      }

    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

</style>

