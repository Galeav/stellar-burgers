export const Paths = {
  /* публичные */
  root: '/',
  feed: '/feed',
  /* для незалогинных */
  login: '/login',
  register: '/register',
  forgot: '/forgot-password',
  reset: '/reset-password',
  /* защищенные */
  profile: '/profile',
  profileOrders: '/profile/orders',

  /* модалки */
  ingredient: (id = ':id') => `/ingredients/${id}`,
  feedOrder: (num = ':number') => `/feed/${num}`,
  profileOrder: (num = ':number') => `/profile/orders/${num}`
};
