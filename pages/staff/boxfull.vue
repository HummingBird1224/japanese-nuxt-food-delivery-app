<template>
  <section class="Wrapper Page-staff Page-staff--thanks">
    <div class="Main-content">
      <h3 class="Heading h3">ボックスが全て使用中です</h3>
      <p class="Content-p">
        注文番号<span class="Featuretext">{{ registerCode }}</span>は<span class="Boldtext">待機オーダー</span>に登録しました</br>
        ボックスが空いたら登録してください
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
    }, 30 * 1000)
  },
  destroyed() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  }
}
</script>
