<template>
    <div>
        <div class="btn-group">

            <el-button size="small" type="primary">新增</el-button>
            <el-button size="small" type="danger">删除选中</el-button>
        </div>
        <el-card class="box-card">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="activityName" label="活动名称" width="180">
                </el-table-column>
                <el-table-column prop="lotteryType" label="抽奖形式" width="180">
                    lotteryMap
                    <template slot-scope="scope">
                        {{ lotteryMap[scope.row.lotteryType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="startTime" label="活动开始时间" width="180">
                </el-table-column>
                <el-table-column prop="endTime" label="活动结束时间">
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">奖品列表</el-button> -->
                        <el-button size="small" @click="handleClick(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            lotteryMap: {
                1: '大转盘',
                2: '九宫格',
            }
        }
    },
    created() {
        this.tableData = [
            { activityId:1,activityName: '大转盘活动', lotteryType: 1, startTime: '2024-06-30', endTime: '2024-09-30' },
            { activityId:2,activityName: '九宫格活动', lotteryType: 2, startTime: '2024-06-30', endTime: '2024-09-30' },
        ]
    },
    methods:{
        handleClick(row){
            console.log('row:',row)
            sessionStorage.setItem('activity_info',JSON.stringify(row))
            this.$router.push(`/activityInfo?activityId=${row.activityId}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-group {
    margin-bottom: 20px;
}
</style>