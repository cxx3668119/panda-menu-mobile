<template>
  <div class="user">
    <div class="user-heade">
      <Navbar :title="title" />
    </div>
    <div class="user-containe">
      这是测试
      <van-button type="primary" @click="goLogin">去登录</van-button>
    </div>
    <div class="user-footer">
      <!-- 这里@change默认绑定在了van-tabbar上，参考vue的$attr -->
      <TabBar :tabbars="tabbars" :defaultActive="defaultActive" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { throttle } from '@/utils/index'
import { useRoute,useRouter } from 'vue-router'
import Navbar, { NavList } from '@/components/Navbar.vue'
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
      title
    }
  }
})
</script>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.home-container {
  width: 100%;
  height: 385px;
  background: url('#{$url}c9ca54486d6e7db525acc7c571c8032.jpg') no-repeat center 100% / 100%;
}
</style>
