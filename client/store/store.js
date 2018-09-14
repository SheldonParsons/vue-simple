import Vuex from 'vuex'

import defaultStore from './modules/defaultStore'
import vuexStore from './modules/vuexStore'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 这个可以限制不允许在mutations之外的地方修改state，但是不建议在生产环境使用这个配置，所以将这个配置改为动态的
    modules: {
      defaultModules: defaultStore,
      vuexModules: vuexStore
    }
  })
  // 热更新
  if (module.hot) {
    module.hot.accept([defaultStore], () => {
      const newDefaultModules = require(defaultStore).default

      store.hotUpdate({
        modules: {
          defaultModules: newDefaultModules
        }
      })
    })
  }
  return store
}
