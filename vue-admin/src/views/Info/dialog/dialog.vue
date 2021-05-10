<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogFormVisible"
    @close="close1"
    :modal="false"
    @opened="opened"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option 
          v-for="it in categoryOption.item" 
          :key='it.id' :label="it.category_name" :value="it.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          style="height: 170px"
          v-model="form.content"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button >取 消</el-button>
      <el-button type="primary" @click="submit"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { AddInfo } from '../../../api/news'
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";
export default {
  name: "dialog1",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const dialogFormVisible = ref(true);
    const formLabelWidth = ref("60px");
    const form = reactive({
      category: '',
      title:'',
      content:''
    });
    const categoryOption =reactive({
      item:[]
    })
    watch(() => (dialogFormVisible.value = props.flag));
    console.log(props.category);
    const close1 = () => {
      dialogFormVisible.value = false;
      emit("close", false);
    };
    const opened = () => {
      categoryOption.item = props.category;
      console.log(props.category);
    };
    const submit =() =>{
      let requestData={
        category:form.category,
        title:form.title,
        content:form.content
      }
      console.log(requestData)
      AddInfo(requestData).then(response =>{
        console.log(response.data)
        root.$message({
          message:response.data
        })
      })
    }
    return {
      form,
      formLabelWidth,
      dialogFormVisible,
      close1,
      opened,
      categoryOption,
      submit
    };
  },
};
</script>
<style scoped>
.dialog-footer {
  text-align: center;
}
</style>