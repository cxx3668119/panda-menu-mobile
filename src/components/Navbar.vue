<template>
  <van-nav-bar :title="title" :left-text="leftText" left-arrow @click-left="onClickLeft" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface NavList{
    title:string//标题
    leftText:string//按钮名称
}

export default defineComponent({
  name: 'NavBar',
  props:{
      title:{
          type:String,
          default:'标题'
      },
      leftText:{
          type:String,
          default:'返回'
      }
  },
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  }
})
</script>

<style scoped></style>
