<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/logo1.png" />
    </div>
    <div class="slogan">
      <img src="@/assets/img/logo2.png" />
    </div>
    <div class="header-menu">
      <slot>
        <!-- <Menu menu-mode="horizontal"></Menu> -->
      </slot>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <Times style="margin-right: 16px" />
        <!-- 全屏显示 -->
        <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
          <el-icon :size="16" class="icon-cammand">
            <component is="rank" @click="handleFullScreen()" />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="重载" placement="bottom">
          <el-icon v-if="props.showThemeBar" :size="16" class="icon-cammand">
            <component is="refresh-right" @click="reloadPage" />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="header-bread"><Breadcrumb /></div>
  </div>
</template>
<script setup lang="ts">
import { Menu } from '../Menu'
import { Breadcrumb } from '../Breadcrumb'
import Times from '@/widgets/times.vue'
import { removeAllStorge } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router'
import { Ref, ref, unref } from 'vue'
import bus from '@/utils/bus'

const router = useRouter()
const route = useRoute()

const fullscreen: Ref<boolean> = ref(false)
const collapse: Ref<boolean> = ref(false)

const props = withDefaults(defineProps<{ showThemeBar?: boolean }>(), {
  showThemeBar: true,
})

// 获取layout状态peovide
const layoutProvide = inject<any>('layout-provide')
const { headerColor } = toRefs(layoutProvide)

// 收起展开侧边菜单
const handleCollapse = () => {
  collapse.value = !collapse.value
  bus.emit('swithCollapse', collapse.value)
}

const handleCommand = (command: string) => {
  if (command === 'loginout') {
    removeAllStorge()
    router.replace('/login')
  } else if (command === 'updataPassword') {
    // TODO
  }
}
const handleFullScreen = () => {
  const element = document.documentElement
  if (fullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else if (element.requestFullscreen) {
    element.requestFullscreen()
  }
  fullscreen.value = !fullscreen.value
}
// 刷新页面
const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath,
  })
}
</script>
<style lang="scss">
.header {
  background-image: url(../../assets/img/header-bg.png);
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 94px;
  font-size: 20px;
  padding: 0 20px;
  color: v-bind('headerColor.textColor');
  .logo {
    height: 74px;
    display: flex;
    align-items: center;
    padding-right: 20px;
    background-image: url(../../assets/img/Line-174.png);
    background-repeat: no-repeat;

    background-position: right center;
  }
  .slogan {
    height: 74px;
    display: flex;
    align-items: center;
  }
  i {
    font-size: 16px;
    cursor: pointer;
  }
  .solgan {
    cursor: pointer;
    max-width: 250px;
    line-height: 50px;
    margin-right: 24px;
    font-weight: bolder;
  }
  .header-menu {
    flex: 1;
  }
  .header-right {
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .header-user-con {
      display: flex;
      align-items: center;
    }
    .icon-cammand {
      color: v-bind('headerColor.textColor');
      transform: rotate(45deg);
      margin-left: 12px;
      font-weight: lighter;
    }
    .user-name {
      margin-left: 10px;
      color: v-bind('headerColor.textColor');
      .el-dropdown-link {
        cursor: pointer;
      }
    }
    .el-dropdown-menu__item {
      text-align: center;
    }
  }
  .header-bread {
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
}
</style>
