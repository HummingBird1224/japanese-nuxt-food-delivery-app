export default ({ $axios, store, app }) => {
  $axios.onError((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      if (err.response.status === 400) {
        /* Unauthorized */
        return
      } else if (err.response.status === 401) {
        /* Unauthorized */
        return
      } else if (err.response.status === 403) {
        /* Forbidden */
        return
      } else if (err.response.status === 404) {
        /* Not Found */
        return
      } else if (err.response.status === 502) {
        /* Bad Gateway */
        app.router.push('/error/network')
        return
      }
      store.dispatch('error/set', {
        message: 'エラー',
        detail: err.response,
      })
    } else if (err.request) {
      // client never received a response, or request never left
      store.commit('error/set', {
        message:
          'サーバーから応答がありません。サーバーおよびネットワークの状態を確認してください。',
        detail: err.toJSON(),
      })
      app.router.push('/error/network')
      return
    } else {
      // anything else
      store.dispatch('error/set', {
        message: 'アプリのバグの可能性がある不明なエラーです',
        detail: err.toJSON(),
      })
    }
    app.router.push('/error')
  })
}
