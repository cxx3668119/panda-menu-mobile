<template>
  <div class="user">
    user:shabi
    <div class="user-footer">
      <!-- 这里@change默认绑定在了van-tabbar上，参考vue的$attr -->
      <TabBar :tabbars="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import TabBar, { ITabList } from '@/components/TabBar.vue'

interface HomeState {
  tabbars: Array<ITabList>
  // defaultActive: number
}

export default defineComponent({
  components: {
    TabBar
  },
  name: 'User',
  setup() {
    const state: HomeState = reactive({
      tabbars: [
        { title: '首页', to: '/Home', icon: 'home-o', index: 0 },
        // { title: '案例', to: { name: 'Dome' }, icon: 'star-o' },
        { title: '我的', to: '/User', icon: 'user-circle-o', index: 1 }
      ]
    })

    const handleChange = (v: number) => {
      console.log('tab value:', v)
    }

    return {
      ...toRefs(state),
      handleChange
    }
  }
})
</script>

<style scoped></style>
