<template>
  <section class="Wrapper Page-staff Page-staff--thanks">
    <div class="Main-content">
      <h3 class="Heading h3">商品セット完了</h3>
      <p class="Content-p">
        注文番号<span class="Featuretext">{{ registerCode }}</span>の注文を<br>
        <span class="Featuretext">{{ registerBox.join(',') }}番のボックス</span>にセットしました
      </p>
      <nuxt-link to="/staff" class="Common-button Common-button--orange">
        <div class="Common-button__child">トップへ戻る</div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'authRequired',
  data() {
    return {
      redirectTimer: null,
    }
  },
  computed: {
    ...mapState('staff', ['registerCode', 'registerBox']),
  },
  mounted () {
    // 一定時間後にトップに戻る
    this.redirectTimer = setTimeout(() => {
      this.$router.push('/staff')
    }, 5 * 1000)
  },
  destroyed() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  }
}
</script>
