<template>
  <div class="home">
    <div class="home-container">欢迎来到首页，正在开发中</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Toast } from 'vant'
import { throttle } from '../../utils/index'
export default defineComponent({
  name: 'Home',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 385px;
  background: url('../../../src/assets/images/bg.pic.jpg') no-repeat center 100% / 100%;
}
</style>
