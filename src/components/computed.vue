<template>
    <div class="car-content">
        <a-card title="基本信息" style="width: 100%">
            <a-form v-bind="formItemLayout" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-row :gutter="24" :wrap="true">
                    <a-col :xs="10" :sm="10" :md="10" :lg="8" :xl="10">
                        <a-form-item label="性别">
                            <a-radio-group v-model:value="formState.userInfo.sexVal" button-style="solid">
                                <a-radio-button v-for="item, index in sex" :key="index" :value="item">{{ item
                                }}</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="10" :sm="10" :md="10" :lg="8" :xl="10">
                        <a-form-item label="体重">
                            <a-input-number id="inputNumber" v-model:value="formState.userInfo.weight" :min="0" :max="300"
                                addon-after="kg" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="10" :sm="10" :md="12" :lg="8" :xl="10">
                        <a-form-item label="训练时长">
                            <a-form-item name="input-number" no-style>
                                <a-input-number id="inputNumber" v-model:value="formState.userInfo.trainingDuration"
                                    addon-after="分钟" :min="1" />
                            </a-form-item>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item label="训练消耗比例" :extra="`女生按5计算,男生按8和10计算(训练组数比较单一的按8来算,训练组数很多,比如超级组、递减组按10来算)`">
                            <a-radio-group v-model:value="formState.userInfo.trType" button-style="solid">
                                <a-radio-button v-for="item, index in nums" :key="index" :value="item">{{ item
                                }}</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                <a-form-item label="热量配比" extra="碳水:蛋白质:脂肪">
                    <a-radio-group v-model:value="heatVal" button-style="solid">
                        <a-radio-button v-for="item, index in heatD" :key="index" :value="item.type">{{ item.label
                        }}</a-radio-button>
                    </a-radio-group>

                </a-form-item>
                <a-form-item label="消耗数据(大卡)">
                    <a-descriptions layout="vertical" bordered :column="3" size="small">
                        <a-descriptions-item label="基础代谢">{{ setZero(metabolism) }}</a-descriptions-item>
                        <a-descriptions-item label="训练消耗">{{ setZero(te) }}</a-descriptions-item>
                        <a-descriptions-item label="总消耗">{{ setZero(tes) }}</a-descriptions-item>
                        <a-descriptions-item label="减脂消耗">{{ setZero(flc) }}</a-descriptions-item>
                        <a-descriptions-item label="增肌消耗">{{ setZero(mw) }}</a-descriptions-item>
                        <a-descriptions-item label="增肌增重消耗">{{ setZero(gmgw) }}</a-descriptions-item>

                    </a-descriptions>
                </a-form-item>
                    <a-form-item label="热量配比(g)">
                    <a-descriptions label="热量配比" layout="vertical" bordered size="small">
                        <a-descriptions-item label="碳水">{{ setZero(hotNum.tsVal) }}</a-descriptions-item>
                        <a-descriptions-item label="蛋白质">{{ setZero(hotNum.dbzVal) }}</a-descriptions-item>
                        <a-descriptions-item label="脂肪">{{ setZero(hotNum.zfVal) }}</a-descriptions-item>
                    </a-descriptions>
                </a-form-item>

            </a-form>
        </a-card>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
const sex = ['男', '女']
const nums = [5, 8, 10]
const heatD = [
    { type: 1, data: { ts: 4, dbz: 2, zf: 4 }, label: '4:2:4' }, { type: 2, data: { ts: 5, dbz: 2, zf: 3 }, label: '5:2:3' }
]
const heatVal = ref(2)
const labelCol ={ style: { width: '150px' } }
const formState = reactive({
    userInfo: {
        sexVal: '男',
        weight: 0,
        metabolism: 0,//基础代谢
        trainingDuration: 1,//训练时长
        trType: 8
    }
})
// 基础代谢
let metabolism = computed(() => {
    return formState.userInfo.trainingDuration * 20
})
// 训练消耗
let te = computed(() => {
    return formState.userInfo.trainingDuration * formState.userInfo.trType
})
// 训练总消耗
let tes = computed(() => {
    return (formState.userInfo.trainingDuration * formState.userInfo.trType) + metabolism.value
})
// 减脂消耗
let flc = computed(() => {
    return te.value - 100
})
// 增肌消耗
let mw = computed(() => {
    return te.value + 300
})

// 增肌增重消耗
let gmgw = computed(() => {
    return te.value + 500
})

let hotNum = computed(() => {
    let r = heatD.find(item => item.type == heatVal.value)
    let { ts, dbz, zf } = r.data
    // 碳水1g等于4大卡 蛋白质也是 脂肪1g等于9大卡
    let tsVal = Math.floor(flc.value * (ts / 10) / 4).toFixed(2)
    let dbzVal = Math.floor(flc.value * (dbz / 10) / 4).toFixed(2)
    let zfVal = Math.floor(flc.value * (zf / 10) / 9).toFixed(2)
    console.log(tsVal, dbzVal, zfVal);
    return { tsVal, dbzVal, zfVal }
})

// 如果低于0则返回0 
const setZero = (v) => {
    return v < 0 ? 0 : v
}
</script>

<style lang='less' scoped>
.car-content {
    display: flex;
}
</style>