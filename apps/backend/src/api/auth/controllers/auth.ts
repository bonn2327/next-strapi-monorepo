module.exports = {

  async generateUsername(name, email) {
    const baseUsername = (name || email).replace(/\s+/g,'').toLowerCase();
    let username = baseUsername;
    let attempts = 0;

    while (attempts < 10 ) {
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: { username }
      });

      if (!existingUser) {
        return username;
      }

      const randomDigits = Math.floor(100 + Math.random() * 900); 
      username = `${baseUsername}${randomDigits}`;
      attempts++;
    }
    return username;
  },

  async googleSync(ctx) {
    const { email, name } = ctx.request.body;
    const generateUsername = await this.generateUsername(name || email);


    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
      let user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email }
      });

      if (!user) {
        user = await strapi.query('plugin::users-permissions.user').create({
          data: {
            username: generateUsername,
            email,
            provider: 'google',
            confirmed: true,
            blocked: false,
            role: 1
          }
        });
      }

      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id
      });

      ctx.send({
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      ctx.internalServerError('Failed to sync Google user');
    }
  }
};