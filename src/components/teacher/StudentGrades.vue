<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>学生成绩
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-menu icon0"></i>
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
      <el-collapse accordion v-for="(round,index) in grades"
                   :key="index">
        <el-collapse-item style="color: gainsboro">
          <template slot="title">
            &nbsp;&nbsp;<i class="header-icon el-icon-service icon0"></i>&nbsp;&nbsp;{{round.name}}
          </template>
          <el-col>
            <el-menu v-for="(item0,index) in round.groups"
                     :key="index"
                     default-active="2"
                     class="el-menu-vertical-demo icon0"
                     background-color="gainsboro"
                     text-color="#66cccc"
                     active-text-color="#339999">
              <el-submenu index="index">
                <template slot="title">
                  <i class="el-icon-menu icon0"></i>
                  <span>{{item0.groupId}}</span>
                </template>
                <el-menu-item-group v-for="(item1,index1) in item0.item"
                                    :key="index1">
                  <template slot="title">{{item1.topic}}</template>
                  <el-menu-item index="index-1">展示:{{item1.pre}}&nbsp;提问:{{item1.question}}&nbsp;报告:{{item1.report}}
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">{{item0.total.name}}</template>
                  <el-menu-item index="index-1">展示:{{item0.total.pre}}&nbsp;提问:{{item0.total.question}}&nbsp;报告:{{item0.total.report}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseManage",
    data() {
      return {
        grades: [
          {
            name: '第一轮',
            groups: [
              {
                groupId: '1-1',
                item: [
                  {
                    topic: '用例分析',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'

                  },
                  {
                    topic: '界面原型',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  }
                ],
                total: {
                  name: '总成绩',
                  pre: '5.0',
                  question: '5.0',
                  report: '5.0'
                }
              },
              {
                groupId: '1-2',
                item: [
                  {
                    topic: '用例分析',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  },
                  {
                    topic: '界面原型',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  }
                ],
                total: {
                  name: '总成绩',
                  pre: '5.0',
                  question: '5.0',
                  report: '5.0'
                }
              }
            ],

          },
          {
            name: '第二轮',
            groups: [
              {
                groupId: '1-1',
                item: [
                  {
                    topic: '用例分析',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  },
                  {
                    topic: '界面原型',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  }
                ],
                total: {
                  name: '总成绩',
                  pre: '5.0',
                  question: '5.0',
                  report: '5.0'
                }
              },
              {
                groupId: '1-2',
                item: [
                  {
                    topic: '用例分析',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'
                  },
                  {
                    topic: '界面原型',
                    pre: '5.0',
                    question: '5.0',
                    report: '5.0'

                  }
                ],
                total: {
                  name: '总成绩',
                  pre: '5.0',
                  question: '5.0',
                  report: '5.0'
                }
              }
            ],

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
    font-weight: bolder;
  }

  .empty {
    width: 100%;
    height: 40px;
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

