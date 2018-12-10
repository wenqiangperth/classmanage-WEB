<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>我的课程
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon1 icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
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
              &nbsp;&nbsp;<i class="header-icon el-icon-star-off icon0"></i>&nbsp;&nbsp;{{item.groupId}}&nbsp;&nbsp;{{item.groupName}}
            </div>
          </template>
          <table border="0" cellspacing="0" cellpadding="0"
            style="width: 100%;background-color: beige;text-align: center;">
            <tr style="height: 40px">
              <td style="width: 20%;font-weight: bold">组长:</td>
              <td style="width: 40%">{{item.leader.account}}</td>
              <td>{{item.leader.name}}</td>
            </tr>
          </table>
          <table style="width: 100%;background-color:#f4f4f5 ;text-align:center"
                 v-for="(item0,index0) in item.members"
                 :key="index0">
            <tr style="height: 30px">
              <td style="width: 20%">组员:</td>
              <td style="width: 40%">{{item0.account}}</td>
              <td>{{item0.name}}</td>
            </tr>
          </table>
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
          },
          {
            groupId: '1-2',
            groupName: 'Untitled',
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
          },
          {
            groupId: '1-3',
            groupName: 'Untitled',
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
          },
          {
            groupId: '1-4',
            groupName: 'Untitled',
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
      returnLogin() {
        this.$router.push({path: '/'});
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

