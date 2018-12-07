<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <router-link :to="{name:'AfterSeminar'}"><i class="el-icon-back icon1 icon0"></i></router-link>
        OOAD--书面报告
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell icon0"></i>&nbsp;&nbsp;个人页</el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{name:'Login'}"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-card>
        <table style="width: 100%;text-align: center">
          <tr>
            <td style="width: 15%">组号</td>
            <td style="width: 21.25%;">展示</td>
            <td style="width: 21.25%;">提问</td>
            <td style="width: 21.25%;">报告</td>
            <td>总分</td>
          </tr>
        </table>
        <table style="width: 100%;text-align: center"
               v-for="(item,index) in results"
               :key="index">
          <tr>
            <td style="width: 15%">{{item.groupId}}</td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.pre"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.question"></el-input>
            </td>
            <td style="width: 21.25%;">
              <el-input class="input0" placeholder="成绩" v-model="item.report"></el-input>
            </td>
            <td>
              <el-input placeholder="成绩" v-model="item.all" :disabled="true"></el-input>
            </td>
          </tr>
        </table>
      </el-card>

      <div>
        <el-button type="success" class="btn" plain
                   style="margin-top: 10px"
                   @click="updateSuccess">确认修改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ResultsPage",
    data() {
      return {
        results: [
          {
            groupId: '3-1',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-2',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          }, {
            groupId: '3-3',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-4',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-5',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          },
          {
            groupId: '3-6',
            pre: '5.0',
            question: '5.0',
            report: '5.0',
            all: '5.0'
          }
        ]
      }
    },
    methods: {

      updateSuccess() {
        this.$router.push({path: '/teacher/AfterSeminar'});
      },

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

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .btn {
    width: 100%;
    border: none;
    color: white;
    background-color: #66cccc;
  }

  .input0 {
    background-color: lavender;
  }

  .icon0 {
    font-weight: bolder;
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


