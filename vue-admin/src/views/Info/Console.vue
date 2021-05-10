<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4"
        ><span>类型：</span>
        <el-select
          v-model="categoryvalue"
          size="middle"
          placeholder="请选择"
          style="width: 110px"
        >
          <el-option
            v-for="item in options.ctg"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <span>日期：</span>
        <el-date-picker
          v-model="datavalue2"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="3"
        ><span>关键字：</span>
        <el-select v-model="Keyword" size="middle">
          <el-option
            v-for="item in Keyoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 180px"
        ></el-input>
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="1"
        ><el-button type="danger" @click="dialog_info = true"
          >新增</el-button
        ></el-col
      >
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column prop="category" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="data" label="日期" width="300"> </el-table-column>
      <el-table-column prop="user" label="管理员"> </el-table-column>
      <el-table-column label="操作" width="200">
        <el-button type="danger" size="small" @click="deleteItem"
          >删除</el-button
        >
        <el-button type="success" size="small">编辑</el-button>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12"
        ><el-button size="middle" @click="deleteAll"
          >批量删除</el-button
        ></el-col
      >
      <el-col :span="12">
        <el-pagination
          background
          layout="total,jumper,prev, pager, next"
          :total="100"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <Dialog1 :flag="dialog_info" @close="closeDialog" :category='options.ctg'/>
    
  </div>
</template>

<script>
import {GetCategory} from "../../api/news";
import Dialog1 from "./dialog/dialog.vue";
import {common} from '../../api/common';
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  components: { Dialog1 },
  setup(props, { root }) {
    const {getInfoCategory,category} =common()
    const dialog_info = ref(false);
    const dialogTableVisible = ref(false);
    const tableData = reactive([
      {
        title: "2132",
        category: "王小虎",
        data: "",
        user: "2",
      },
      {
        title: "",
        namcategorye: "王小虎",
        data: "",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ]);
    const options = reactive({
        ctg:[

        ]
      
    });
    const Keyoptions = reactive([
      {
        value: "选项1",
        label: "ID",
      },
      {
        value: "选项2",
        label: "标题",
      },
    ]);
    const categoryvalue = ref("");
    const datavalue2 = ref("");
    const Keyword = ref("ID");
    const input = ref("");
    const closeDialog = () => {
      dialog_info.value = false;
    };
    const deleteItem = () => {
      root.confirm({
        content: "确认删除当前信息，确认后将无法恢复",
        fn: confirmDelete,
        fn1:confirmNoDelete
      });
    };
    const deleteAll = () => {
      root.confirm({
        content: "确认删除全部信息！，删除后将无法恢复",
        fn: confirmDelete,
        fn1:confirmNoDelete
      });
    };
    const confirmDelete = () => {
      root.$message({
        type: "success",
        message: "删除成功!",
      });
    };
    const confirmNoDelete = () => {
      root.$message({
        type: "info",
        message: "已取消删除",
      });
    };
    
    onMounted(() =>{
        getInfoCategory()
    })
    watch(() => category.item,(value) =>{
      options.ctg =value
    })
    return {
      options,
      categoryvalue,
      datavalue2,
      Keyoptions,
      Keyword,
      input,
      tableData,
      dialogTableVisible,
      dialog_info,
      closeDialog,
      deleteItem,
      deleteAll,
      confirmDelete,
      confirmNoDelete,
    };
  },
};
</script>


<style >
.el-table th,
.el-table td {
  text-align: center;
}
.el-table .cell,
.el-table--border td:first-child .cell {
  padding-left: 14px;
}
</style>
<style lang='scss' scoped>
.el-pagination {
  float: right;
}
.el-table {
  margin: 15px 0;
}
.el-button:nth-child(1) {
  margin: 0 20px;
}
.el-table .el-button {
  width: 60px;
}
.el-input {
  margin-right: 20px;
}
.el-col-10 {
  width: 38.66667%;
}
.el-col-9 {
  width: 34.5%;
}
.el-select {
  width: 90px;
}
</style>