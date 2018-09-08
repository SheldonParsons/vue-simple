// import model from '../../model'
// import notify from '../../components/notification/function'
// import bus from '../../util/bus'

// const handleError = err => {
//   if (err.code === 401) {
//     notify({
//       content: '你需要先登陆'
//     })
//     bus.$emit('auth')
//   }
// }

// export default {
//   // actions和mutations的区别就是actions是异步的，比如有数据请求的
//   updateCountAsync(store, data) {
//     setTimeout(() => {
//       store.commit('updateCount', { num: data.num, num2: 1 })
//     }, data.time)
//   },
//   login({ commit }, { username, password }) {
//     commit('startLoading')
//     return new Promise((resolve, reject) => {
//       model.login(username, password)
//         .then(data => {
//           commit('doLogin', data)
//           notify({
//             content: '登陆成功'
//           })
//           resolve()
//           commit('endLoading')
//         })
//         .catch(err => {
//           handleError(err)
//           reject(err)
//           commit('endLoading')
//         })
//     })
//   }
// }
