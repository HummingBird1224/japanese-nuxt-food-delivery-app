const ADMIN_AUTH_CODE = 'admincode'

export default async ({ store, route, redirect }) => {
  if (store.state.auth.accessToken == null) {
    const path = route.path
    if (path.startsWith('/staff')) {
      /* 店員用画面は自動ログインする */
      await store.dispatch('auth/login', ADMIN_AUTH_CODE)
      if (path !== '/staff' && path !== '/staff/') {
        redirect('/staff')
      }
    } else if (path.startsWith('/customer')) {
      if (path !== '/customer' && path !== '/customer') {
        redirect('/customer')
      }
    }
  }
}
