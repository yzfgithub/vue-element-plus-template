<template>
    <el-table :data="tableData.dataList" style="width: 100%">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination
        v-model:currentPage="paginationObj.currentPage"
        v-model:page-size="paginationObj.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationObj.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { reactive } from 'vue'

let tableData = reactive({
    dataList: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                }
              ]
})
const paginationObj = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 100
})
const handleSizeChange = (size) => {
    console.log(size)
    paginationObj.pageSize = size;
}
const handleCurrentChange = (page) => {
    paginationObj.currentPage = page;
    // get list
    tableData['dataList'] = [{
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        }]
}
</script>
<style scoped>
.el-table{
    padding: 20px;
}
.el-pagination{
    float: right;
    margin-right: 20px;
}
</style>