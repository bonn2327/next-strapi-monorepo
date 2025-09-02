module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/google-sync',
      handler: 'auth.googleSync',
      config: {
        auth: false,
      },
    },
  ],
};