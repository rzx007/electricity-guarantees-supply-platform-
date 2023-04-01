<template>
  <BorderBox title="用电概况" unit="/兆千瓦" class="home-line">
    <el-row :gutter="18">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div ref="charts03" style="width: 100%; height: 350px"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="card-bottom">
          <ul class="list">
            <li class="list-item">
              <h4>当前值</h4>
              <div class="item-bottom">
                <span>{{ parseInt(currentData) }}</span>
              </div>
            </li>
            <li class="list-item">
              <h4>计划值</h4>
              <div class="item-bottom">
                <span>{{ parseInt(planData) }}</span>
              </div>
            </li>
            <li class="list-item list-item2 success">
              <h5>今日最大</h5>
              <span class="max">{{ todayValue.max.value ? parseInt(todayValue.max.value) : '-' }}</span>
              <i>{{ todayValue.max.time }}</i>
            </li>
            <li class="list-item list-item2 warning">
              <h5>今日最小</h5>
              <span class="mini">{{ todayValue.min.value ? parseInt(todayValue.min.value) : '-' }}</span>
              <i>{{ todayValue.min.time }}</i>
            </li>
            <li class="list-item list-item2 success">
              <h5>昨日最大</h5>
              <span class="max">{{ yesterdayValue.max.value ? parseInt(yesterdayValue.max.value) : '-' }}</span>
              <i>{{ yesterdayValue.max.time }}</i>
            </li>
            <li class="list-item list-item2 warning">
              <h5>昨日最小</h5>
              <span class="mini">{{ yesterdayValue.min.value ? parseInt(yesterdayValue.min.value) : '-' }}</span>
              <i>{{ yesterdayValue.min.time }}</i>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </BorderBox>
</template>

<script setup lang="ts">
import { BorderBox } from '@/components/BorderBox'
import { useLineBarECharts } from '@/hooks/useLineBarECharts'
import { ref, unref, Ref } from 'vue'
import { EChartsOption } from 'echarts'
import { getGraph, getPlanLine } from '@/api'
// getGraph是昨日和今日的接口
import day from 'dayjs'
const charts03 = ref<HTMLDivElement | null>(null)
let myChart = null
const { setOptions, getInstance, echarts } = useLineBarECharts(charts03 as Ref<HTMLDivElement>)
const xAxis = ref([])
const yAxis = ref([])
const legend = ['昨日', '今日', '计划']
const todayValue = ref({
  min: { value: '', time: '' },
  max: { value: '', time: '' },
})
const yesterdayValue = ref({
  min: { value: '', time: '' },
  max: { value: '', time: '' },
})
const currentData = ref(0)
const planData = ref(0)
let timer = null

const propsData = withDefaults(defineProps<{ selectCity: any }>(), { selectCity: {} })

const getHours = () => {
  xAxis.value = []
  // 赋值横坐标
  for (let index = 0; index < 24; index++) {
    const hours = index < 10 ? '0' + index : index
    let mins: string | number = '00'
    for (let i = 0; i < 60; i += 1) {
      mins = i < 10 ? '0' + i : i
      const item = `${hours}:${mins}`
      xAxis.value.push(item)
    }
  }
}
const getData = (city: any = {}) => {
  myChart = getInstance()
  myChart.showLoading()
  // 调接口获取纵坐标
  getGraph({
    day: day().format('YYYYMMDD'),
    yestday: day().subtract(1, 'day').format('YYYYMMDD'),
    dataid: city.id,
  })
    .then(async (res) => {
      // console.log(res,33)
      if (res.resultCode === '0') {
        const result = res.results
        const yesterday = []
        const today = []
        const todayArr = []
        const yesterdayArr = []
        result.forEach((item) => {
          //今日
          if (item['DATA_DATE'] === day().format('YYYYMMDD')) {
            for (let index = 0; index < 24; index++) {
              const hours = index
              let mins = 0
              for (let i = 0; i < 60; i += 1) {
                mins = i
                const str = `${hours}_${mins}`
                if (str === day().subtract(30, 'second').format('H_m')) {
                  currentData.value = item['DATA_' + str] || 0
                }
                today.push(item['DATA_' + str])
                todayArr.push({
                  value: item['DATA_' + str],
                  time: str,
                })
              }
            }
          } else {
            for (let index = 0; index < 24; index++) {
              const hours = index
              let mins = 0
              for (let i = 0; i < 60; i += 1) {
                mins = i
                const str = `${hours}_${mins}`
                yesterday.push(item['DATA_' + str])
                yesterdayArr.push({
                  value: item['DATA_' + str],
                  time: str,
                })
              }
            }
          }
        })
        // 获取纵坐标
        yAxis.value = [yesterday, today]
        await getPlanCurve(city.label)
        setChart()
        //最大最小值
        setMax(todayArr, todayValue.value)
        setMin(todayArr, todayValue.value)
        setMax(yesterdayArr, yesterdayValue.value)
        setMin(yesterdayArr, yesterdayValue.value)
      }
      myChart.hideLoading()
    })
    .catch(() => {
      myChart.hideLoading()
    })
}
const getPlanCurve = (type = '') => {
  return getPlanLine({ data_date: day().format('YYYYMMDD'), type }).then((res) => {
    if (res.resultCode === '0') {
      const result = res.results.length > 0 ? res.results[0] : []
      const arr = []
      let list = []
      // let currentIndex = 0
      // currentIndex++
      for (let index = 0; index < 24; index++) {
        const hours = index < 10 ? '0' + index : index
        let mins: number | string = '00'
        for (let i = 0; i < 60; i += 15) {
          mins = i < 10 ? '0' + i : i
          const str = `${hours}_${mins}`
          arr.push(result['DATA_' + str])
          // 计划
          const minArr = [0, 15, 30, 45]
          const num = Math.ceil(Number(day().format('m')) / 15)
          // console.log(Number(day().format('m')) / 15)

          if (num < 4) {
            const minStr = minArr[num]
            planData.value = result['DATA_' + `${day().format('HH')}_${minStr}`]
          } else {
            planData.value = result['DATA_' + `${day().add(1, 'hour').format('HH')}_0`]
          }
        }
      }
      // console.log(arr, 444)
      // console.log(result, 555)
      for (let i = 0; i < arr.length - 1; i++) {
        list.push(arr[i])
        list = list.concat(Array(14).fill(arr[i + 1]))
      }
      list = [...list, arr[arr.length - 1]]
      // planData.value = list[currentIndex]
      yAxis.value.push(list)
    }
  })
}
const setMax = (arr, value) => {
  if (arr.length === 0) {
    value.max = {
      value: '',
      time: '',
    }
    return
  }
  const max = arr.sort((a, b) => {
    return b.value - a.value
  })[0]
  value.max.value = max.value
  value.max.time =
    max.time.split('_')[0].toString().padStart(2, '0') + ':' + max.time.split('_')[1].toString().padStart(2, '0')
}
const setMin = (arr, value) => {
  if (arr.length === 0) {
    value.min = {
      value: '',
      time: '',
    }
    return
  }
  const min = arr.sort((a, b) => {
    return a.value - b.value
  })[0]
  value.min.value = min.value
  value.min.time =
    min.time.split('_')[0].toString().padStart(2, '0') + ':' + min.time.split('_')[1].toString().padStart(2, '0')
}
const setChart = () => {
  const series = getSeries()
  // echarts多条折线图
  const option: Partial<EChartsOption> = {
    legend: {
      data: legend,
    },
    xAxis: {
      data: xAxis.value,
    },
    series,
  }
  setOptions(option)
}
const getSeries = () => {
  let series = []
  const restSeries = {
    type: 'line',
    smooth: true,
    showSymbol: false,
  }
  // const arr = Array.from({ length: 1440 }, () => Math.floor(Math.random() * 401) + 100)
  // arr.sort((a, b) => a - b)
  // series = [{ name: legend[0], data: arr, ...restSeries }]
  for (let index = 0; index < yAxis.value.length; index++) {
    const item = yAxis.value[index]
    // 处理一条或者多头线
    if (Array.isArray(item)) {
      series.push({ name: legend[index], data: [...unref(item)], ...restSeries })
    } else {
      series = [{ name: legend[0], data: [...unref(yAxis.value)], ...restSeries }]
      break
    }
  }
  return series
}

onMounted(() => {
  // 0-24小时1分钟间隔时间代码
  getHours()
  setChart()
  getData()
  timer = setInterval(() => {
    getData()
  }, 60 * 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
watch(
  () => propsData.selectCity,
  async (val) => {
    clearInterval(timer)
    getData(val)
    timer = setInterval(() => {
      getData(val)
    }, 60 * 1000)
  },
  { deep: true }
)
</script>
<style lang="scss" scoped>
.home-line {
  border-radius: 4px;
  box-sizing: border-box;
}
.card-main {
  box-sizing: border-box;
  .card-content {
    padding: 20px;
    // background-color: rgba(227, 227, 227, 0.2);
  }
  .t-header {
    .sub-header {
      font-size: 12px;
    }
  }

  .charts_main {
    height: 320px;
    width: 100%;
  }
  .active {
    background-color: var(--color-primary);
    color: #fff;
  }
  .card-bottom {
    box-sizing: border-box;
    overflow-x: auto;
    padding-top: 10px;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      .list-item {
        height: 64px;
        margin-bottom: 5px;
        cursor: pointer;
        // box-shadow: rgba(128, 128, 128, 0.3) 0px 0px 30px inset;
        min-width: 80px;
        text-align: center;
        background-color: var(--el-color-primary-light-9);
        border: 1px solid var(--el-color-primary-light-5);
        border-radius: 6px;
        margin-right: 8px;
        color: var(--el-text-color-primary);
        box-sizing: content-box;
        h4 {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          width: 100%;
          padding: 2px 0;
          border-bottom: 1px solid var(--el-color-primary-light-5);
        }
        h5 {
          font-size: 14px;
          width: 100%;
          color: #fff;
          font-weight: 500;
        }
        .item-bottom {
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          height: 40px;
          color: #fff;
          span {
            font-size: 14px;
            font-weight: bold;
            color: var(--el-color-warning);
          }
        }
      }
      .list-item2 {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: bold;
        }
        .max {
          color: var(--el-color-warning);
          // var(--color-primary);
        }
        .mini {
          color: var(--el-color-warning);
          // var(--color-danger);
        }
        i {
          font-size: 14px;
          color: var(--el-color-warning);
        }
      }
      .warning {
        background-color: var(--el-color-danger-light-9);
        border: 1px solid var(--el-color-danger-light-5);
      }
      .success {
        background-color: var(--el-color-success-light-9);
        border: 1px solid var(--el-color-success-light-5);
      }
    }
  }
}
</style>
