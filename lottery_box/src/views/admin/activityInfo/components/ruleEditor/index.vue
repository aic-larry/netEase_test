<template>
    <div class="rule-editor">
        <div class="btn-group flex-1 mb-20" v-if="!origin.conditions?.find(i => i.type === 'condition')">
            <el-button @click="pushItem" size="small" type="primary">添加</el-button>
        </div>
        <div v-for="(item, idx) in ruleJson.conditions" :key="`rule-${item.id}`">
            <div class="flex flex-row align-center mb-10" v-if="item.type === 'condition'">

                <el-select class=" mr-10" v-model="item.variable" placeholder="请选择" @change="keyChange">
                    <el-option v-for="item in keyList" :key="item.key" :label="item.keyName" :value="item.key">
                    </el-option>
                </el-select>
                <el-select class="w-120 mr-10" v-model="item.operator" placeholder="请选择">
                    <el-option v-for="item in conditionList[keyList.find(i => i.key === item.variable)?.type]"
                        :key="item.key" :label="item.val" :value="item.key">
                    </el-option>
                </el-select>
                <el-select class="w-130 mr-10" v-model="item.value"
                    v-if="keyList.find(i => i.key === item.variable)?.type === 'boolean'">
                    <el-option v-for="item in booleanList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="w-130 mr-10" v-model="item.value" v-else></el-input>
                <el-select class="w-100 mr-10" v-model="ruleJson.operator" placeholder="请选择"
                    v-if="ruleJson.conditions.length > 1 && idx !== ruleJson.conditions.length - 1">
                    <el-option v-for="item in condiList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="btn-group text-right flex-1">
                    <el-button @click="insertItem(item)" size="mini" v-if="idx !== 0">插入</el-button>
                    <el-button @click="pushItem" size="small" type="primary" v-if="idx === 0">添加</el-button>
                    <el-button @click="removeItem(item)" type="danger" size="small">移除</el-button>
                </div>
            </div>
            <div v-if="item.type === 'group'" class="pl-10">
                <div v-if="item.conditions.length > 1">(</div>
                <ruleEditor :ruleJson="item" :origin="ruleJson"></ruleEditor>

                <div v-if="item.conditions.length > 1">)</div>
                <el-select class="w-100 mr-10" v-model="ruleJson.operator" placeholder="请选择"
                    v-if="ruleJson.conditions.length > 1 && idx !== ruleJson.conditions.length - 1">
                    <el-option v-for="item in condiList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ruleEditor',
    props: {
        ruleJson: {
            type: Object,
            default: () => ({
                "type": "group",  // 条件组合类型，可以是 "group" 或 "condition"
                "operator": "and",  // 组合条件的操作符，可以是 "and" 或 "or"
                "conditions": [
                    {
                        "type": "condition",  // 条件类型
                        "variable": "userLevel",  // 变量名
                        "operator": "gt",  // 操作符
                        "value": 12  // 值
                    },
                    {
                        "type": "group",  // 嵌套条件组合
                        "operator": "or",  // 组合条件的操作符
                        "conditions": [
                            {
                                "type": "condition",
                                "variable": "userActive",
                                "operator": "eq",
                                "value": true
                            },
                            {
                                "type": "condition",
                                "variable": "userServer",
                                "operator": "suffix",
                                "value": "_test"
                            }
                        ]
                    }
                ]
            })
        },
        origin:{
            type: Object,
        }
    },
    data() {
        return {
            value: '',
            keyList: [
                { keyName: '用户等级', key: 'userLevel', type: 'number' },
                { keyName: '是否活跃用户', key: 'userActive', type: 'boolean' },
                { keyName: '服务器名称', key: 'userServer', type: 'string' },
            ],
            conditionList: {
                number: [
                    { key: 'eq', val: '等于' },
                    { key: 'neq', val: '不等于' },
                    { key: 'gt', val: '大于' },
                    { key: 'lt', val: '小于' },
                    { key: 'gte', val: '大于等于' },
                    { key: 'lte', val: '小于等于' },
                ],
                boolean: [
                    { key: 'eq', val: '等于' },
                    { key: 'neq', val: '不等于' },
                ],
                string: [
                    { key: 'eq', val: '等于' },
                    { key: 'neq', val: '不等于' },
                    { key: 'preffix', val: '前缀匹配' },
                    { key: 'suffix', val: '后缀匹配' },
                    { key: 'include', val: '包含' },
                ]
            },
            booleanList: [
                { label: '真', value: true },
                { label: '假', value: false }
            ],
            condiList: [
                { label: '且', value: 'and' },
                { label: '或', value: 'or' }
            ],
            conditionMap: {
                and: '且',
                or: '或',
            }
        }
    },
    created() {
    },
    methods: {
        keyChange() {
            console.log(this.ruleList)
        },
        pushItem() {
            this.ruleJson.conditions.push({
                "type": "condition",
                "id": `${this.ruleJson.operator}${this.ruleJson.id}-${this.ruleJson.conditions.length}`
            })
        },
        insertItem(item) {
            console.log(item)
            this.ruleJson.conditions.splice(this.ruleJson.conditions.findIndex(i => i.id === item.id), 1, {
                "type": "group",
                "conditions": [item, {
                    "type": "condition",
                    "id": `${this.ruleJson.operator}${this.ruleJson.id}-${this.ruleJson.conditions.length}-${new Date().getTime().toString().split(-6)}`
                }],
                "id": `${this.ruleJson.operator}${this.ruleJson.id}-${this.ruleJson.conditions.length}-${new Date().getTime().toString().split(-6)}`
            })
        },
        removeItem(item) {
            console.log(item)
            console.log(this.origin)
            console.log(this.ruleJson)
            if (this.ruleJson.conditions.length === 1) {
                this.origin.conditions.splice(this.origin.conditions.findIndex(i => i.id === item.id), 1)
            }
            else {
                this.ruleJson.conditions.splice(this.ruleJson.conditions.findIndex(i => i.id === item.id), 1)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>