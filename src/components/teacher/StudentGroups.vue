<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>我的课程
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-menu icon1 icon0"></i>
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
          <table style="width: 100%;background-color: lavender;text-align: center">
            <tr style="height: 40px">
              <td style="width: 20%;font-weight: bold">组长:</td>
              <td style="width: 40%">{{item.leader.account}}</td>
              <td>{{item.leader.name}}</td>
            </tr>
          </table>
          <table style="width: 100%;background-color: beige;text-align:center"
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
      }

    }
  }
</script>

<style scoped>
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

  .icon0 {
    font-weight: bolder;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .empty {
    width: 100%;
    height: 30px;
  }

  .main {
    width: 50%;
    margin: auto;
  }

  @media (max-width: 640px) {
    .main {
      width: 100%;
    }
  }

</style>

