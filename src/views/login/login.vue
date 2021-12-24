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
        <div style="margin: 16px">
          <van-button round block type="info" @click="login">{{
            titlList[tabbarCurrent]
          }}</van-button>
        </div>
      </van-form>
    </div>

    <!-- 注册内容 -->
    <div class="signin-container" v-if="tabbarCurrent === 1">
      <van-form class="login-content">
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
          :rules="[{ validator, message: '请填写正确的邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ pattern, message: '请填写八位以上密码，包含数字和字母' }]"
        />
        <!--  :rules="[{ validator, message: '请填写六位以上密码' }]" -->
        <van-row>
          <van-col span="18">
            <van-field
              v-model="authcode"
              name="邮箱验证码"
              label="邮箱验证码"
              placeholder="邮箱验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
          /></van-col>
          <van-col span="6" class="center"
            ><van-button
              round
              plain
              :disabled="btnStatus"
              type="info"
              class="signin-verify"
              @click="verify"
              ><text v-if="codeStatus">获取验证</text>
              <text v-else>{{ codeNum }}</text>
            </van-button></van-col
          >
        </van-row>

        <van-button
          style="margin-top: 10px"
          round
          block
          type="info"
          native-type="submit"
          @click="sign"
          >加入大熊猫</van-button
        >
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Toast } from 'vant'
import { throttle } from '../../utils/index'
import { useRouter } from 'vue-router'
import { checkUsername, sendMail, register, loginU, loginByMail } from '@/api/authController'
export default defineComponent({
  name: 'login',
  setup() {
    const titlList = ['登录', '注册']
    const mailpattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const passwordpattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/
    const usernamepattern = /^[a-zA-Z0-9_-]{4,16}$/
    const pat = /^[0-9]{4}$/

    const state = reactive({
      tabbarCurrent: 0,
      value1: '',
      value2: '',
      username: '',
      password: '',
      mail: '',
      authcode: '',
      codeStatus: true,
      codeNum: 60,
      btnStatus: false,
      router:useRouter(),
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/
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
      // 邮箱
      validator: (val: string) => {
        return /^\w+@[a-zA-Z0-9]+((\.[a-z0-9A-Z]{1,})+)$/.test(val)
      },

      validatorB: (val: string, reg: RegExp) => {
        return reg.test(val)
      },

      // 异步校验函数返回 Promise
      asyncValidator(val: string) {
        return new Promise((resolve) => {
          Toast.loading('验证中...')

          setTimeout(() => {
            Toast.clear()
            resolve(/\d{6}/.test(val))
          }, 1000)
        })
      },
      onFailed(errorInfo: string) {
        console.log('failed', errorInfo)
      },

      async verify() {
        if (methods.validatorB(state.mail, mailpattern)) {
          const TIME_COUNT = 60
          const query = { mail: state.mail }
          const res = await sendMail(query)
          if (res.code === 200) {
            // 拿验证 倒计时
            state.btnStatus = true
            state.codeNum = TIME_COUNT
            state.codeStatus = !state.codeStatus
            const codeTime = setInterval(() => {
              if (state.codeNum > 0 && state.codeNum <= TIME_COUNT) {
                state.codeNum--
              } else {
                clearInterval(codeTime)
                state.btnStatus = false
                // this.codeTime = null
                state.codeStatus = !state.codeStatus
              }
            }, 1000)
          } else {
            Toast.fail('发送失败')
          }
          console.log(res)
        } else {
          Toast.fail('请输入正确的邮箱')
        }
      },

      // 注册成功 登陆成功 跳到主页 存储用户信息
      goIndex() {
        console.log(state.router.push('/home'));
        
      }
    })

    const login = throttle(async () => {
      console.log(methods.validatorB(state.value1, mailpattern))
      console.log(methods.validatorB(state.value2, passwordpattern))

      if (
        (methods.validatorB(state.value1, usernamepattern) ||
          methods.validatorB(state.value1, mailpattern)) &&
        methods.validatorB(state.value2, passwordpattern)
      ) {
        if (methods.validatorB(state.value1, mailpattern)) {
          const query = {
            mail: state.value1,
            password: state.value2
          }
          const result = loginByMail(query)
          result.then((res) => {
            if (res.msg === '登录成功' && res.code === 200) {
              //登陆成功 存token
              methods.goIndex()
            }
          })
        } else {
          const data = {
            username: state.value1,
            password: state.value2
          }
          const result = loginU(data)
          result.then((res) => {
            if (res.msg === '登录成功' && res.code === 200) {
              //登陆成功 存token
              methods.goIndex()
            }
          })
        }
      } else {
        Toast.fail('信息错误')
      }
    }, 1500)

    const sign = throttle(async () => {
      if (
        methods.validatorB(state.username, usernamepattern) &&
        methods.validatorB(state.password, passwordpattern) &&
        methods.validatorB(state.mail, mailpattern) &&
        methods.validatorB(state.authcode, pat)
      ) {
        // 发送请求
        const query = { username: state.username }
        const result = await checkUsername(query)
        if (result.msg == '用户名可用' && result.code === 200) {
          const data = {
            authcode: state.authcode,
            mail: state.mail,
            password: state.password,
            username: state.username
          }
          const res = await register(data)
          console.log(res)
          Toast.success(res.msg)
          if (res.code === 200) {
            methods.goIndex()
          }
        }
        console.log(result)
      } else if (!methods.validatorB(state.authcode, pat)) {
        Toast.fail('验证码错误')
      } else {
        Toast.fail('您的个人信息有误')
      }
    }, 1000)

    return {
      titlList,
      usernamepattern,
      passwordpattern,
      mailpattern,
      ...toRefs(state),
      ...toRefs(methods),
      sign,
      login
    }
  }
})
</script>

<style scoped lang="scss">

.login {
  width: 100%;
  height: 695px;
  background: url('#{$url}login-bg.jpg') no-repeat center 100% / 100%;
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

  .signin-container {
    .signin-verify {
      width: 90px;
      height: 30px;
    }
  }
}
</style>
