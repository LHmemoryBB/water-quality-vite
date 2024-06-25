<template>
  <div>
    <div ref="chartRef" class="chart"></div>
    <div style="text-align:center">
        <h2>水质检测结果为：<span :style="{color: setColor(finalQuality)}">{{finalQuality}}</span></h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  lineChartData: {
    type: Object,
  },
  finalQuality: {
    type: String,
  },
});
// 模拟数据
const data = props.lineChartData;

const chartRef = ref(null);
let chartInstance = null;

const initializeChart = () => {
  chartInstance = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
    },
    xAxis: {
      type: "category",
      data: data.measureTime,
    },
    yAxis: [
      { type: "value", name: "particleSize", position: "left", show: false },
      { type: "value", name: "ph", position: "right", show: false },
      {
        type: "value",
        name: "conductivity",
        position: "right",
        offset: 60,
        show: false,
      },
      {
        type: "value",
        name: "temperature",
        position: "right",
        offset: 120,
        show: false,
      },
      {
        type: "value",
        name: "clarity",
        position: "right",
        offset: 180,
        show: false,
      }
    ],
    series: [
      {
        name: "颗粒大小(微米)",
        type: "line",
        data: data.particleSize,
        yAxisIndex: 0,
        smooth: true
      },
      {
        name: "酸碱度(pH)",
        type: "line",
        yAxisIndex: 1,
        data: data.ph,
        smooth: true
      },
      {
        name: "电导率(S/m)",
        type: "line",
        yAxisIndex: 2,
        data: data.conductivity,
        smooth: true
      },
      {
        name: "温度(°C)",
        type: "line",
        yAxisIndex: 3,
        data: data.temperature,
        smooth: true
      },
      {
        name: "透明度",
        type: "line",
        yAxisIndex: 4,
        data: data.clarity,
        smooth: true
      },
    ],
  };

  chartInstance.setOption(option);
};
function setColor(params) {
	switch (params) {
		case '严重污染':
			return '#FF0000'
			break;
		case '污染':
			return '#FFA500'
			break;
		case '正常':
			return '#FFFF00'
			break;
		case '较好':
			return '#00FF00'
			break;
	
		default:
			break;
	}
}
onMounted(() => {
  initializeChart();
});

watch(
  () => data,
  () => {
    if (chartInstance) {
      initializeChart();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 800px;
  height: 500px;
}
</style>
