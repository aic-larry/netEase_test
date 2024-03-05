<template>
    <div>
        <div class="btn-group text-right">
            <el-button size="small" @click="goback">返回</el-button>
            <el-button size="small" type="primary" @click="save">保存</el-button>
        </div>
        <div class="tr flex flex-row align-center mb-20">
            <div class="td flex flex-row align-center flex-1">
                <div>用户名称：</div>
                <div>
                    <el-input v-model="info.userName"></el-input>
                </div>
            </div>
            <div class="td flex flex-row align-center flex-1">
                <div>服务器名称：</div>
                <div>
                    <el-input v-model="info.userServer"></el-input>
                </div>
            </div>
        </div>
        <div class="tr flex flex-row align-center mb-20">
            <div class="td flex flex-row align-center flex-1">
                <div>用户等级：</div>
                <div>
                    <el-input v-model="info.userLevel"></el-input>
                </div>
            </div>
            <div class="td flex flex-row align-center flex-1">
                <div>是否活跃用户：</div>
                <div>
                    <el-radio-group v-model="info.userActive">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {
                userName: '',
                userServer: '',
                userActive: 1,
                userLevel: '',
            }
        }
    },
    created() {
        const infoStr = sessionStorage.getItem('userInfo')
        if (infoStr) {
            try {
                this.info = JSON.parse(infoStr)
            } catch {
                this.info = {}
            }
        }
    },
    methods: {

        goback() {
            this.$router.go(-1)
        },
        save() {
        },
    }
}
</script>

<style lang="scss" scoped></style>