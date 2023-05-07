<template>
  <section class="Wrapper Page-mode-select">
    <div class="Main-content">
      <h3 class="Heading h3">モード選択画面</h3>
      <p class="Content-p">動作モードを選択してください</p>
      <div class="Mode-selector">
        <nuxt-link to="/customer" class="Mode-selector__child Common-button Common-button--orange">
          <div class="Common-button__child">お客様用画面</div>
        </nuxt-link>
        <nuxt-link to="/staff" class="Mode-selector__child Common-button Common-button--orange">
          <div class="Common-button__child">店員用画面</div>
        </nuxt-link>
      </div>
      <nuxt-link to="/mgmt" class="Common-button Admin Common-button--red">
        <div class="Common-button__child">システム管理</div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
