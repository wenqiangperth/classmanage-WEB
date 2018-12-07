<template>
    <div>
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>账户与设置</label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-plus"></i>
            </span>
            <el-dropdown-menu class="el-dropDown" slot="dropdown">
              <el-dropdown-item command="per">
                <i class="el-icon-menu"></i>
                个人页
              </el-dropdown-item>
              <el-dropdown-item command="course">
                <i class="el-icon-star-on"></i>
                讨论课
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div style="width:100%;height:45px"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formLabelAlign.account" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formLabelAlign.email">
              <i slot="suffix" class="el-input__icon el-icon-edit icon0" @click="editEmail"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="账户密码">
            <el-input v-model="formLabelAlign.password" id="pass">
              <i slot="suffix" class="el-input__icon el-icon-edit icon0" @click="editPassword"></i>
            </el-input>
            <el-button size="mini" style="float: right;background-color: #66CCCC" @click="ChangePassword">修改</el-button>
          </el-form-item>
        </el-form>
        <div class="message">
          <label>通知发送间隔</label>
          <el-select v-model="value" placeholder="请选择" class="interval">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

      <div class="ensure-change">
        <a >确认修改</a>
      </div>

    </div>
</template>

<script>
    export default {
        name: "ManageAccount",
      data() {
        return {
          labelPosition: 'right',
          formLabelAlign: {
            name: '王强',
            account: '24320162209999',
            email: '24320162209999@xmu.edu.cn',
            password: '111111',
            interval: '',
            isShow: false
          },
          options: [{
            value: '选项1',
            label: '每6h一次'
          }, {
            value: '选项2',
            label: '每3h一次'
          }, {
            value: '选项3',
            label: '每2h一次'
          }, {
            value: '选项4',
            label: '每1h一次'
          }],
          value: ''
        }
      },
      methods: {
          back(){
            this.$router.push({path:'/HomePage'});
          },
        showPassword() {
          this.isShow = !this.isShow;
          var pass = document.getElementById("pass");
          if (this.isShow) {
            pass.type = "text";
          } else {
            pass.type = "password";
          }
        },
        ChangePassword(){
          this.$router.push({path:'/findkey1'});
        }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-500%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(340%);
  }
  .el-dropDown{
    transform: translateX(90%);
  }

  .ensure-change{
    margin:50px 10px 15px 10px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .ensure-change a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }

</style>
