<template>
  <section class="Wrapper Page-admin" :class="{'Wrapper--bg-alert': alert}">
    <form action="/" class="Main-content" method="post">
      <h3 class="Heading h3">保管期限設定</h3>
      <p class="Content-p">設定した時間を経過後に扉を自動ロックします</p>

      <div class="Admin-select">
        <div class="Admin-select__child">
          <input type="radio" id="Admin-select00" name="Admin-select" v-model="selected" :value="null" class="Admin-select-input" checked>
          <label for="Admin-select00" class="Select-button">設定なし<span class="Select-button__checked"></span></label>
        </div>

        <div class="Admin-select__child">
          <input type="radio" id="Admin-select01" name="Admin-select" v-model="selected" :value="5" class="Admin-select-input">
          <label for="Admin-select01" class="Select-button">5分<span class="Select-button__checked"></span></label>
        </div>

        <div class="Admin-select__child">
          <input type="radio" id="Admin-select02" name="Admin-select" v-model="selected" :value="30" class="Admin-select-input">
          <label for="Admin-select02" class="Select-button">30分<span class="Select-button__checked"></span></label>
        </div>

        <div class="Admin-select__child">
          <input type="radio" id="Admin-select03" name="Admin-select" v-model="selected" :value="60" class="Admin-select-input">
          <label for="Admin-select03" class="Select-button">60分<span class="Select-button__checked"></span></label>
        </div>
      </div>

      <div class="Common-button">
        <div class="Common-button__child" @pointerdown="returnToHome">戻る</div>
      </div>
      <div class="Common-button Common-button--orange">
        <div class="Common-button__child" @pointerdown="submit">決 定</div>
      </div>
    </form>


    <!-- 登録完了アラート -->
    <div class="Alert-box">
      <p class="Content-p" v-if="selected != null">
        取り出し期限を<span class="Featuretext">{{ selected }}分</span>に設定しました<br />
      </p>
      <p class="Content-p" v-else>
        取り出し期限を<span class="Featuretext">無期限</span>に設定しました<br />
      </p>
      <div class="Common-button Common-button--orange">
        <div class="Common-button__child" @pointerdown.prevent="handleOk">O K</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authRequired',
  data () {
    return {
      original: '__notdefined__',
      selected: '__notdefined__',
      alert: false,
    }
  },
  computed: {
    expire() {
      return this.$store.state.staff.expire
    }
  },
  async mounted () {
    const expire = await this.$store.dispatch('staff/getExpireConf')
    this.selected = expire
  },
  methods: {
    returnToHome() {
      this.$router.push('/staff')
    },
    async submit() {
      if (this.selected === '__notdefined__') {
        return
      }
      const expire = await this.$store.dispatch('staff/setExpireConf', this.selected)
      this.selected = expire
      this.alert = true
    },
    handleOk() {
      this.alert = false
    }
  },
}
</script>
