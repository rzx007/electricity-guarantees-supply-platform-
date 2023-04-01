import { useECharts } from '@/hooks/useECharts'
import { EChartsOption } from 'echarts'
/**
 * 统一echarts的折线图与柱状图基础样式风格
 * @param {*} elRef echarts挂载ref dom
 * @param {*} theme echarts主题 默认dark
 */
export const useLineBarECharts = (elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'dark') => {
  const { setOptions: options, getInstance, echarts } = useECharts(elRef, theme)
  const defaultOption: Partial<EChartsOption> = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          color: '#ffffff',
        },
      },
    },
    legend: {
      show: true,
      icon: 'stack',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#C7EDFF',
      },
      data: [],
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        color: '#C7EDFF',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#C7EDFF',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(230, 247, 255, 0.20)',
        },
      },
    },
  }
  // 合并EChartsOption, 传入配置优先级高
  const setOptions = (option: Partial<EChartsOption>) => {
    for (const key in option) {
      const item = option[key]
      if (!Array.isArray(item) && defaultOption[key]) {
        // @ts-ignore
        option[key] = { ...defaultOption[key], ...item }
      }
    }
    const chartOptions = { ...defaultOption, ...option }
    options(chartOptions)
  }
  return {
    setOptions,
    echarts,
    getInstance,
  }
}
