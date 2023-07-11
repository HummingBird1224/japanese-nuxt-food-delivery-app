<template>
  <!-- ボックスあり -->
  <div v-if="box && permission.length" class="Box-cards__child" v-bind:class="{'expired': expired}">
    <div class="Box-card-id Box-cards-item" v-html="boxId"></div>
    <div class="Box-card-permission Box-cards-item" v-html="permission[0]"></div>
    <div class="Box-card-remaining Box-cards-item" v-html="elapsed + '分'"></div>
    <div class="Box-card-icon" @pointerdown="clickBoxDelete(box.permission, boxId);">
      <img class="Box-card-icon__child" src="~/assets/img/icon/times-circle.svg">
    </div>
  </div>
  <!-- ボックスなし BOX CARD -->
  <div v-else class="Box-cards__child Box-cards__child--none">
    <div class="Box-card-id Box-cards-item" v-html="boxId"></div>
    <div class="Box-card-none Box-cards-item">ー</div>
  </div>
</template>

<script>
const ADMIN_AUTH_CODE = 'admincode'

export default {
  props: {
    boxId: {
      type: Number,
      default: 0,
    },
    BoxDelete: {
      type: Function,
      required: true,
    },
  },
  computed: {
    boxes () {
      return this.$store.state.staff.boxes
    },
    box () {
      return this.boxes.filter(box => box.id === this.boxId)[0]
    },
    stock () {
      if (this.box.stock.length === 1) {
        return this.box.stock[0]
      }
      return null
    },
    permission () {
      /* 紐づいている認証コードがリスト形式で返る */
      return this.box.permission.filter(perm => perm !== ADMIN_AUTH_CODE)
    },
    elapsed () {
      if (this.stock) {
        const elapsedSec = this.stock.elapsed
        if (elapsedSec) {
          return Math.floor(elapsedSec / 60)
        }
      }
      return '--'
    },
    expired () {
      const expire = this.$store.state.staff.expire
      if (expire != null && this.elapsed > expire) {
        return true
      }
      return false
      /* バックエンド側で計算された値を使う場合はこちら */
      /*
      if (this.stock) {
        return this.stock.elapsed
      }
      return false
      */
    },
  },
  methods: {
    // ボックス削除クリック
    clickBoxDelete (boxpermission, boxid) {
      this.BoxDelete(boxpermission, boxid)
    },
  }
}
</script>

<style scoped>
.expired::after {
  background: #ffee58;
}
</style>
