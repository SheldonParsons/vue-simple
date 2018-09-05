import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 这个可以限制不允许在mutations之外的地方修改state，但是不建议在生产环境使用这个配置，所以将这个配置改为动态的
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: { // Vuex的模块化
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText(state, text) {
            // console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          // 可以拿到所有的getters和全局的state
          textPlus(state, getters, rootState) {
            // console.log(getters)
            // console.log(rootState)
            return state.text + 1
          }
        },
        actions: {
          // 第一个参数
          add({ state, commit, rootState }) {
            // 这里的commit只能调用该模块内的mutations
            commit('updateText', rootState.count)
            // 如果想调用全局的mutations需要加一个参数
            commit('updateCount', { num: 'xixihahah' }, { root: true })
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          testAction({ commit }) {
            commit('a/updateText', 'test text ', { root: true })
          }
        }
      }
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
