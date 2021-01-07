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
          <a-input v-model.number="ruleForm.username" placeholder="昵称">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="pass">
          <a-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="密码">
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
    this.io.on("logined", data => {
      console.log("发送请求后")
      if (data.status == 0) {
        this.$message.error(data.msg);
      } else if (data.status == 1) {
        window.sessionStorage.setItem('userinfo', JSON.stringify(data));
        this.$store.commit('setUserinfo', data);
        this.$message.info("登录成功");
        this.onClose();
      }
    });
  },

  props: ["drawerVisible"],
  data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("请输入昵称"));
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "202001",
        password: "123456"
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules: {
        pass: [{validator: validatePass, trigger: "change"}],
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
      console.log("点击登录")
      this.io.emit("login", this.formInline);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.io.emit("registe", this[formName])
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
