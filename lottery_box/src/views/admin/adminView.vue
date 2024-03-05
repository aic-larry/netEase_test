<template>
  <div class="admin">
    <aside>
      <div v-for="item in navList" :key="`nav-${item.id}`" class="nav-li" @click="linkTo(item)"
        :class="{ active: item.id === activeNav }">{{ item.name }}</div>
    </aside>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNav: 1,
      navList: [
        { id: 1, name: '用户列表', url: 'admin' },
        { id: 2, name: '活动列表', url: 'activity' },
        { id: 3, name: '奖品库存', url: 'store' },
      ]
    }
  },
  methods: {
    linkTo(nav) {
      this.activeNav = nav.id
      this.$router.push(`/${nav.url}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.admin {
  display: flex;

  aside {
    width: 220px;
    border-right: 1px solid;

    .nav-li {
      display: block;
      cursor: pointer;
      height: 44px;
      line-height: 44px;
      width:220px;
      &:hover {
        background-color: #eee;
      }

      &.active {
        background-color: #ddd;
      }
    }
  }
  .main{
    width:100%;
    text-align: left;
    padding:20px;
  }
}
</style>
