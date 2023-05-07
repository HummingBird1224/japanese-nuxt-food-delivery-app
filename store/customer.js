/*
 * お客さんが操作可能なボックス、扉の情報管理、操作
 */
export const state = () => ({
  /* ユーザーが操作可能なボックス、扉の情報を保持する */
  boxes: null,
  doors: null,
  /* 現在開いている扉番号 */
  openDoors: [],
})

export const mutations = {
  clearAll(state) {
    state.boxes = null
    state.doors = null
  },
  setBoxes(state, boxes) {
    state.boxes = boxes
  },
  setDoors(state, doors) {
    state.doors = doors
  },
  openDoor(state, doorId) {
    /* 扉を開けるとopenDoorsに記録する */
    if (!state.openDoors.includes(doorId)) {
      state.openDoors.push(doorId)
    }
  },
  closeDoor(state, doorId) {
    /* 扉が閉められるとopenDoorsから削除する */
    const index = state.openDoors.indexOf(doorId)
    if (index >= 0) {
      state.openDoors.splice(index, 1)
    }
  },
  clearOpenDoors(state) {
    state.openDoors.splice(0)
  },
}

export const actions = {
  /* お客さんが操作可能なボックス、扉の情報を全て取得する */
  async getAvailables({ state, commit, rootState }) {
    const accessToken = rootState.auth.accessToken
    /* 認証コードに紐づけられたボックスの情報取得 */
    const res = await this.$axios.get('/boxes', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    const boxes = res.data
    commit('setBoxes', boxes)
    /* 認証コードに紐づけられた扉の情報取得 */
    let doors = []
    for (const box of res.data) {
      const resource = '/boxes/' + box.id + '/doors'
      const res = await this.$axios.get(resource, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      doors = doors.concat(res.data)
    }
    commit('setDoors', doors)
    return { boxes, doors }
  },

  /* お客さんが操作可能な扉を全て開ける */
  async openAllDoorsForUser({ state, rootState, commit }) {
    const accessToken = rootState.auth.accessToken
    const doors = []
    /* 全ての扉を開けていく */
    for (const door of state.doors) {
      commit('openDoor', door.boxId)
      const resource = '/boxes/' + door.boxId + '/doors/' + door.idInBox
      const res = await this.$axios.patch(
        resource,
        {
          isOpen: true,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      )
      doors.push(res.data)
    }
    return doors
  },

  /* 扉が全て閉められたかチェックする */
  async checkAllDoorsClosed({ commit, rootState }) {
    const accessToken = rootState.auth.accessToken
    const resource = '/customer/opendoors'
    const res = await this.$axios.get(resource, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    if (res.data.length > 0) {
      /* 開いている扉がある */
      return false
    }
    /* 全ての扉が閉まっている */
    commit('clearOpenDoors')
    return true
  },
}
