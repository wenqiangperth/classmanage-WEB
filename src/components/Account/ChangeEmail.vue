<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>账户邮箱</label>
          <el-dropdown trigger="click">
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
      </header>

      <div class="change">
        <label>e-mail:</label>
        <input v-model="email" type="text" placeholder="XXXX@163.com"/>
      </div>

      <div class="confirm">
        <a @click="confirm">确认提交</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ChangeEmail",
      data(){
        return{
          email:''
        }
      },
      methods:{
        back(){
          this.$router.push('/Account/ManageAccount');
        },
        confirm(){
          let that = this;
          that.$axios({
            method:'PUT',
            url:'/user/email',
            data:{
              email: that.email
            }
          })
            .then(res=>{
              if(res.data.status===200){
                alert("邮箱修改成功！");
                that.$router.push({path:'/Account/ManageAccount'})
              }
              else if(res.data.status===400){
                alert("信息不合法")
              }
            })
            .catch(e=>{
              console.log(e)
            })
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
    transform: translateX(-380%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(250%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }
  .change{
    margin: 50px 30px 20px 30px;
    border: 1px solid #66CCCC;
    border-radius: 25px;
  }

  .change label{
    width:6em;
    white-space: nowrap;
    text-align: left;
    display:inline-block;
    color: grey;
  }

  .change input{
    line-height:40px;
    color: darkslategrey;
    background-color:transparent;
    border:none;
    outline: none;
  }

  .confirm a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 3px;
    border-radius: 25px;
    margin: 150px 0 20px 0;
  }

</style>
