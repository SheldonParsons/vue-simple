import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

import vuexState from './state/vuexState'
import vuexMutations from './mutations/vuexMutations'
import vuexGetters from './getters/vuexGetters'
import vuexActions from './actions/vuexActions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const defaultStore = {
    state: defaultState,
    mutations: mutations,
    actions: actions,
    getters: getters
  }

  const vuexStore = {
    state: vuexState,
    mutations: vuexMutations,
    actions: vuexGetters,
    getters: vuexActions
  }

  const store = new Vuex.Store({
    strict: isDev, // 这个可以限制不允许在mutations之外的地方修改state，但是不建议在生产环境使用这个配置，所以将这个配置改为动态的
    modules: {
      defaultModules: defaultStore,
      vuexModules: vuexStore
    }
  })
  // 热更新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
