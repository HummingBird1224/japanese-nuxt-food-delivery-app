/*
 * 不具合発生時にエラー情報を格納します（デバッグ用）
 *
 * 本番環境では使わないほうが良いでしょう
 */
export const state = () => ({
  message: null,
  detail: null,
})

export const mutations = {
  set(state, { message , detail }) {
    state.message = message
    state.detail = detail
  },
  clear(state) {
    state.user = null
    state.accessToken = null
  },
}

export const actions = { //error modify
  async set({ commit }, { message , detail }) {
    commit('set', { message, detail })
    await this.$axios.post('/maintenance/error', { message, detail }).catch((err) => {console.log('Error!!!', err)})
  },
}
