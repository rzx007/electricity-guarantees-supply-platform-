<template>
  <div class="home-main">
    <el-row :gutter="18">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="margin-bottom: 18px">
        <lineCharts></lineCharts>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" style="margin-bottom: 18px"> 地图 </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import lineCharts from './widgets/line-charts.vue'
</script>
<style lang="scss">
.home-main {
  box-sizing: border-box;
  padding: 18px 0;
  min-height: 100%;
}
</style>
