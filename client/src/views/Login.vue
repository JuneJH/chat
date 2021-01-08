<template>
  <div>
    <a-drawer
        title="登录/注册"
        placement="top"
        :visible="drawerVisible"
        :maskClosable="true"
        :closable="false"
    >
      <a-form-model
          layout="inline"
          :model="formInline"
          @submit="handleSubmit"
          @submit.native.prevent
      >
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="用户ID">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="密码">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
              type="primary"
              html-type="submit"
              :disabled="formInline.user === '' || formInline.password === ''"
          >登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="slice-line"></div>
      <!-- 注册 -->
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" layout="inline" style>
        <a-form-model-item has-feedback prop="username">
          <a-input v-model="ruleForm.username" placeholder="昵称">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="pass">
          <a-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="checkPass">
          <a-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="再次输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>

        <a-form-model-item has-feedback prop="mobile">
          <a-input v-model="ruleForm.mobile" placeholder="电话号码">
            <a-icon slot="prefix" type="mobile" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>

        <a-form-model-item has-feedback prop="email">
          <a-input v-model="ruleForm.email" placeholder="邮箱">
            <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="primary" @click="submitForm('ruleForm')">注册</a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">清空</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>
<script>
export default {
  created() {
    this.io.on("login", data => {
      if (data.code !== 200) {
        this.$message.error(data.msg);
      } else if (data.code === 200) {
        window.sessionStorage.setItem('userinfo', JSON.stringify(data));
        this.$store.commit('setUserinfo', data);
        this.$message.info("登录成功");
        this.onClose();
      }
    });
    this.io.on("register",data=>{
      if(data.code === 200){
        this.$message.error(`你好！${data.data.username} 欢迎使用`);
        this.formInline.name = data.data.username;
      }else{
        Object.keys(data.data).forEach(err=>{
          this.$message.error(data.data[err].join(","),1);
        })
      }
    })
  },

  props: ["drawerVisible"],
  data() {
    let checkAge = (rule, value, callback) => {
      if (value === "") {
         callback(new Error("请输入昵称"));
      }else{
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleForm: {
        checkPass: "",
        username: "",
        password: "",
        mobile:"",
        email:"",
      },
      rules: {
        password: [{validator: validatePass, trigger: "change"}],
        checkPass: [{validator: validatePass2, trigger: "change"}],
        username: [{validator: checkAge, trigger: "change"}]
      },
      layout: {
        labelCol: {span: 4},
        wrapperCol: {span: 14}
      }
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    handleSubmit(e) {
      this.io.emit("login", this.formInline);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.io.emit("register", this[formName])
        } else {
          this.$message.error("请填写完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.slice-line {
  margin: 20px;
  width: 500px;
  height: 10px;
  border-top: 1px solid #ddd;
  position: relative;

  &::before {
    content: "or";
    position: absolute;
    top: -15px;
    background-color: #fff;
    padding: 0px 20px;
    line-height: 1;
    font-size: 26px;
    left: 30%;
    color: #eee;

    &:hover {
      color: sandybrown;
    }
  }
}
</style>
