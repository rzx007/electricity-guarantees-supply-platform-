<template>
  <BorderBox title="发电类型统计图" unit="/万千瓦">
    <div id="charts01" class="charts_main"></div>
  </BorderBox>
</template>

<script lang="ts">
import { BorderBox } from '@/components/BorderBox'
import { echarts } from '@/utils/lib/echarts'
export default defineComponent({
  components: {
    BorderBox,
  },
  data() {
    return {}
  },
  mounted() {
    const chartDom = document.getElementById('charts01')
    const myChart = echarts.init(chartDom, 'dark')
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['台数', '座数', '容量'],
      },
      grid: {
        left: '3%',
        right: '3%',
        top: 30,
        bottom: 20,
      },
      color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['火电', '水电', '风电', '光伏', '其他'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '台数',
          type: 'bar',
          barGap: 0.2,

          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390],
        },
        {
          name: '座数',
          type: 'bar',

          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290],
        },
        {
          name: '容量',
          type: 'bar',

          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190],
        },
      ],
    }

    option && myChart.setOption(option)
  },
})
</script>
<style lang="scss">
.charts_main {
  height: 320px;
  width: 100%;
}
</style>
