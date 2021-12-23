<!-- about -->
<template>
  <div class="about_container">
    <div class="item author"></div>
    <div class="item author">
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { fetchUserInfo } from '@/api/authController'
import { useStore } from 'vuex'
import * as Types from '@/store/modules/Auth/types'
import { IGlobalState } from '@/store'

export default defineComponent({
  name: 'about',
  props: {},
  setup() {
    const store = useStore<IGlobalState>()
    const userInfo = computed(() => {
      return store.state.auth.userInfo
    })
    const code = computed(() => {
      return store.state.auth.code || '请使用微信浏览器查看'
    })
    const jumpUrl = () => {
      window.location.href = `${userInfo.value.projectAddress}`
    }
    onMounted(async () => {
      try {
        const res = await fetchUserInfo()
        if (res.code !== 0) return new Error(res.msg)
        store.dispatch(`auth/${Types.SAVE_USER_INFO}`, res.data)
      } catch (error) {
        console.log(error)
      }
    })
    return {
      userInfo,
      jumpUrl,
      code
    }
  }
})
</script>
<style lang="scss" scoped>
.about_container {
  height: 100vh;
  @include flexbox(flex-start, center, column);
  .item {
    margin: 15px 0;
    text-align: center;
  }
  .author {
    font-size: 16px;
  }
  .url {
    color: #4ca9f2;
    font-size: 14px;
    .label {
      text-align: center;
    }
    a {
      color: #4ca9f2;
    }
  }
}
</style>
