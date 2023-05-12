/*
 * app.js
 *
 * This module stores application state.
 */
export class InvalidAuthCodeError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidAuthCodeError'
  }
}

export const state = () => ({
  code: null,
  user: null,
  accessToken: null,
})

export const mutations = {
  clearAll(state) {
    state.code = null
    state.user = null
    state.accessToken = null
  },
  setCode(state, code) {
    state.code = code
  },
  setUser(state, user) {
    state.user = user
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
}

export const actions = {
  async login({ state, commit }, code) {
    try {
      const res = await this.$axios.post('/auth/login', { code })
      commit('setAccessToken', res.data.accessToken)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new InvalidAuthCodeError()
      }
      throw e
    }
    commit('setCode', code) //git upload
    const res = await this.$axios.get('/codes/' + code, {
      headers: {
        Authorization: 'Bearer ' + state.accessToken,
      },
    })
    commit('setUser', res.data.user)
  },
  async logout({ state, commit }) {
    if (state.accessToken == null) {
      commit('clearAll')
      return
    }
    await this.$axios.post('/auth/logout', null, {
      headers: {
        Authorization: 'Bearer ' + state.accessToken,
      },
    })
    commit('clearAll')
  },
}
