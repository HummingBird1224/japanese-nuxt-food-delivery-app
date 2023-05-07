<template>
  <section class="Wrapper Page-customer Page-customer--thanks">
    <div class="Main-content">

      <div class="Message-box">
        <p class="Content-p">ご利用ありがとうございました</p>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      redirectTimeout: null,
    }
  },
  async mounted () {
    this.$sound.playThanks()
    /* ログアウト */
    if (this.$store.state.auth.code != null) {
      await this.$store.dispatch('auth/logout')
    }
    /* 一定時間後にトップに戻る */
    this.redirectTimeout = setTimeout(() => {
      this.$router.push('/customer')
    }, 3 * 1000)
  },
  destroyed() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout)
      this.redirectTimer = null
    }
  }
}
</script>
