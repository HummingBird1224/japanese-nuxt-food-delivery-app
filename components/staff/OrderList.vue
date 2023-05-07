<template>
  <div class="Order-list__child" @pointerdown="registerBox(code.id)">
    <div class="Order-list-text">注文番号</div>
    <div class="Order-list-val">{{ code.id }}</div>
    <div class="Order-list-icon">
      <img class="Order-list-icon__child" src="~/assets/img/icon/times-circle.svg" @pointerdown.self.stop="deleteCode(code.id)">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    codeStr: {
      type: String,
      require: true,
    },
  },
  computed: {
    codes() {
      return this.$store.state.staff.codes
    },
    code() {
      return this.codes.filter(code => code.id === this.codeStr)[0]
    },
  },
  methods: {
    registerBox(codeStr) {
      this.$emit('registerBox', codeStr)
    },
    deleteCode(codeStr) {
      this.$emit('deleteCode', codeStr)
    }
  }
}
</script>
