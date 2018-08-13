export default {
  // actions和mutations的区别就是actions是异步的，比如有数据请求的
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', { num: data.num, num2: 1 })
    }, data.time)
  }
}
