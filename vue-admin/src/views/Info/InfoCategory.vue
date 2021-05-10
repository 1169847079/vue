<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({level:'category_first_add'})">添加一级分类</el-button>
    <div>
      <hr/>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="category" :key="item.index" v-for="item in category.ctg">
            <h4>
              <svg-icon icon-class="加号"></svg-icon>{{ item.category_name }}
              <div class="button-group">
                <el-button type="danger" size="mini"  round @click="editCategory({data:item.category_name,id:item.id,level:'category_first'})">编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button round size="mini" @click="deleteCategory1(item.id)">删除</el-button>
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="kid in item.children" :key="kid.index">
                {{ kid.category_name }}
                <div class="button-group1">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button round size="mini" >">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="14">
          <h5 class="menu-title">一级分类编辑</h5>
          <el-form
            class="menu-content"
            :label-position="labelPosition"
            label-width="142px"
            :model="formLabelAlign"
          >
            <el-form-item label="一级分类名称:" v-if="category_first">
              <el-input v-model="formLabelAlign.name" :disabled="category_first_disable"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="category_sec" >
              <el-input v-model="formLabelAlign.region" :disabled="category_sec_disable"></el-input>
            </el-form-item>
            <el-button type="danger" @click="submit" :disabled="submit_disable">确定</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { AddFirstCategory,GetCategory,DeleteCategory,EditCategory} from "../../api/news";
import { onMounted, reactive, ref } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup(props, { root,refs}) {
    const labelPosition = ref("right");
    const sub_button_type =ref('')
    const category_first = ref(true);
    const category_sec = ref(true);
    const category_first_disable =ref(true)
    const category_sec_disable=ref(true)
    const submit_disable=ref(true)
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });
    const category = reactive({
        ctg:[
      {
        id: "",
        category_name: "",
        children: [{
          id: "",
          category_name: "",
        }],
      },
      {
        id: "",
        category_name: "",
        children: [
          {
            id: "",
            category_name: "",
          },
          {
            id: "",
            category_name: "",
          },
        ],
      },
    ],
    current:[]
    });
    const editCategory =(parmas) =>{ 
      sub_button_type.value=parmas.level
      category_first_disable.value=false
      category_sec.value =false;
      submit_disable.value =false;
      formLabelAlign.name=parmas.data
      category.current=parmas
      console.log(category.current)
    }
    const editFirstCategory = () =>{
      if (category.current.length==0) {
         root.$message({
              message: '未选择分类',
              type: "warning",
            });
      }else{
      let requestData={
        id:category.current.id,
        categoryName:formLabelAlign.name
      }
      EditCategory(requestData).then(response =>{
        console.log(response)
         root.$message({
              message: response.message,
              type: "success",
            });
        let data=category.ctg.filter(ctg =>ctg.id==category.current.id)
        data[0].category_name=formLabelAlign.name
        formLabelAlign.name='',
        category.current=[]
      }).catch(error =>{
        console.log(error)
      })
    }}

    const deleteCategory1 = (ID) =>{
      DeleteCategory({categoryId:ID}).then((response) =>{
          root.$message({
              message: response.message,
              type: "success",
            });
        let index=category.ctg.findIndex(ctg =>ctg.id==ID)
        console.log(index)
        category.ctg.splice(index,1)
      }).catch((error) =>{
         
      })
    }
    const  AddFirstCategory1= () =>AddFirstCategory({ categoryName: formLabelAlign.name })
        .then((response) => {
          if (response.resCode == 0) {
            root.$message({
              message: response.message,
              type: "success",
            });
             formLabelAlign.name=''
            console.log(response.data)
            category.ctg.push(response.data)
          }
        })
        .catch((error) => {
          console.log(11);
        });
    const submit = () => { //确定按钮的两个方法
      if (sub_button_type.value=='category_first_add') {
        AddFirstCategory1()
      }else if(sub_button_type.value=='category_first'){
        editFirstCategory()
      }
    };
   
    const addFirst = (parmas) => {
      sub_button_type.value=parmas.level
      category_sec.value =!category_sec.value;
      category_first_disable.value =!category_first_disable.value
      submit_disable.value =!submit_disable.value
      console.log(sub_button_type.value)
    };

    const getCategory =() =>{
        GetCategory({}).then(response =>{
           let data=response.data.data
            console.log(data)
            category.ctg=data
        }).catch(error =>{

        })
    }
    onMounted(() =>{
        getCategory()
    })
    return {
      labelPosition,
      formLabelAlign,
      submit,
      addFirst,
      category_first,
      category_sec,
      category,
      getCategory,
      category_first_disable,
      category_sec_disable,
      submit_disable,
      deleteCategory1,
      editCategory,
      sub_button_type,
      editFirstCategory,
      AddFirstCategory1
      
    };
  },
};
</script>

<style lang='scss' scoped>
#category {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 21px;
    }
  }
}
ul {
  list-style: none;
}

.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 1px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
    position: relative;
    transition: all 1s;
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
    .button-group {
      display: none;
      position: absolute;
      right: 0px;
      top: 0px;
    }
    svg {
      position: absolute;
      left: 15px;
      top: 9px;
      width: 15px;
    }
  }

  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    transition: all 0.3s ease 0s;
    &:hover {
      background-color: #f3f3f3;
      .button-group1 {
        display: block;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
    .button-group1 {
      display: none;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.menu-content {
  position: relative;
  .el-input {
    width: 210px;
  }
  .el-form-item {
    padding-top: 10px;
  }
  .el-button {
    position: absolute;
    
    left: 142px;
  }
}
hr {
  margin: 30px -30px 30px -30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>