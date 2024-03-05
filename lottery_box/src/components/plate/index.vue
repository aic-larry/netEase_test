<template>
    <div>
        <div>{{ activityName }}</div>
        <div class="graph-page">
            <div class="plate-wrapper" :style="`${bgColor};`">
                <div class="item-plate" :style="plateCss(index)" v-for="(item, index) in plateList" :key="index">
                    <img :src="item.pic" alt="">
                    <p>{{ item.name }}</p>
                </div>
            </div>
            <div @click="handleClick" class="btn"></div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        turns: {
            type: [Number, String],
            default: () => 5
        },
        activityName: {
            type: String,
            require: true,
        },
        plateList: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            isRunning: false, //判断是否正在转动
            rotateAngle: 0, //转盘每项角度
            activeIndex: 0, //中奖index
            wrapDom: null //转盘dom
        }
    },
    computed: {
        //总共转动角度,至少5圈
        baseRunAngle() {
            return 360 * this.turns
        },
        bgColor() { //转盘的每项背景
            let len = this.plateList.length
            let color = ['#5352b3', '#363589']
            let colorVal = ''
            this.plateList && this.plateList.forEach((item, index) => {
                colorVal += `${color[index % 2]} ${(360 / len) * index}deg ${(360 / len) * (index + 1)}deg,`
            })
            return `background: conic-gradient(${colorVal.slice(0, -1)})`
        },
        plateCss() { //转盘的每项样式
            if (this.plateList && this.plateList.length) {
                return (i) => {
                    return `
                        width: ${Math.floor(2 * 270 * Math.sin(this.rotateAngle / 2 * Math.PI / 180))}px;
                        height: 270px;
                        transform: rotate(${this.rotateAngle * i + this.rotateAngle / 2}deg);
                        transform-origin: 50% 100%;
                        `
                }
            }
            return () => { '' }
        },
        //要旋转的总角度
        totalRunAngle() {
            return this.baseRunAngle + 360 - this.activeIndex * this.rotateAngle - this.rotateAngle / 2
        }
    },
    created() {
        this.rotateAngle = 360 / this.plateList.length
    },
    mounted() {
        this.$nextTick(() => {
            this.wrapDom = document.getElementsByClassName('plate-wrapper')[0]
        })
    },
    beforeDestroy() {
        this.wrapDom.removeEventListener('transitionend', this.stopRun)
    },
    methods: {
        handleClick() {
            if (this.isRunning) return
            this.isRunning = true
            const { rate: totalRate } = this.plateList.reduce((pre, cur) => ({ rate: pre.rate + cur.rate }), { rate: 0 })
            const randomValue = Math.random() * totalRate;
            console.log('totalRate:', totalRate)
            console.log('randomValue:', randomValue)
            let cumulativeProbability = 0;
            let selectIdx = 0;
            for (let index = 0; index < this.plateList.length; index++) {
                cumulativeProbability += this.plateList[index].rate;
                if (randomValue <= cumulativeProbability) {
                    selectIdx = index;
                    break;
                }
            }
            this.activeIndex = selectIdx
            this.startRun()
        },
        startRun() {
            // 设置动画
            this.wrapDom.setAttribute('style', `
                ${this.bgColor};
                transform: rotate(${this.totalRunAngle}deg);
                transition: all 4s ease;
            `)
            this.wrapDom.addEventListener('transitionend', this.stopRun) // 监听transition动画停止事件
        },
        stopRun() {
            this.isRunning = false
            this.wrapDom.setAttribute('style', `
                ${this.bgColor};
                transform: rotate(${this.totalRunAngle - this.baseRunAngle}deg);
            `)
        }
    }
}
</script>
<style lang="scss" scoped>
.graph-page {
    width: 540px;
    height: 540px;
    margin: 100px auto;
    position: relative;
}

.plate-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 10px solid #98d3fc;
    overflow: hidden;
}

.item-plate {
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
    margin: auto;
}

.item-plate img {
    width: 30%;
    height: 20%;
    margin: 40px auto 10px;
    display: block;
}

.item-plate p {
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
}

.btn {
    width: 160px;
    height: 160px;
    background: url('https://www.jq22.com/demo/jquerylocal201912122316/img/btn_lottery.png') no-repeat center / 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
}

.btn::before {
    content: "";
    width: 41px;
    height: 39px;
    background: url('https://www.jq22.com/demo/jquerylocal201912122316/img/icon_point.png') no-repeat center / 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: -33px;
    margin: auto;
}
</style>
  