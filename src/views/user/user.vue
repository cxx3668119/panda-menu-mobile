<template>
  <div class="user">
    <div class="user-heade">
      <Navbar :title="title" />
    </div>
    <div class="user-container">
      <div class="user-container-header"></div>

      <van-image class="head-img" round width="70px" height="70px" :src="imgSrc" />
      <div class="user-container-info center">
        <div class="info-name">
          {{ userInfoList.nickname !== null ? userInfoList.nickname : userInfoList.username }}
        </div>
        <div class="info-gender">
          <div class="man" v-if="userInfoList.gender === '男'"></div>
          <div class="woman" v-if="userInfoList.gender === '女'"></div>
          <div class="sex" v-else></div>
        </div>
        <div class="info-set"></div>
        <div class="info-day center">
          <div class="info-day-left center">
            <div class="day-left-top">112</div>
            <div class="day-left-bottom">登录天数</div>
          </div>
          <div class="info-day-right center">
            <div class="day-left-top">21</div>
            <div class="day-left-bottom">记录菜谱天数</div>
          </div>
        </div>
      </div>

      <van-cell-group class="user-container-cell" inset>
        <van-cell title="个人信息" is-link icon="manager-o" />
        <van-cell title="我的积分" is-link icon="point-gift-o" />
        <van-cell title="我的徽章" is-link icon="medal-o" />
        <van-cell title="客户中心" is-link icon="phone-circle-o" />
        <van-cell title="给点建议" is-link icon="comment-circle-o" />
        <van-cell title="热点活动" is-link icon="hot-o" />
      </van-cell-group>
    </div>
    <div class="user-footer">
      <!-- 这里@change默认绑定在了van-tabbar上，参考vue的$attr -->
      <TabBar :tabbars="tabbars" :defaultActive="defaultActive" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  ref,
  Ref
} from 'vue'
import { Toast } from 'vant'
import { throttle } from '@/utils/index'
import { useRoute, useRouter } from 'vue-router'
import Navbar, { NavList } from '@/components/Navbar.vue'
import store from '@/store'
import TabBar, { ITabList } from '@/components/TabBar.vue'
interface HomeState {
  tabbars: Array<ITabList>
  defaultActive: number
}
interface User {
  age: number
  gender: string
  headimg: any
  id: number
  mail: string
  nickname: string
  openid: any
  password: string
  phone: string | number
  recordtime: string
  state: string
  username: string
}
export default defineComponent({
  components: {
    Navbar,
    TabBar
  },
  name: 'User',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const imgSrc = ref('')
    const userInfoList: Ref<User | null> = ref(null)
    // let imgSrc  = 'https://img.yzcdn.cn/vant/cat.jpeg'
    const state: HomeState = reactive({
      tabbars: [
        { title: '首页', to: { name: 'Home' }, icon: 'home-o' },
        // { title: '案例', to: { name: 'Dome' }, icon: 'star-o' },
        { title: '我的', to: { name: 'User' }, icon: 'user-circle-o' }
      ],
      defaultActive: computed(() => {
        return state.tabbars.findIndex((item: ITabList) => {
          return item.to.name === route.name
        })
      })
    })

    onBeforeMount(() => {
      // userInit()
      imgSrc.value = store.getters.user.headimg
      userInfoList.value = store.getters.user
      console.log(imgSrc.value, userInfoList.value)
    })
    const title = '我的'

    const handleChange = (v: number) => {
      console.log('tab value:', v)
    }

    const methods = reactive({
      goLogin() {
        router.push('/login')
      }
    })

    return {
      ...toRefs(state),
      ...toRefs(methods),
      handleChange,
      title,
      imgSrc,
      userInfoList
      // userInit,
    }
  }
})
</script>

<style scoped lang="scss">
.user {
  background-color: #fbfbfb;

  .user-container {
    position: relative;
    .user-container-header {
      width: 100%;
      height: 160px;
      background: url('#{$url}user-bg.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      opacity: 0.7;
      z-index: 1;
    }

    .head-img {
      z-index: 999;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 80px auto 0;
    }

    .user-container-info {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 110px auto 0;
      width: 92%;
      height: 150px;
      background-color: rgb(243, 243, 243);
      z-index: 99;
      border-radius: 5px;
      flex-direction: column;
      box-shadow: 0px 0px 7px #a5a5a5;  

      .info-name {
        display: inline-block;
        margin-top: 45px;
        width: 125px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-gender {
        // background-color: skyblue;
        position: absolute;
        top: 75px;
        .man {
          width: 20px;
          height: 20px;
          background: url('../../../src/assets/images/man.png') no-repeat center 100%/100%;
          z-index: 1000;
        }
        .woman {
          width: 20px;
          height: 20px;
          background: url('../../../src/assets/images/woman.png') no-repeat center 100%/100%;
          z-index: 1000;
        }
        .sex {
          width: 20px;
          height: 20px;
          background: url('../../../src/assets/images/sex.png') no-repeat center 100%/100%;
          z-index: 1000;
        }
      }
      .info-set {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
        background: url('../../../src/assets/images/set.png') no-repeat center 100%/100%;
      }
      .info-day {
        width: 100%;
        margin-top: 25px;
        .info-day-left {
          flex: 1;
          height: 50px;
          flex-direction: column;
          border-right: 1px solid #999;
          .day-left-bottom {
            font-size: 14px;
          }
        }
        .info-day-right {
          flex: 1;
          height: 50px;
          flex-direction: column;
          .day-left-bottom {
            font-size: 14px;
          }
        }
      }
    }
    .user-container-cell {
      margin-top: 125px;
      box-shadow: 0px 0px 5px #a5a5a5;  
    }
  }
}
</style>
