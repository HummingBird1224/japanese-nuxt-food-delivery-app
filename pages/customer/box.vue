<template>
  <section class="Wrapper Page-customer Page-customer--box">
    <div class="Main-content">
      <!-- 解錠中 -->
      <div v-if="boxes == null">
        <div class="Message-box">
          <p class="Content-p">お客様の商品の扉を開錠しています...</p>
        </div>
      </div>

      <!-- 商品ない場合 -->
      <div v-else-if="boxIdList.length === 0">
        <div class="Message-box">
          <h3 class="Heading h3">登録されている商品がありません</h3>
          <p class="Content-p">お近くの店員までお問い合わせください</p>
        </div>

        <nuxt-link to="/customer" class="Common-button Common-button--orange">
          <div class="Common-button__child">トップへ戻る</div>
        </nuxt-link>
      </div>

      <!-- 解錠完了 -->
      <div v-else-if="boxIdList.length > 0">
        <div class="Message-box">
          <h3 class="Heading h3">商品を取り出して必ず扉を閉めてください</h3>
          <!--<p class="Content-p">
            <span class="Box-num">
              <span class="Box-num__feature">
                <span v-for="boxId in boxIdList" :key="boxId">
                  {{ boxId }}
                </span>
                番
              </span>
              のボックス
            </span>
          </p>-->
          <p class="Content-p">
            <span class="Featuretext">{{ boxIdList.join(',') }}</span
            >番の扉が開きました
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authRequired',
  data() {
    return {
      refreshTimer: null,
    }
  },
  computed: {
    boxes() {
      return this.$store.state.customer.boxes
    },
    boxIdList() {
      if (this.boxes === null) {
        return []
      }
      return this.boxes.map((x) => x.id)
    },
    openDoors() {
      return this.$store.state.customer.openDoors
    },
  },
  watch: {
    openDoors: {
      handler() {
        /* 全ての扉が閉まったらThanks画面へ遷移 */
        if (this.openDoors.length === 0) {
          this.redirectToThanks()
        }
      },
      deep: true,
    },
  },
  async mounted() {
    /* 認証コードに紐づけられているボックスの情報取得 */
    await this.$store.dispatch('customer/getAvailables')
    /* 認証コードに紐づけられている扉を全て開ける */
    await this.$store.dispatch('customer/openAllDoorsForUser')
    this.refreshTimer = setTimeout(this.checkAllDoorsClosed, 5000)

    /* 音声案内を流す */
    if (this.boxIdList.length !== 0) {
      this.$sound.playBoxOpen()
    } else {
      this.$sound.playFaul()
    }
  },
  beforeDestroy() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = null
    }
  },
  methods: {
    redirectToThanks() {
      this.$router.push('/customer/thanks')
    },
    async checkAllDoorsClosed() {
      const closed = await this.$store.dispatch('customer/checkAllDoorsClosed')
      if (!closed) {
        this.refreshTimer = setTimeout(this.checkAllDoorsClosed, 5000)
      }
      /* 全ての扉が閉まっていればopendoorsのwatcherが呼ばれるのでここではリダイレクトしない */
    },
  },
}
</script>
