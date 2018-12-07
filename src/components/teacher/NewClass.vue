<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnClassInfo"></i>新建班级</div>
    </div>
    <div class="main">
      <el-card>
        <div slot="header">
          <table style="width: 100%">
            <tr>
              <td style="width: 35%"><span>班级名:</span></td>
              <td>
                <el-input v-model="classInfo.classId"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <table style="width: 100%">
          <tr>
            <td style="width: 35%">上课时间:</td>
            <td>
              <el-input v-model="classInfo.time" placeholder="周三1,2节"></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 35%">上课地点:</td>
            <td>
              <el-input v-model="classInfo.address" placeholder="海韵教学楼101"></el-input>
            </td>
          </tr>
          <tr style="height: 50px">
            <td style="width: 35%">学生名单:</td>
            <td>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <el-button size="mini" type="info">选择文件</el-button>
                <div slot="tip" class="el-upload__tip" style="float:right;">未选择任何文件</div>
              </el-upload>
            </td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%;margin-top: 80px">
        <el-button class="btn" type="success" @click="NewSuccess">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewClass",
    data() {
      return {
        classInfo: {
          classId: '',
          time: '',
          address: '',
          nameList:
            {
              name: 'student.xlsx',
              url: 'E:/name.xlsx'
            }
        }
      }
    },
    methods: {
      returnClassInfo() {
        this.$router.push({path: '/teacher/ClassInfo'});
      },
      NewSuccess() {
        this.$router.push({path: '/teacher/ClassInfo'});
      }
    }
  }
</script>

<style scoped>
  .body0 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
  }

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

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }
  .btn {
    height: 36px;
    width: 100%;
    border: none;
    background-color: #66CCCC;
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
