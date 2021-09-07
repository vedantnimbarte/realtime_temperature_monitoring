if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  secret: process.env.SECRET,
};
