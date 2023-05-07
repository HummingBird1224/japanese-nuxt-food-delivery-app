<template>
  <div class="display-center">
    <div class="display-center-content">
      <div>
        <h3>予期せぬエラーのため動作を停止しました</h3>
        <p>
          一度電源を切って再度入れなおしてください
        </p>
        <div v-if="message != null && !showMessage" @pointerdown="showMessage">詳細</div>
        <div v-if="showMessage" class="error-box">
          <div>{{ message }}</div>
          <div>{{ detail }}</div>
        </div>
        <div class="Buttons">
          <button class="Common-button Common-button--orange" @pointerdown="returnPage">
            <div class="Common-button__child">戻る</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showDetail: false,
      redirectTimer: null,
    }
  },
  computed: {
    ...mapState('error', ['message', 'detail']),
  },
  beforeDestroy() {
    this.$store.commit('error/clear')
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  },
  mounted () {
    // 一定時間後に前のページに戻る
    this.redirectTimer = setTimeout(() => {
      this.returnPage()
    }, 30 * 1000)
  },
  methods: {
    showMessage() {
      this.showDetail = true
    },
    returnPage() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.display-center {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;;
  align-items: center;;
}
.error-box {
  background-color: #263238;
  color: #fff;
  font-family: monospace;
  font-size: 0.75rem;
  text-align: left;
  padding: 1rem;
  white-space: pre-line;
  max-width: 80%;
  max-height: 500px;
  margin: auto;
}
</style>
