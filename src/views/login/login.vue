<template>
  <div class="login">
    <van-row class="login-header">
      <van-col span="3">
        <van-icon class="icon-left" name="arrow-left" />
      </van-col>
      <van-col class="line-center" span="18">{{ titlList[tabbarCurrent] }}</van-col>
      <van-col class="icon-right" span="3" @click="tapTab"
        ><text v-if="tabbarCurrent === 1">去登录</text
        ><text v-if="tabbarCurrent === 0">去注册</text></van-col
      >
    </van-row>

    <!-- 登陆内容 -->
    <div class="login-container" v-if="tabbarCurrent === 0">
      <van-form @submit="onSubmit" class="login-content">
        <van-field
          v-model="value1"
          name="用户名"
          label="用户名"
          placeholder="用户名/邮箱"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="value2"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">{{
            titlList[tabbarCurrent]
          }}</van-button>
        </div>
      </van-form>
    </div>

    <!-- 注册内容 -->
    <div class="signin-container" v-if="tabbarCurrent === 1">
            <van-form @submit="onSubmit" class="login-content">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="mail"
          type="mail"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
          <van-field
          v-model="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="authcode"
          type="authcode"
          name="邮箱验证码"
          label="邮箱验证码"
          placeholder="邮箱验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
         <van-button style="margin-top:10px" round block type="info" native-type="submit">加入大熊猫</van-button>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Toast } from 'vant';
export default defineComponent({
  name: 'Home',
  setup() {
    const titlList = ['登录', '注册']

    const state = reactive({
      tabbarCurrent: 0,
      value1: '',
      value2: '',
      username:'',
      password:'',
      mail:'',
      authcode:'',
      pattern: /\d{6}/
    })

    const methods = reactive({
      tapTab: () => {
        if (state.tabbarCurrent === 0) {
          state.tabbarCurrent = 1
        } else if (state.tabbarCurrent === 1) {
          state.tabbarCurrent = 0
        }
      },

      // 校验函数返回 true 表示校验通过，false 表示不通过
      validator: (val:string) => {
        return /1\d{10}/.test(val)
      },
      // 异步校验函数返回 Promise
      asyncValidator(val:string) {
        return new Promise((resolve) => {
          Toast.loading('验证中...')

          setTimeout(() => {
            Toast.clear()
            resolve(/\d{6}/.test(val))
          }, 1000)
        })
      },
      onFailed(errorInfo:string) {
        console.log('failed', errorInfo)
      }
    })
    return {
      titlList,
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 695px;
  background: url('../../../src/assets/images/login-bg.jpg') no-repeat center 100% / 100%;
  opacity: 0.4;

  .login-header {
    background-color: rgb(221 215 215 / 87%);
    box-shadow: 4px -3px 5px 5px #8b8686;
    margin-bottom: 5px;
    .line-center {
      height: 35px;
      line-height: 35px;
    }
    .icon-left {
      margin-top: 5px;
      margin-left: 10px;
    }
    .icon-right {
      margin-top: 8px;
      font-size: 14px;
    }
  }
}
</style>
