<template>
  <div>
      {{msg}}
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      msg: 'test'
    }
  },

  created () {
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
