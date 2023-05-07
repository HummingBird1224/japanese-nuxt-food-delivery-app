<template>
  <section class="Wrapper Page-staff Page-staff--registerbox">
    <div class="Main-content">
      <h3 class="Heading h3">ボックス選択</h3>
      <p class="Content-p">
        注文番号
        <span
          class="Featuretext"
          v-if="registerCode"
          v-html="registerCode"
        ></span>
        <span class="Featuretext" v-else>----</span>
        の商品をボックスにセットしてください
      </p>

      <!-- ボックス一覧 -->
      <!-- BOX9個の場合 -->
      <div class="Register-box-wrap">
        <!-- BOX8個の場合 -->
        <!--<div class="Register-box-wrap Register-box-wrap--type8">-->

        <div
          class="Register-box"
          v-for="box of boxesOrdered"
          :key="box.id"
          :box-id="box.id"
        >
          <div v-if="box.stock.length === 0">
            <input
              type="checkbox"
              :id="'Registerbox_' + box.id"
              v-model="selected"
              name="Registerbox_select"
              :value="box.id"
              class="Register-box-input"
            />
            <label :for="'Registerbox_' + box.id" class="Register-box__child">
              <div
                class="Register-box-id Register-box-item"
                v-html="box.id"
              ></div>
              <div class="Register-box-text Register-box-item">選択する</div>
              <span class="Register-box-checked"></span>
            </label>
          </div>
          <div v-else>
            <label class="Register-box__child Register-box__child--none">
              <div
                class="Register-box-id Register-box-item"
                v-html="box.id"
              ></div>
              <div class="Register-box-text Register-box-item">使用中</div>
            </label>
          </div>
        </div>
      </div>

      <button
        class="Common-submitbutton Common-submitbutton--orange"
        :class="{ 'btn-hide': submitDisabled }"
        @pointerdown="register"
      >
        セット完了
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'authRequired',
  data() {
    return {
      selected: [],
      sndSubmit: null,

      redirectTimer: null,
    }
  },
  computed: {
    ...mapState('staff', ['boxes', 'registerCode']),
    availableBoxes() {
      /* TODO: Refactoring */
      return this.boxes.filter((box) => box.permission.length === 1)
    },
    submitDisabled() {
      return this.selected.length === 0
    },
    boxesOrdered() {
      const orderedBox = []
      orderedBox.push(this.boxes[0])
      orderedBox.push(this.boxes[3])
      orderedBox.push(this.boxes[6])
      orderedBox.push(this.boxes[1])
      orderedBox.push(this.boxes[4])
      orderedBox.push(this.boxes[7])
      orderedBox.push(this.boxes[2])
      orderedBox.push(this.boxes[5])
      orderedBox.push(this.boxes[8])
      // orderedBox = [...this.boxes]
      return orderedBox
    },
  },
  mounted() {
    // 一定時間後にトップに戻る
    this.redirectTimer = setTimeout(() => {
      this.$router.push('/staff')
    }, 180 * 1000)
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
      await this.$store.dispatch('staff/grantCodeToBox', {
        code: this.registerCode,
        boxId: this.selected,
      })
      this.$sound.playSubmit()
      this.$router.push('/staff/thanks')
    },
  },
}
</script>

<style scoped>
/* 暫定対処で未選択時にボタンを隠す */
.btn-hide {
  display: none;
}
</style>
