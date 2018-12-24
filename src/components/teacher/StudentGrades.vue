<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>学生成绩
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
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
      <el-collapse accordion v-for="(round,index) in grades"
                   :key="index">
        <el-collapse-item>
          <template slot="title">
            &nbsp;&nbsp;<i class="header-icon el-icon-service el-icon0"></i>&nbsp;&nbsp;<span
            style="font-weight: bold;font-family: 黑体;color: #616161">{{round.name}}</span>
          </template>
          <div style="width: 100%;">
            <div v-for="(group0,index0) in round.groups"
            :key="index0">
              <el-button type="info" plain style="width:100%" @click="dialogTableVisible = true">
                <i class="iconfont icon-zudui"></i>&nbsp;&nbsp;{{group0}}
              </el-button>
            </div>
          </div>

        </el-collapse-item>
      </el-collapse>
      <div>
        <el-dialog
          title="成绩"
          :visible.sync="dialogTableVisible"
          width="90%">
          <el-table
            :data="groupScore.item"
            style="width: 100%;"
            >
            <el-table-column
              prop="name"
              label="主题"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="展示"
              width="75"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pre"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="提问"
              width="75"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.question"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="报告"
              width="75"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.report"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <table style="width: 100%">
            <tr style="width: 100%">
              <td style="width: 40%">本轮总成绩</td>
              <td>
                <el-input v-model="groupScore.finalScore"></el-input>
              </td>
            </tr>
          </table>
          <el-button type="info" plain @click="UpdateGrades" style="margin-top: 5px;float: right;margin-bottom: 5px">
            修改
          </el-button>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseManage",
    data() {
      return {
        groupScore:{
          groupId:'1-1',
          finalScore: 5.0,
          item:[
            {
              name: '用例分析',
              pre: '5.0',
              question: '5.0',
              report: '5.0'

            },
            {
              name: '界面原型',
              pre: '5.0',
              question: '5.0',
              report: '5.0'
            },
            {
              name: '总成绩',
              pre: '5.0',
              question: '5.0',
              report: '5.0'
            }
          ]
        },
        grades: [
          {
            name: '第一轮',
            groups: [
               '1-1',
               '1-2'
            ],

          },
          {
            name: '第二轮',
            groups: [
              '2-1',
              '2-2'
            ],

          }
        ],
        dialogTableVisible: false
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
        this.$router.push({path:'/teacher/HomePage'});
      },
      UpdateGrades(){

      }

    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 40px;
  }

</style>
<style>
  .el-dialog__body {
    padding: 10px 20px 50px 20px;
  }
</style>

