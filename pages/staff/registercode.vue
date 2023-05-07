<template>
  <section
    class="Wrapper Page-staff Page-staff--registercode"
    :class="{ 'Wrapper--bg': alert }"
  >
    <!-- 登録完了アラート -->
    <div class="Alert-box">
      <p class="Content-p">
        <span class="Featuretext">{{ inputCode }}</span
        >の注文を登録しました<br />
        ボックス選択画面へ移動します
      </p>
      <div class="Common-button Common-button--orange">
        <div
          class="Common-button__child"
          @pointerdown="redirectToBoxRegisterPage"
        >
          O K
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

        <div class="Err-message" v-if="isInvalidCode">
          <div class="Err-message__child" @pointerdown="isInvaildRelease">
            その注文番号は登録済みです
            <div class="Err-message-icon">
              <img
                class="Err-message-icon__child"
                src="~/assets/img/icon/times-circle.svg"
              />
            </div>
          </div>
        </div>

        <KeyBoards @input="addInput" />
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
          @pointerdown="register"
        >
          決 定
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
      inputCode: '',
      alert: false,
      isInvalidCode: false,

      inputExist: false,

      redirectTimer: null,
    }
  },
  mounted() {
    // 一定時間後にトップに戻る
    this.redirectTimer = setTimeout(() => {
      this.$router.push('/staff')
    }, 90 * 1000)

    /* 登録対象の注文コードをクリアする */
    this.$store.commit('staff/clearRegisterInfo')
  },
  beforeDestroy() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  },
  methods: {
    /* 認証コードcodeを登録する */
    async register() {
      try {
        await this.$store.dispatch('staff/registerCode', this.inputCode)
      } catch (e) {
        this.isInvalidCode = true
        return
      }
      /* 3秒後に自動リダイレクト */
      if (this.redirectTimer) {
        clearTimeout(this.redirectTimer)
      }
      this.redirectTimer = setTimeout(this.redirectToBoxRegisterPage, 3 * 1000)
      // アラート表示
      this.alert = true
    },
    redirectToBoxRegisterPage() {
      const boxes = this.$store.state.staff.boxes
      const emptyBoxes = boxes.filter((box) => box.stock.length === 0)
      if (emptyBoxes.length === 0) {
        this.$router.push('/staff/boxfull')
      } else {
        this.$router.push('/staff/registerbox')
      }
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
