import Vue from 'vue'

export default ({ app, store }, inject) => {
  Vue.config.errorHandler = (err, vm, info) => {
    if (err.message === 'Network Error') {
      app.router.push('/error/network')
      return
    }
    console.log('Global error handler!!')
    console.log(err)
    console.log(vm)
    console.log(info)
    store.dispatch('error/set', {
      message: err.toString(),
      detail: err.stack.toString() + '\n' + info,
    })
    app.router.push('/error')
  }
}
