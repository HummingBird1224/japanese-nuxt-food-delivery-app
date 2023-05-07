<template>
  <section
    class="Wrapper Page-customer Page-customer--auth"
    :class="{ 'Wrapper--bg': isInvalidCode }"
  >
    <!-- エラー表示 -->
    <div class="Err-message" v-if="isInvalidCode">
      <div class="Err-message__child" @pointerdown="isInvaildRelease">
        注文番号が見つかりません
        <div class="Err-message-icon">
          <img
            class="Err-message-icon__child"
            src="~/assets/img/icon/times-circle.svg"
          />
        </div>
      </div>
    </div>

    <div class="Main-content">
      <div class="Keyboards-input">
        <input
          id="Order-input"
          class="Order-input"
          placeholder="注文番号を入力してください"
          :value="inputCode"
          @input="onInputChange"
        />
        <KeyBoards sound @input="addInput" />
      </div>
    </div>

    <div class="Bottombar">
      <div class="Common-button">
        <div class="Common-button__child" @pointerdown="BackSpace">
          ←1文字戻る
        </div>
      </div>
      <div class="Common-button">
        <div class="Common-button__child" @pointerdown="AllClear">クリア</div>
      </div>
      <div class="Common-button Common-button--orange">
        <div
          class="Common-button__child"
          :class="{ Active: inputExist }"
          @pointerdown="login(inputCode)"
        >
          決 定
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputCode: '',
      isInvalidCode: false,
      inputExist: false,

      redirectTimer: null,
    }
  },
  mounted() {
    this.$sound.playWelcome()
    // 一定時間後にトップに戻る
    this.redirectTimer = setTimeout(() => {
      this.$router.push('/customer')
    }, 90 * 1000)
  },
  destroyed() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  },
  methods: {
    /* 認証コードcodeを使ってログインする */
    async login(code) {
      try {
        await this.$store.dispatch('auth/login', code)
        this.$sound.playSubmit()
      } catch (err) {
        if (err.name === 'InvalidAuthCodeError') {
          /* DBに登録されていない認証コード */
          this.isInvalidCode = true
          this.$sound.playFaul()
          return
        } else {
          /* その他のエラー */
          throw err
        }
      }
      this.$router.push('/customer/box')
    },
    // キーボードから入力
    addInput(value) {
      this.inputCode += value
      this.inputExist = true
    },
    onInputChange(e) {
      this.inputCode = e.target.value

      // 入力空でない場合
      if (this.inputCode !== null) {
        this.inputExist = true

        if (this.isInvalidCode) {
          this.isInvalidCode = false
        }
      }
    },
    // エラー解除
    isInvaildRelease() {
      this.isInvalidCode = false
    },
    // 全クリア
    AllClear() {
      this.inputCode = ''
      this.inputExist = false
    },
    // 1文字戻る
    BackSpace() {
      this.inputCode = this.inputCode.slice(0, -1)
      if (this.inputCode === '') {
        this.inputExist = false
      }
    },
  },
}
</script>
