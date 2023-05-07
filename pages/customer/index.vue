<template>
  <section class="Wrapper Page-customer Page-customer--index">
    <div class="Main-content">
      <div class="Message-box">
        <p class="Content-p" style="margin: 0;">
          いらっしゃいませ<br>
          画面をタップしてください
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async mounted () {
    if (this.$store.state.auth.code != null) {
      await this.$store.dispatch('auth/logout')
    }
    /* 情報を初期化 */
    this.$store.commit('customer/clearAll')
    /* クリックイベント登録 */
    document.addEventListener("click", this.onClick)
  },
  beforeDestroy () {
    /* クリックイベント解除 */
    document.removeEventListener("click", this.onClick)
  },
  methods: {
    onClick () {
      this.$router.push('/customer/auth')
    }
  }
}
</script>
