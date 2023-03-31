<template>
  <el-container class="layout">
    <el-container style="overflow: hidden; position: relative">
      <el-header class="zth-header">
        <Header></Header>
      </el-header>
      <el-main class="zth-main">
        <!-- <Tags v-if="showTags"></Tags> -->
        <section class="zth-view">
          <MainView />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu } from './Menu'
import { Header } from './Header'
import { MainView } from './Main'
import { useConfigStroe } from '@/store/appSetting'
import { useThemeStore } from '@/store/theme'
import { computed } from 'vue'

const themeStroe = useThemeStore()
const configStroe = useConfigStroe()

const menuMode = computed(() => configStroe.menuMode)
const showTags = computed(() => configStroe.tagsBar)
const menuColor = computed(() => (menuMode.value === 'horizontal' ? themeStroe.headerCss : themeStroe.menuCss))
const headerColor = computed(() => themeStroe.headerCss)

const mrt = computed(() => (!showTags.value ? '12px' : '0px'))

provide('layout-provide', { menuMode, menuColor, headerColor, showTags })
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  .zth-header {
    padding: 0;
    height: auto;
    transition: all 0.2s ease-in-out;
    z-index: 11;
  }
  .zth-main {
    padding-top: 20px;
    .zth-view {
      box-sizing: border-box;
      padding-top: v-bind('mrt');
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
