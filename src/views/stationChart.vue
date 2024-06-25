<template>
  <div class="es-block">
    <div style="width: 100%; height: 100%">
      <Chart :option="option" v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Chart from "@/components/Chart.vue";
import allData from "@/utils/map.json";
import chinaJson from "@/utils/china.json";
import { getStation } from "@/api/route";
import * as echarts from "echarts";
echarts.registerMap("china", chinaJson);
const option = ref();
const loading = ref(false);
const initData = () => {
  option.value = {
	title: {
      text: "水质分布图",
	  
    },
    geo: {
      type: "map",
      map: "china",
      top: "5%",
      bottom: "5%",
      itemStyle: {
        areaColor: "#2E72BF",
        borderColor: "#333",
      },
    },
    legend: {
      show: false,
      left: "5%",
      bottom: "5%",
      orient: "vertical",
      data: allData.map((item) => item.name),
      textStyle: {
        color: "#aaa",
      },
    },
    series: {
      type: "effectScatter",
      rippleEffect: {
        scale: 5,
        brushType: "stroke",
      },
      name: "水质",
      data: stationList.value,
      coordinateSystem: "geo",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return params.name + ": " + params.value[2]; // Customize based on your data structure
      },
    },
  };
  loading.value = true;
};
const stationList = ref([]);
const getStationList = () => {
  getStation().then((res) => {
    stationList.value = res.map((item) => {
      return {
		stationId: item.id,
        name: item.name,
        value: [parseFloat(item.lng), parseFloat(item.lat), item.qualityLevel],
		itemStyle: { color: setColor(item.qualityLevel) }
      };
    });
    initData();
  });
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
getStationList();
</script>

<style lang="less" scoped>
.es-block {
  width: 100%;
  height: 100%;
//   padding: 16px;
  // background-color: var(--es-block-bg);
}
</style>
