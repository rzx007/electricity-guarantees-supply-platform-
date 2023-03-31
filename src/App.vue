<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useTheme } from '@/hooks'
const locale = zhCn
const { setTheme } = useTheme()
setTheme()
console.log('hello script setup')
// window.addEventListener(
//   'click',
//   (event: Event) => {
//     console.log(event)
//   },
//   false
// )
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100vh;
  background-image: url(./assets/img/bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
