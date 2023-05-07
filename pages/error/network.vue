<template>
  <div class="display-center">
    <div class="display-center-content">
      <div>
        <h3>データベースと通信ができませんでした</h3>
        <p>
          起動直後であれば、起動中の可能性があります。再度お試しください。<br />
          このエラーが繰り返す場合は担当者までご連絡ください。
        </p>
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
export default {
  data () {
    return {
      redirectTimer: null,
    }
  },
  mounted () {
    // 一定時間後にトップに戻る
    this.redirectTimer = setTimeout(() => {
      this.returnPage()
    }, 30 * 1000)
  },
  destroyed() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  },
  methods: {
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
</style>
