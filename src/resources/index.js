const files = require.context('./', true, /index.js$/)
const routers = []
files.keys().forEach((key) => {
  if (key === './index.js') {
    return true
  }
  routers.push(files(key).default)
})

// h5模式下的路由配置
const resources = routers.flat()

const routes = resources

export default routes
