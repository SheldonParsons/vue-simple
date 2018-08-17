// 通过function的方式调用组件
import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted() {
    this.createTimer()
  },
  methods: {
    createTimer() {
      // debugger // eslint-disable-line
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter() {
      // debugger // 断点
      // 获取删除节点的高度
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory() {
    this.clearTimer()
  },
  data() {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
