<template>
  <div class="Topbar" :class="{ page }">

    <!-- ロゴなしの場合は以下コメントアウト -->
    <!--
    <div class="Topbar__child">
      <img src="~/assets/img/logo/kfc_Logo_1952_edited.svg" class="Logo-text">
      <img src="~/assets/img/logo/kfc_logo.png" class="Logo-symbol">
    </div>
    -->
    <!-- ロゴなしの場合はコメントアウト__ここまで -->

    <!-- 後付けの電池＋時計ユニット（RTC）入れるまでコメントアウト -->
    <nuxt-link to="/staff/expireconf" class="Setting-icon Setting-icon--staff">
      <img src="~/assets/img/icon/cog-solid.svg" class="Setting-icon__child">
    </nuxt-link>
    <!-- 後付けの電池＋時計ユニット（RTC）入れるまでコメントアウト__ここまで -->

    <nuxt-link to="/staff" class="Prev-icon Prev-icon--staff">
      <img src="~/assets/img/icon/arrow-left-solid.svg" class="Prev-icon__child">
    </nuxt-link>
    <nuxt-link to="/customer" class="Prev-icon Prev-icon--customer">
      <img src="~/assets/img/icon/arrow-left-solid.svg" class="Prev-icon__child">
    </nuxt-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page: ''
    }
  },
}
</script>
