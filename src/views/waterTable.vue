<template>
  <div class="table-container">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="观测点名称：">
            <el-input
              v-model="formInline.observationName"
              placeholder="请输入观测点"
              clearable
            />
          </el-form-item>
          <el-form-item label="时间范围：">
            <el-date-picker
              v-model="formInline.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main style="height: calc(100vh - 200px)"
        ><el-table :data="tableData" border style="width: 100%; height: 100%">
          <el-table-column prop="observationPointName" label="站点名称" />
          <el-table-column prop="clarity" label="透明度" />
          <el-table-column prop="clarityChange" label="透明度变化" />
          <el-table-column prop="ph" label="酸碱度" />
          <el-table-column prop="phchange" label="酸碱度变化" />
          <el-table-column prop="particleSize" label="颗粒大小" />
          <el-table-column prop="particleSizeChange" label="颗粒大小变化" />
          <el-table-column prop="conductivity" label="导电率" />
          <el-table-column prop="conductivityChange" label="导电率变化" />
          <el-table-column prop="temperature" label="温度" />
          <el-table-column prop="qualityLevel" label="水质等级" />
          <el-table-column prop="createdAt" label="记录时间" /> </el-table
      ></el-main>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="50"
          :total="totalNum"
          @current-change="currentChange"
        />
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getWaterQuality } from "@/api/route";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const tableData = ref([]);
const currentPage4 = ref(1);
const pageSize4 = ref(1);
const formInline = ref({
  observationName: "",
  timeRange: [],
});
const totalNum = ref(0);
const pageNum = ref(1);

const getTableData = async (type) => {
  const newForm1 = {};
  if (formInline.value.timeRange?.length > 0) {
    formInline.value.startTime = dayjs(formInline.value.timeRange[0]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    formInline.value.endTime = dayjs(formInline.value.timeRange[1]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
  console.log(formInline.value);
  const { timeRange, ...newForm } = formInline.value;
  const param = {
    pageNum: pageNum.value,
    pageSize: 50,
    ...newForm,
  };
  const res = await getWaterQuality(param);
  totalNum.value = res.total;
  tableData.value = res.records.map((item) => ({
    ...item,
    clarity: parseFloat(item.clarity.toFixed(2)),
    clarityChange: parseFloat(item.clarityChange.toFixed(2)),
    particleSize: parseFloat(item.particleSize.toFixed(2)),
    particleSizeChange: parseFloat(item.particleSizeChange.toFixed(2)),
    conductivity: parseFloat(item.conductivity.toFixed(2)),
    conductivityChange: parseFloat(item.conductivityChange.toFixed(2)),
    temperature: parseFloat(item.temperature.toFixed(2)),
    temperatureChange: parseFloat(item.temperatureChange.toFixed(2)),
    ph: parseFloat(item.ph.toFixed(2)),
    phChange: parseFloat(item.phchange.toFixed(2)),
    createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
  }));
  if (!type) {
    ElMessage({
      type: "success",
      message: "查询成功",
    });
  }
};
const onSubmit = () => {
  getTableData();
};
getTableData(1);
function currentChange(params) {
  pageNum.value = params;
  getTableData();
}
</script>

<style lang="less" scoped>
.table-container {
  height: calc(100vh - 200px);
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
