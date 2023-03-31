<template>
  <div class="widget_times">
    <div class="time">{{ time }}</div>
    <div class="date">
      <div class="week">{{ week }}</div>
      <div class="day">{{ day().format('YYYY-MM-DD') }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import day from 'dayjs'
import { getWeek, getTime } from '@/utils'
defineOptions({
  name: 'Times',
})
const time = ref(getTime())
const week = ref(getWeek())
let timer: number = null
onMounted(() => {
  timer = setInterval(() => {
    time.value = getTime()
  }, 1000 * 10)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<style lang="scss">
.widget_times {
  display: flex;
  justify-content: center;
  align-items: center;
  .time {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    padding-right: 10px;
    position: relative;
    background-image: url(../assets/img/Line-174.png);
    background-repeat: no-repeat;
    background-size: 2px 20px;
    background-position: right center;
  }
  .date {
    padding-left: 10px;
    font-size: 12px;
    color: #fff;
    font-weight: lighter;
    letter-spacing: 1px;
  }
}
</style>
