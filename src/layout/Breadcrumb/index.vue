<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item>
      <el-dropdown v-if="parentRoute[0]?.children" class="user-name" trigger="hover" @command="handleCommand">
        <div class="bread-local">
          <img src="../../assets/img/Frame-2.png" alt="定位" /> <span> {{ parentRoute[0].title }} </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="(item, index) in parentRoute[0].children" :key="index">
              <el-dropdown-item :command="item.path">{{ item.title }}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: route.path }">{{ route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useParentRoute } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'Breadcrumb',
})
const route = useRoute()
const router = useRouter()

const { parentRoute } = useParentRoute()
const handleCommand = (command: any) => {
  router.push({ path: command })
}
</script>
<style lang="scss">
.el-dropdown,
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: var(--font-color);
}
.bread-local {
  display: flex;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
}
</style>
