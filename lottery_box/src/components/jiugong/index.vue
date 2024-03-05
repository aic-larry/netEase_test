<template>
    <div class="main_container">
        <div>{{ activityName }}</div>
        <div class="turntable_box">
            <ul id="rotary_table">
                <li v-for="(item, index) in awards" :key="index" :class="['award' + index, { active: index == current }]"
                    class="award">
                    <img :src="item.pic" alt />
                    <div class="mask" v-if="index == current"></div>
                </li>
                <div id="start-btn" @click="start"></div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "nineSquaredPaper",
    props: {
        activityName: {
            type: String,
            require: true,
        },
        awards: {
            type: Array,
            validator(t) {
                console.log('t:', t)
                if (t.length !== 8) {
                    console.error('award 长度必须为8')
                    return;
                }
                return true
            },
            require: true,
        }
    },
    data() {
        return {
            current: 0, // 当前索引值
            speed: 200, // 时间->速度
            diff: 15, // 基数
            award: {}, // 抽中的奖品
            time: 0, // 当前时间戳
            timer: null, // 定时器
        };
    },
    methods: {
        // 开始抽奖
        start() {
            console.log('this.timer:',this.timer)
            if (this.timer !== null) return;
            // 开始抽奖
            this.getLottery();
            this.time = Date.now();
            this.speed = 200;
            this.diff = 12;
        },
        // 调接口获取奖品
        getLottery() {
            const { rate: totalRate } = this.awards.reduce((pre, cur) => ({ rate: pre.rate + cur.rate }), { rate: 0 })
            const randomValue = Math.random() * totalRate;
            console.log('totalRate:', totalRate)
            console.log('randomValue:', randomValue)
            let cumulativeProbability = 0;
            let selectIdx = 0;
            for (let index = 0; index < this.awards.length; index++) {
                cumulativeProbability += this.awards[index].rate;
                if (randomValue <= cumulativeProbability) {
                    selectIdx = index;
                    break;
                }
            }
            this.award.id = selectIdx
            this.award.name = this.awards.find(i=>i.id===this.award.id).name
            this.move();
        },
        // 开始转动
        move() {
            this.timer = setTimeout(() => {
                this.current++;
                if (this.current > 7) {
                    this.current = 0;
                }
                // 若抽中的奖品id存在，则开始减速转动
                if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
                    this.speed += this.diff; // 转动减速
                    // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来
                    if (
                        (Date.now() - this.time) / 1000 > 4 &&
                        this.award.id == this.awards[this.current].id
                    ) {
                        clearTimeout(this.timer);
                        this.timer = null
                        setTimeout(() => {
                            this.$message.success(`喜提${this.award.name}`)
                        }, 0);
                        return;
                    }
                }
                else {
                    // 若抽中的奖品不存在，则加速转动
                    this.speed -= this.diff;
                }

                this.move();
            }, this.speed);

        },

    }
};
</script>
<style  lang="scss" scoped>
.main_container {
    width: 100%;
    min-height: 100%;
    background-color: #fb6010;
    background-size: 100% auto;
    background-repeat: no-repeat;
    font-size: 26px;

    // 作用: 禁用弹窗里的滑动影响页面滑动
    &.prohibit {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    // 设置占位符字体颜色
    input::-webkit-input-placeholder {
        color: #a4a5a6;
        font-size: 26px;
    }

    padding: 100px 0px;

    .turntable_box {
        margin: 0 auto;
        padding-top: 160px;
        width: 90%;
        height: 850px;

        // background: url("./upload/vphonor/201907/03/636977646730324602.png")
        //   no-repeat center/100%;
        #rotary_table {
            width: 621px;
            height: 621px;
            position: relative;
            padding: 0;
            margin: 20px auto;
            background-color: antiquewhite;

            .award {
                width: 179px;
                height: 179px;
                background-color: #fff;
                text-align: center;
                float: left;
                position: absolute;
                overflow: hidden;

                img {
                    position: absolute;
                    width: 179px;
                    top: 0;
                    left: 0;
                    height: 179px;
                }

                &.active {
                    .mask {
                        width: 179px;
                        height: 179px;
                        position: absolute;
                        border-radius: 10px;
                        background-color: #fff0bd;
                        opacity: 0.6;
                    }
                }

                &.award0 {
                    top: 21px;
                    left: 21px;
                }

                &.award1 {
                    top: 21px;
                    left: 221px;
                }

                &.award2 {
                    top: 21px;
                    right: 21px;
                }

                &.award3 {
                    top: 221px;
                    right: 22px;
                }

                &.award4 {
                    bottom: 22.5px;
                    right: 22px;
                }

                &.award5 {
                    bottom: 22.5px;
                    right: 221px;
                }

                &.award6 {
                    bottom: 22.5px;
                    left: 21px;
                }

                &.award7 {
                    top: 221px;
                    left: 21px;
                }
            }

            #start-btn {
                position: absolute;
                width: 179px;
                height: 179px;
                top: 221px;
                left: 221px;
                border-radius: 50%;
                text-align: center;
                background: url("https://www.jq22.com/demo/jquerylocal201912122316/img/btn_lottery.png")
                  no-repeat center/100%;
            }
        }
    }
}</style>