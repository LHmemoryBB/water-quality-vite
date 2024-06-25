<template>
  <div style="width: 100%; height: 100%">
    <div ref="chartRef" class="es-chart"></div>
    <el-dialog v-model="showDialog" :title="dialogTitle" width="900">
      <lineChart :lineChartData="lineChartData" :finalQuality="finalQuality"/>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, shallowRef, watch, ref } from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
import lineChart from "./lineChart.vue";
import { getWaterQualityDetail } from "@/api/route";
const props = defineProps({
  option: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  loading: Boolean,
});

const chartRef = shallowRef(null);
const chart = ref(null);

function init() {
  if (props.option) {
    chart.value = echarts.init(chartRef.value);
    setOption(props.option);
  }
}
const stationId = ref("");
const lineChartData = ref({
  particleSize: [],
  ph: [],
  conductivity: [],
  temperature: [],
  qualityLevel: [],
  measureTime: [],
  clarity: [],
});
const dialogTitle = ref("");
const finalQuality = ref("");
const showDialog = ref(false);
function setOption(option, notMerge, lazyUpdate) {
  chart.value.setOption(option, notMerge, lazyUpdate);
  // 确保每次设置选项后绑定点击事件
  chart.value.off("click"); // 先移除之前的点击事件
  chart.value.on("click", function (params) {
	console.log(params);
	finalQuality.value = params.value[2]
    if (params.seriesType === "effectScatter") {
      stationId.value = params.name;
      dialogTitle.value = params.name + "站点近期水质检测数据";
      getWaterQualityDetail({ observationName: stationId.value }).then(
        (res) => {
          const first20Items = res.slice(0, 20);
          lineChartData.value = {
            particleSize: [],
            ph: [],
            conductivity: [],
            temperature: [],
            qualityLevel: [],
            measureTime: [],
            clarity: [],
          };
          first20Items.forEach((item) => {
            lineChartData.value.particleSize.push(item.particleSize.toFixed(2));
            lineChartData.value.ph.push(item.ph.toFixed(2));
            lineChartData.value.conductivity.push(item.conductivity.toFixed(2));
            lineChartData.value.clarity.push(item.clarity.toFixed(2));
            lineChartData.value.temperature.push(item.temperature.toFixed(2));
            lineChartData.value.qualityLevel.push(item.qualityLevel);
            lineChartData.value.measureTime.push(
              dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          });

          console.log(lineChartData.value);
          showDialog.value = true;
        }
      );
      // 这里可以添加更多处理逻辑，例如导航到新的页面，显示详细信息等。
    }
  });
}

function resize() {
  chart.value.resize();
}

watch(
  () => props.option,
  (newOption) => {
    setOption(newOption);
  },
  { deep: true }
);

// show loading
watch(
  () => props.loading,
  (val) => {
    if (!chart.value) return;
    if (val) {
      chart.value.showLoading();
    } else {
      chart.value.hideLoading();
    }
  }
);

onMounted(() => {
  init();
});

defineExpose({
  chart,
  setOption,
  resize,
});
</script>

<style lang="less" scoped>
.es-chart {
  width: 100%;
  height: 100%;
}
</style>
