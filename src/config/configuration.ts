export default () => ({
  port: parseInt(process.env.PORT, 80) || 80,
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
