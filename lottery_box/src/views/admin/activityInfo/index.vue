<template>
    <div>
        <div class="btn-group text-right">
            <el-button size="small" @click="goback">返回</el-button>
            <el-button size="small" type="primary" @click="save">保存</el-button>
        </div>
        <div class="text-center mb-30">{{ info.activityName }}</div>
        <div class="mb-20">基本信息</div>
        <div class="tr flex flex-row align-center justify-around mb-20">
            <div class="info-item flex flex-row align-center ">
                <div class="label">活动名称：</div>
                <div class="value">
                    <el-input v-model="info.activityName"></el-input>
                </div>
            </div>
            <div class="info-item flex flex-row align-center ">
                <div class="label">抽奖形式：</div>
                <div class="value">
                    <el-radio-group v-model="info.lotteryType">
                        <el-radio :label="1">大转盘</el-radio>
                        <el-radio :label="2">九宫格</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <div class="tr flex flex-row align-center justify-around mb-20">
            <div class="info-item flex flex-row align-center">
                <div class="label">活动时间：</div>
                <div class="value">
                    <el-date-picker v-model="info.activityTime" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="mb-20">参与用户规则：</div>
        <div>
            <ruleEditor :ruleJson="ruleJson" :origin="ruleJson" ></ruleEditor>
        </div>

        <div class="mb-20">奖品列表：</div>
        <div>
            <div class="btn-group text-left">
                <el-button size="small" type="primary" @click="openStore">更新</el-button>
                <el-button size="small" type="danger" @click="deleteSelect">删除选中</el-button>
            </div>
            <div>
                <el-table :data="awardListSelected" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="awardName" label="奖品名称">
                    </el-table-column>
                    <el-table-column prop="store" label="库存" width="180">
                    </el-table-column>
                    <el-table-column prop="rate" label="概率权重" width="120">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <!-- <el-button size="small">编辑</el-button> -->
                            <el-button type="danger" size="small" @click="removeItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog title="更新奖品" :visible.sync="dialogVisible" width="80%" :before-close="cancelSelected">
            <el-table :data="awardList" style="width: 100%" @selection-change="handleSelectionChange" ref="awardTable">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="awardName" label="奖品名称">
                </el-table-column>
                <el-table-column prop="store" label="库存" width="180">
                </el-table-column>
                <el-table-column prop="rate" label="概率权重" width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.rate"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSelected">取 消</el-button>
                <el-button type="primary" @click="updateAwardListSelected">添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { timeFormatter } from '@/utils'
import ruleEditor from './components/ruleEditor/index.vue'
export default {
    components: {
        ruleEditor
    },
    data() {
        return {
            info: {},
            dialogVisible: false,
            ruleJson: {
                "id": "1",
                "type": "group",  // 条件组合类型，可以是 "group" 或 "condition"
                "operator": "and",  // 组合条件的操作符，可以是 "and" 或 "or"
                "conditions": [
                    // {   
                    //     "id":"and1-1",
                    //     "type": "condition",  // 条件类型
                    //     "variable": "userLevel",  // 变量名
                    //     "operator": "gt",  // 操作符
                    //     "value": 12  // 值
                    // },
                    // {
                    //     "id":"and1-2",
                    //     "type": "group",  // 嵌套条件组合
                    //     "operator": "or",  // 组合条件的操作符
                    //     "conditions": [
                    //         {
                    //             "id":"or1-2-1",
                    //             "type": "condition",
                    //             "variable": "userActive",
                    //             "operator": "eq",
                    //             "value": true
                    //         },
                    //         {
                    //             "id":"or1-2-2",
                    //             "type": "condition",
                    //             "variable": "userServer",
                    //             "operator": "suffix",
                    //             "value": "_test"
                    //         }
                    //     ]
                    // }
                ]
            },
            awardList: [
                { awardName: '手机', store: 10, rate: 10 },
                { awardName: '手表', store: 10, rate: 120 },
                { awardName: '苹果', store: 10, rate: 30 },
                { awardName: '棒棒糖', store: 10, rate: 40 },
                { awardName: '娃娃', store: 10, rate: 40 },
                { awardName: '木马', store: 10, rate: 40 },
                { awardName: '德芙', store: 10, rate: 40 },
                { awardName: '玫瑰', store: 10, rate: 40 },
            ],
            awardListSelected: [],
            selectedRow: [],
        }
    },
    created() {
        if (sessionStorage.getItem('activity_info')) {
            this.info = JSON.parse(sessionStorage.getItem('activity_info'))
            this.info.activityTime = [
                this.info.startTime, this.info.endTime
            ]
        }
        else {
            this.$router.push('/activity')
        }
    },
    methods: {
        goback() {
            this.$router.go(-1)
        },
        save() {
            console.log(this.ruleJson)
            this.info.startTime = timeFormatter(this.info.activityTime[0], '{year}-{month}-{day}-{hour}:{minute}:{second}')
            this.info.endTime = timeFormatter(this.info.activityTime[1], '{year}-{month}-{day}-{hour}:{minute}:{second}')
            // this.goback()
        },
        openStore() {
            this.dialogVisible = true
            console.log(this.awardListSelected)
            if (this.awardListSelected) {
                this.awardListSelected.forEach(row => {
                    this.$refs.awardTable.toggleRowSelection(row);
                })
            }
        },
        deleteSelect() {

        },
        updateAwardListSelected() {
            this.dialogVisible = false
            this.awardListSelected = this.selectedRow
        },
        cancelSelected() {
            this.dialogVisible = false
            this.$refs.awardTable.clearSelection();
        },
        handleSelectionChange(row) {
            this.selectedRow = row
        },
        removeItem(row) {
            this.awardListSelected.splice(this.awardListSelected.findIndex(i => i.awardName === row.awardName), 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.tr {
    .info-item {
        flex: 1;
        margin-left: 10px;

        .label {
            width: 120px;
        }
    }
}
</style>