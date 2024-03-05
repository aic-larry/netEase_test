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
                <el-table-column prop="awardName" label="奖品名称">
                </el-table-column>
                <el-table-column prop="store" label="库存"  width="180">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"  width="120">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间"  width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" >
                    <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
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
            tableData: [
            ]
        }
    },
    created() {
        this.tableData = [
            { awardName: '手机', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '手表', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '苹果', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '棒棒糖', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '娃娃', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '木马', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '德芙', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
            { awardName: '玫瑰', store: 10, createTime: '2024-04-22', updateTime: '2024-04-25' },
        ]
    }
}
</script>

<style lang="scss" scoped>
.btn-group {
    margin-bottom: 20px;
}
</style>