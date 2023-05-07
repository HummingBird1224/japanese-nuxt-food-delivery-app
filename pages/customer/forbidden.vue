<template>
  <section class="Wrapper Page-customer Page-customer--box">
    <div class="Main-content">
      <div class="Message-box">
        <h3 class="Heading h3">認証が無効になりました</h3>
        <p class="Content-p">お手数ですが再度認証コードを入力してください</p>
      </div>

      <nuxt-link to="/customer" class="Common-button Common-button--orange">
        <div class="Common-button__child">トップへ戻る</div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      redirectTimer: null,
    }
  },
  mounted () {
    this.redirectTimer = setTimeout(this.redirectToTop, 5000)
  },
  methods: {
    redirectToTop () {
      this.$router.push('/customer')
      this.redirectTimer = null
    }
  },
  destroyed() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  }
}
</script>
