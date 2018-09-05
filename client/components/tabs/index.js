import Tabs from './tabs.vue'
import Tab from './tab.vue'

export default Vue => {
  Vue.component(Tab.name, Tab)
  Vue.component(Tabs.name, Tabs)
}
