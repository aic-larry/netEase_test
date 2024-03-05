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
                <el-table-column prop="userName" label="用户名称" width="180">
                </el-table-column>
                <el-table-column prop="userLevel" label="用户等级" width="180">
                </el-table-column>
                <el-table-column prop="userActive" label="是否活跃用户">
                    <template slot-scope="scope">
                        {{scope.row.userActive === 1?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="userServer" label="服务器名称">
                </el-table-column>
                <el-table-column label="操作">
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
            { userName: '用户1', userLevel: 10, userActive: 1, userServer: '127.0.0.1' },
            { userName: '超级会员用户', userLevel: 10, userActive: 1, userServer: '127.0.0.1' },
            { userName: '用户名称', userLevel: 10, userActive: 0, userServer: '127.0.0.1' },
        ]
    }
}
</script>

<style lang="scss" scoped>
.btn-group {
    margin-bottom: 20px;
}
</style>