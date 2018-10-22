// 将真正的数据请求解耦出来
const sha1 = require('sha1')
const axios = require('axios')

const className = 'SheldonVue'

// 第三方的api平台，因为现在没有支架后端服务，所以这个项目我们把api放到了一个公共的api平台当中
// 后续建立了自己的后端服务以后再更改
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 错误信息的封装
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.ceode = code
  return err
}

// 将请求的返回做一个封装，下面的请求调用即可，这样的好处是，可以让我们的返回标准化
const handleRequest = ({ status, data, ...resp }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, resp)
  }
}

module.exports = (appId, appKey) => {
  // Header的验证构建
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': sha1(appId + 'UZ' + appKey + 'UZ' + now) + '.' + now
    }
  }
  // 下面就是一系列的api方法，注意，这个时候其实我们还没有真正的发送请求
  // 我们只是把这些api方法封装好，和api.js做一个解耦，虽然我们这里使用了axios
  // 后续在api.js文件中，才通过全局对象ctx来调用这些请求
  return {
    async getAllTodos() {
      return handleRequest(
        await request.get(`/${className}`, {
          headers: getHeaders()
        })
      )
    },
    async addTodo(todo) {
      return handleRequest(
        await request.post(`/${className}`, todo, { headers: getHeaders() })
      )
    },
    async updateTodo(id, todo) {
      return handleRequest(
        await request.put(`/${className}/${id}`, todo, {
          headers: getHeaders()
        })
      )
    },
    async deleteTodo(id) {
      return handleRequest(
        await request.delete(`/${className}/${id}`, {
          headers: getHeaders()
        })
      )
    },
    async deleteCompleted(ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }
  }
}
