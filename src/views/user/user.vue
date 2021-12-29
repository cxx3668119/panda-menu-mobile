<template>
  <div class="user">
    <div class="user-heade">
      <Navbar :title="title" />
    </div>
    <div class="user-container">
      <div class="user-container-header"></div>

      <van-image class="head-img" round width="70px" height="70px" :src="imgSrc" />
      <div class="user-container-info"></div>

      <van-cell-group class="user-container-cell" inset>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <van-button type="primary" @click="goLogin">去登录</van-button>
    </div>
    <div class="user-footer">
      <!-- 这里@change默认绑定在了van-tabbar上，参考vue的$attr -->
      <TabBar :tabbars="tabbars" :defaultActive="defaultActive" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
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
export default defineComponent({
  components: {
    Navbar,
    TabBar
  },
  name: 'User',
  setup() {
    const route = useRoute()
    const router = useRouter()
    // const userInit = () => {
    //   onMounted(() => {
    //     const userInfoList = store.getters.user
    //     console.log(userInfoList.headimg)
    //   })
    // }

    let imgSrc  = 'https://img.yzcdn.cn/vant/cat.jpeg'
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
    // const userInit = () => (data.userInfoList = ref(store.getters.user))
    // // console.log(userInfoList)

    onMounted(() => {
      // userInit()
      imgSrc = store.getters.user.headimg
      console.log(imgSrc)
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
      background: url('../../../src/assets/images/user-bg.jpg');
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
      height: 140px;
      background-color: rgb(243, 243, 243);
      z-index: 99;
      border-radius: 5px;
    }
    .user-container-cell {
      margin-top: 110px;
    }
  }
}
</style>
