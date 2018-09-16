import Vuex from 'vuex'

import defaultStore from './modules/defaultStore'
import vuexStore from './modules/vuexStore'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    // 这个可以限制不允许在mutations之外的地方修改state
    // 但是不建议在生产环境使用这个配置，严格模式会深度监测状态树来检测不合规的状态变更，以避免性能损失。
    strict: isDev,
    // state: defaultStore.state,
    // getters: defaultStore.getters,
    // actions: defaultStore.actions,
    // mutations: defaultStore.mutations,
    // 将各个store封装到单独的文件中，但是这个颗粒度需要斟酌，不建议一个组件设置一套store，这会导致过度的封装
    modules: {
      defaultModules: defaultStore,
      // 如果要指定固定命名空间的模块，就只能这样，因为vue没有提供子模块单独的model属性（这个有点智障）
      // 需要和没有namespace的做以区分，有namespace的会严格的区分子模块路径，所以调用的时候我们需要加上路径来调用
      // 所以强烈建议能够使用namespaced来区分模块
      vuexModules: {
        namespaced: true,
        state: vuexStore.state,
        getters: vuexStore.getters,
        actions: vuexStore.actions,
        mutations: vuexStore.mutations
      }
    }
  })
  // 热更新
  if (module.hot) {
    module.hot.accept([defaultStore, vuexStore], () => {
      const newDefaultModules = require(defaultStore).default
      const newVuexStore = require(vuexStore).default

      store.hotUpdate({
        modules: {
          defaultModules: newDefaultModules,
          vuexModules: newVuexStore
        }
      })
    })
  }
  return store
}
