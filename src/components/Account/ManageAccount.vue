<template>
    <div>
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>账户与设置</label>
          <el-dropdown trigger="click" >
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
        <el-form :label-position="labelPosition" label-width="90px" :model="formLabelAlign">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formLabelAlign.account" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formLabelAlign.email">
              <i slot="suffix" class="el-input__icon el-icon-edit icon0" @click="ChangeEmail"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="账户密码">
            <el-input v-model="formLabelAlign.password" id="pass">
              <i slot="suffix" class="el-input__icon el-icon-edit icon0" ></i>
            </el-input>
            <el-button size="mini" style="float: right;background-color: #66CCCC" @click="ChangePassword">修改</el-button>
          </el-form-item>
          <el-form-item label="管理员邮箱">
            <el-input v-model="formLabelAlign.memail" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      <!--
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
        -->

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
            name: '',
            account: '24320162209999',
            email: '',
            password: '',
            interval: '',
            isShow: false,
            memail:'65321@163.com',
            messageInterval: 1
          },
          options: [{
            value: '6',
            label: '6h'
          }, {
            value: '3',
            label: '3h'
          }, {
            value: '2',
            label: '2h'
          }, {
            value: '1',
            label: '1h'
          }],
          value:''
        }
      },
      created(){
          let that=this;
          that.$axios({
            method:'GET',
            url:'/user/information',
            headers:{
              'token':window.localStorage['token']
            }
          })
            .then(res=>{
              if(res.data.status===200){
                let data=res.data;
                that.formLabelAlign.name=data.name;
                that.formLabelAlign.account=data.account;
                that.formLabelAlign.email=data.email;
                that.formLabelAlign.messageInterval=data.messageInterval;
                that.formLabelAlign.password=data.password
              }
            })
            .catch(e=>{
              console.log(e)
            })
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
        },
        ChangeEmail(){
          this.$router.push({path:'/Account/ChangeEmail'});
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
