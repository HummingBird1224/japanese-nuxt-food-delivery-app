<template>
  <section
    class="Wrapper Page-staff Page-staff--index"
    :class="{
      'Wrapper--bg': order,
      'Wrapper--bg-alert': boxDelete,
      'Wrapper--bg-fullalert': boxFull,
      'Wrapper--bg-deletealert': codeDelete,
    }"
  >
    <!-- ボックス削除アラート -->
    <div v-if="boxDelete" class="Alert-box">
      <p class="Content-p">
        注文番号<span class="Featuretext" v-html="boxDeletePermission"></span
        >を削除します<br />
        よろしいですか？
      </p>
      <div class="Common-button Common-button--pink">
        <div class="Common-button__child" @pointerdown="boxDeleteProcess">
          はい
        </div>
      </div>
      <div class="Common-button Common-button--orange">
        <div class="Common-button__child" @pointerdown="boxDeleteClose">
          キャンセル
        </div>
      </div>
    </div>

    <!-- ボックスフルアラート -->
    <div class="Alert-box" v-if="boxFull">
      <p class="Content-p">
        <span class="Featuretext">ボックスがいっぱいです</span><br />
      </p>
      <div class="Common-button Common-button--orange">
        <div class="Common-button__child" @pointerdown="boxFullClose">O K</div>
      </div>
    </div>

    <!-- 待機オーダー削除アラート -->
    <div class="Alert-box" v-if="codeDelete">
      <p class="Content-p" v-if="!codeDeleted">
        待機オーダー<span class="Featuretext">{{ codeDeleteId }}</span
        >を削除してよいですか？<br />
      </p>
      <p class="Content-p" v-else>
        <span class="Featuretext">{{ codeDeleteId }}</span
        >を削除しました
      </p>
      <div class="Common-button Common-button--orange">
        <div class="Common-button__child" @pointerdown="codeDeleteProcess">
          O K
        </div>
        <div
          class="Common-button__child"
          @pointerdown="codeDeleteClose"
          v-if="!codeDeleted"
        >
          キャンセル
        </div>
      </div>
    </div>

    <!-- 待機オーダー一覧 -->
    <div class="Order-box" v-if="codes != null">
      <div class="Order-box__header">
        待機オーダーリスト
        <div class="Order-box__header-icon" @pointerdown="popupClose">
          <img
            class="Order-box__header-icon__child"
            src="~/assets/img/icon/times-circle.svg"
          />
        </div>
      </div>
      <div class="Order-box__content">
        <div class="Order-list" v-if="unreferencedCodes.length > 0">
          <StaffOrderList
            v-for="code in unreferencedCodes"
            :key="code.id"
            :id="'code_' + code"
            :code-str="code.id"
            @registerBox="registerBox(code.id)"
            @deleteCode="codeDeleteOpen(code.id)"
          ></StaffOrderList>
        </div>
        <div v-else>待機オーダーがありません</div>
      </div>
    </div>

    <div class="Main-content">
      <!-- ロード中画面（一瞬だが） -->
      <div v-if="boxes == null">ロード中...</div>

      <!-- ボックス一覧表示画面 -->
      <div v-else>
        <div class="Buttons">
          <div
            class="Common-button Common-button--pink"
            v-if="unreferencedCodes.length > 0"
          >
            <div class="Common-button__child" @pointerdown="popupOrder">
              待機オーダーはこちら
            </div>
          </div>

          <!-- 通常 -->
          <div
            class="Common-button Common-button--orange"
            @pointerdown="redirectToRegisterPage"
          >
            <div class="Common-button__child">注文登録</div>
          </div>

          <!-- 使用中ボックスが9個以上の場合
          <div class="Common-button Common-button--orange" @pointerdown="boxFullAlert">
            <div class="Common-button__child">注文登録</div>
          </div>
          -->
        </div>

        <!-- BOX9個の場合 -->
        <div class="Box-cards">
          <!-- BOX8個の場合 -->
          <!--
        <div class="Box-cards Box-cards--type8">
        -->
          <StaffBoxCard :box-id="1" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="4" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="7" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="2" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="5" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="8" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="3" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="6" :box-delete="boxDeleteOpen" />
          <StaffBoxCard :box-id="9" :box-delete="boxDeleteOpen" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const ADMIN_AUTH_CODE = 'admincode'

export default {
  middleware: 'authRequired',
  data() {
    return {
      order: false,
      refreshTimer: null,

      // ボックス削除用
      boxDelete: false,
      // boxDelete: true,
      boxDeletePermission: null,
      boxDeleteId: null,

      // ボックスフル
      boxFull: false,

      // 待機オーダー削除用
      codeDelete: false,
      codeDeleteId: null,
      codeDeleted: false,
    }
  },
  computed: {
    codes() {
      return this.$store.state.staff.codes
    },
    boxes() {
      return this.$store.state.staff.boxes
    },
    openBoxes() {
      if (this.boxes == null) {
        return []
      }
      return this.boxes.filter((box) => box.door[0].isOpen === true)
    },
    unreferencedCodes() {
      /* ボックスが割り当てられていない注文コード */
      if (this.codes == null) {
        return []
      }
      return this.codes.filter((code) => code.box.length === 0)
    },
    emptyBoxes() {
      if (this.boxes == null) {
        return []
      }
      const emptyBoxes = this.boxes.filter((box) => box.stock.length === 0)
      const box = emptyBoxes.filter((boxId) => !this.openBoxes.includes(boxId))
      return box
    },
  },
  async mounted() {
    // mounted() {
    /* 店員用画面は自動ログインする */
    await this.$store.dispatch('auth/login', ADMIN_AUTH_CODE)
    this.refreshBoxInfo()
  },
  beforeDestroy() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = null
    }
  },
  methods: {
    async refreshBoxInfo() {
      await this.$store.dispatch('staff/refreshBoxInfo')
      await this.$store.dispatch('staff/refreshCodeList')
      await this.$store.dispatch('staff/getExpireConf')
      this.refreshTimer = setTimeout(this.refreshBoxInfo, 10 * 1000)
    },
    // ポップアップ表示
    popupOrder() {
      this.order = true
    },
    // ポップアップCLOSE
    popupClose() {
      this.order = false
    },
    // ボックス削除アラート表示
    boxDeleteOpen(value1, value2) {
      this.boxDelete = true
      this.boxDeletePermission = value1[1]
      this.boxDeleteId = value2
    },
    // ボックス削除アラートCLOSE
    boxDeleteClose() {
      this.boxDelete = false
    },
    async boxDeleteProcess() {
      await this.$store.dispatch('staff/deleteCode', this.boxDeletePermission)
      this.boxDeleteClose()
    },
    // ボックスフルアラート表示
    boxFullAlert() {
      this.boxFull = true
    },
    // ボックスフルアラート表示
    boxFullClose() {
      this.boxFull = false
    },
    redirectToRegisterPage() {
      this.$router.push('/staff/registercode')
    },
    registerBox(codeStr) {
      if (this.emptyBoxes.length === 0) {
        this.popupClose()
        this.boxFullAlert()
        return
      }
      this.$store.commit('staff/setRegisterCode', codeStr)
      this.$router.push('/staff/registerbox')
    },
    codeDeleteOpen(codeStr) {
      this.popupClose()
      this.codeDelete = true
      this.codeDeleteId = codeStr
      this.codeDeleted = false
    },
    codeDeleteClose() {
      this.codeDelete = false
      this.codeDeleteId = null
      this.codeDeleted = false
    },
    async codeDeleteProcess() {
      if (this.codeDeleted) {
        /* 少しトリッキーなことをしている。要リファクタリング */
        this.codeDeleteClose()
        return
      }
      await this.$store.dispatch('staff/deleteCode', this.codeDeleteId)
      this.codeDeleted = true
    },
  },
}
</script>
