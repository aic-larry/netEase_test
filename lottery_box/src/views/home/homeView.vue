<template>
  <div class="home">
    <aside>
      <div>
        活动列表：
        <div v-for="item in activityList" :key="`activity-${item.activityId}`" class="activity-item" @click="changeActivity(item)">{{ item.activityName }}</div>
      </div>
    </aside>
    <div class="main">

      <div>活动时间：{{ startTime }}至{{ endTime }}</div>
      <plate v-if="lotteryType === 1" :plateList="dataList" activityName="大转盘抽奖" :turns="5" />
      <jiugong v-if="lotteryType === 2" activityName="九宫格抽奖" :awards="dataList" />
    </div>
  </div>
</template>

<script>
import plate from '@/components/plate'
import jiugong from '@/components/jiugong'
export default {
  components: {
    plate,
    jiugong,
  },
  data() {
    return {
      activityList: [],
      lotteryType: 1,
      startTime: '2024-06-06',
      endTime: '2024-09-30',
      dataList: [],
    }
  },
  created() {
    this.activityList = [
      { activityId: 1, activityName: '大转盘活动', lotteryType: 1, startTime: '2024-06-30', endTime: '2024-09-30' },
      { activityId: 2, activityName: '九宫格活动', lotteryType: 2, startTime: '2024-06-30', endTime: '2024-09-30' },
    ]
    this.dataList = [
      { rate: 10, id: 1, name: '手机', pic: 'https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/05/01/ChMkLGXkMu6ICjNgAAEalAoKG2sAAbVZAHVeEIAARqs720.jpg' },
      { rate: 120, id: 2, name: '手表', pic: 'https://img1.baidu.com/it/u=2631716577,1296460670&fm=253&fmt=auto&app=120&f=JPEG' },
      { rate: 30, id: 3, name: '苹果', pic: 'https://img2.baidu.com/it/u=2611478896,137965957&fm=253&fmt=auto&app=138&f=JPEG' },
      { rate: 40, id: 4, name: '棒棒糖', pic: 'https://img2.baidu.com/it/u=576980037,1655121105&fm=253&fmt=auto&app=138&f=PNG' },
      { rate: 40, id: 5, name: '娃娃', pic: 'https://img2.baidu.com/it/u=4075390137,3967712457&fm=253&fmt=auto&app=138&f=PNG' },
      { rate: 40, id: 6, name: '木马', pic: 'https://img1.baidu.com/it/u=2434318933,2727681086&fm=253&fmt=auto&app=120&f=JPEG' },
      { rate: 40, id: 7, name: '德芙', pic: 'https://img0.baidu.com/it/u=1378564582,2397555841&fm=253&fmt=auto&app=120&f=JPEG' },
      { rate: 40, id: 8, name: '玫瑰', pic: 'https://img1.baidu.com/it/u=1125656938,422247900&fm=253&fmt=auto&app=120&f=JPEG' }
    ]
  },
  methods:{
    changeActivity(info){
      console.log(info)
      this.lotteryType = info.lotteryType
    }
  }

}
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  aside {
    width: 220px;
    .activity-item{
      cursor: pointer;
    }
  }

  .main {
    width: 100%;
  }
}
</style>