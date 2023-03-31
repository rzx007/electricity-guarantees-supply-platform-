<template>
  <div class="card-content">
    <div v-if="title" class="t-header">
      <div class="header-left">
        <img src="../../../assets/img/Frame-11403.png" alt="" />
        <span class="header-title">{{ title }}</span>
        <span class="sub-header"> {{ unit }}</span>
      </div>
      <div class="header-right">
        <slot name="header-right" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BorderBox',
})
defineProps({
  title: {
    type: String,
    default: '全网发电',
  },
  unit: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss">
.card-content {
  background-color: rgba(11, 37, 75, 0.58);
  box-sizing: border-box;
  border: 1px solid rgba(173, 235, 255, 0.12);
  .t-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 39px;
    background-image: url(../../../assets/img/header-left.png), url(../../../assets/img/header-right.png);
    background-repeat: no-repeat, no-repeat;
    background-size: 280px 39px, 70px 39px;
    background-position: left, right;
    border-bottom: 1px solid rgba(173, 235, 255, 0.12);
    .header-left {
      color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin: 0 10px;
      }
      .header-title {
        font-size: 18px;
        font-weight: bold;
      }
      .sub-header {
        font-size: 14px;
        margin-left: 12px;
        letter-spacing: 2px;
        color: var(--el-color-info);
      }
    }
  }
  .grid-content {
    box-sizing: border-box;
    padding-top: 12px;
    height: 200px;
  }
}
</style>
