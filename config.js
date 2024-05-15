const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: 'ep-small-river-a4pf78lk-pooler.us-east-1.aws.neon.tech',
  //  port: env.DB_PORT || '5432',
    user: 'default',
    password: 'PEIXl7nrGfm4',
    database: 'verceldb',
  },
  POSTGRES_URL: "postgres://default:PEIXl7nrGfm4@ep-small-river-a4pf78lk-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  listPerPage: 10,
  pool: {

    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000

  }
};

module.exports = config;
