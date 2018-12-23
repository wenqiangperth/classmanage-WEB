<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="Back"></i>{{courseName}}
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoTotalSeminar">&nbsp;&nbsp;讨论课</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-collapse accordion
                   background-color="#66CCCC">
        <el-collapse-item v-for="(items,index) in rounds"
                          :key="index"
        >
          <template slot="title">
            <div style="font-weight: bold">
              &nbsp;&nbsp;<i class="el-icon-service el-icon0"></i>&nbsp;&nbsp;第{{items.roundSerial}}轮
            </div>
          </template>
          <div style="width: 100%">
            <el-button class="btn" type="info" plain>该轮轮次设置</el-button>
          </div>
          <el-card style="width:100%" v-for="(item,index0) in roundsInfo"
                   :key="index">
            <div slot="header">

            </div>
            <el-tree
              node-key="id"
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
              style="width: 100%;font-weight: bold">
            </el-tree>

          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: "temp",
    data() {
      return {
        courseId: 1,
        courseName: '',
        rounds: [
          {id: 1, roundSerial: 1},
        ],
        classes: [
          {classId: 1, grade: 2016, classSerial: 1},
        ],
        roundsInfo: [
          {
            roundId: 1,
            topics: [
              {seminarId: 1, topic: '业务流程分析', order: 2},
              {seminarId: 2, topic: '邻域模型分析', order: 1},
            ]
          }
        ],
        data: [
          {
            id: 1,
            label: '业务流程分析',
            children: [
              {
                id: 11,
                label: '2016-1'
              },
              {
                id: 12,
                label: '2016-1'
              },
              {
                id: 13,
                label: '2016-1'
              }
            ]
          },
          {
            id: 2,
            label: '邻域模型分析',
            children: [
              {
                id: 21,
                label: '2016-1'
              },
              {
                id: 22,
                label: '2016-1'
              },
              {
                id: 23,
                label: '2016-1'
              }
            ]
          }
        ]
      }
    },
    methods: {
      Back() {
        this.$router.go(-1);
      },
      gotoTotalSeminar() {
        this.$router.push({path: '/teacher/TotalSeminar'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      }
    }
  }
</script>

<style scoped>

</style>
