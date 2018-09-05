<script>
import TabContainer from './tab-container.vue'
export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  provide() {
    const value = {}
    Object.defineProperty(value, 'value', {
      // 子组件中每次调用'value'都会拿到最新的this.value
      get: () => this.value,
      // 可以被读取
      enumerable: true
    })
    return { value }
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      panes: []
    }
  },
  render() {
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <TabContainer panes={this.panes}></TabContainer>
      </div>
    )
  },
  methods: {
    onChangeTab(index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
