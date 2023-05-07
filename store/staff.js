/*
 * 店員さんが操作可能なボックスの情報管理、操作
 */
export const state = () => ({
  /* 注文番号一覧 */
  codes: null,
  // codes: [
  //   {
  //     id: 'a12',
  //     box: [1, 0],
  //   },
  //   {
  //     id: 'b23',
  //     box: [1, 2],
  //   },
  //   {
  //     id: 'admincode',
  //     box: [2],
  //   },
  //   {
  //     id: 'c43',
  //     box: [],
  //   },
  // ],
  /* 店員さんが操作可能なボックスの情報を保持する */
  boxes: null,
  // boxes: [
  //   {
  //     id: 0,
  //     door: [{ isOpen: true }, { isOpen: false }, { isOpen: true }],
  //     stock: ['stock1'],
  //     permission: ['admincode', 'a12'],
  //   },
  //   {
  //     id: 1,
  //     door: [{ isOpen: false }, { isOpen: false }, { isOpen: true }],
  //     stock: ['stock3'],
  //     permission: ['a12', 'b23'],
  //   },
  //   {
  //     id: 2,
  //     door: [{ isOpen: true }, { isOpen: true }, { isOpen: false }],
  //     stock: [],
  //     permission: ['c43'],
  //   },
  // ],
  /* 登録しようとする注文番号 */
  registerCode: null,
  /* 登録する注文番号に紐づけるボックス番号 */
  registerBox: null,
  /* 在庫の有効期限[分] */
  expire: null,
})

export const mutations = {
  clearAll(state) {
    state.codes = null
    state.boxes = null
  },
  clearRegisterInfo(state) {
    state.registerCode = null
    state.registerBox = null
  },
  setCodes(state, codes) {
    state.codes = codes
  },
  setBoxes(state, boxes) {
    state.boxes = boxes
  },
  setRegisterCode(state, registerCode) {
    state.registerCode = registerCode
  },
  setRegisterBox(state, boxId) {
    state.registerBox = boxId
  },
  setExpire(state, expire) {
    state.expire = expire
  },
}

export const actions = {
  /* 全てのボックスの最新情報を取得する */
  async refreshCodeList({ commit, rootState }) {
    const accessToken = rootState.auth.accessToken
    /* 全てのボックスの情報取得 */
    const res = await this.$axios.get('/admin/codes', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    /* 'admincode'以外の注文コードを抽出 */
    const codes = res.data.filter((code) => code.id !== 'admincode')
    commit('setCodes', codes)
    return codes
  },
  /* 全てのボックスの最新情報を取得する */
  async refreshBoxInfo({ state, commit, rootState }) {
    const accessToken = rootState.auth.accessToken
    /* 全てのボックスの情報取得 */
    const res = await this.$axios.get('/boxes', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    const boxes = res.data
    commit('setBoxes', boxes)
    return boxes
  },
  async registerCode({ commit, rootState }, code) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードの登録 */
    await this.$axios.post(
      '/admin/codes',
      {
        code,
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
    commit('setRegisterCode', code)
  },
  async deleteCode({ dispatch, rootState }, code) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードの削除 */
    await this.$axios.post(
      '/staff/delete',
      {
        code,
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
    dispatch('refreshCodeList')
    dispatch('refreshBoxInfo')
  },
  async grantCodeToBox({ commit, dispatch, rootState }, { boxId, code }) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードをボックスに割り当て */
    await this.$axios.post(
      '/staff/register',
      { boxId, code },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
    commit('setRegisterBox', boxId)
    dispatch('refreshBoxInfo')
  },
  async getExpireConf({ commit, rootState }) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードをボックスに割り当て */
    const res = await this.$axios.get('/staff/expire', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    commit('setExpire', res.data.expire)
    return res.data.expire
  },
  async setExpireConf({ commit, rootState }, expire) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードをボックスに割り当て */
    const res = await this.$axios.post(
      '/staff/expire',
      { expire },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
    commit('setExpire', res.data.expire)
    return res.data.expire
  },
}
