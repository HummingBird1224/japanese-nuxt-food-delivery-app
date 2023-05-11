import io from 'socket.io-client'
const config = require('~/nuxt.config.js')

let SERVER_URL
// if (config.default.dev) {
//   const baseURL = new URL(config.default.axios.baseURL)
//   SERVER_URL = 'ws://' + baseURL.host + '/'
// } else {
//   SERVER_URL = '/'
// }
if (config.default.dev) {
  const baseURL = new URL(config.default.axios.baseURL)
  SERVER_URL = 'wss://' + baseURL.host + '/'
} else {
  SERVER_URL = '/'
}

export default ({ store }) => {
  /* Start a new connection. */
  const socket = io(SERVER_URL, {
    name: 'main',
    channel: '/',
    teardown: true,
    emitTimeout: 1000,
  })
  /* Event callbacks */
  socket.on('connect', () => {
    console.log('connected!')
  })
  socket.on('disconnect', () => {
    console.log('disconnected!')
  })
  socket.on('door', (msg) => {
    if (msg.event === 'closed') {
      store.commit('customer/closeDoor', msg.doorId) //git test
      // console.log('close')
      // store.dispatch('staff/refreshBoxInfo')
    }
  })
}
