<template>
  <el-form ref="ruleFormRef" :inline="true" :model="formInline" label-width="80px" :rules="rules" class="demo-form-inline">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formInline.name" placeholder="name..." />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="formInline.status" placeholder="status...">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="日期" prop="date">
        <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="date..."
        />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()
const formInline = reactive({})

const rules = reactive({
    name: [
        {required: true, message: 'please input name!', trigger: 'blur'}
    ],
    status: [
        {required: true, message: 'please select status', trigger: 'change'}
    ],
    date: [
        {required: true, message: 'please select date', trigger: 'change'}
    ]
})

const onSubmit = async () => {
  console.log('submit!')
  await ruleFormRef.value.validate((valid,fields) => {
    if(valid) {
        console.log(formInline)
    } else {
        console.log('aa',fields)
    }
    
  })
}

</script>

<style scoped>
.el-form{
    text-align: left;
    margin-bottom: 20px;
    padding: 20px;
}
</style>