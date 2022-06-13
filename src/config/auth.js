export default {
  secret: process.env.APP_SECRET,
  secretRefresh: process.env.APP_SECRET_REFRESH,
  expiresIn: 60 * 30,
};
