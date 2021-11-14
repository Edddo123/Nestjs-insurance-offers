module.exports = {
  type: 'postgres',
  database:
    process.env.NODE_ENV == 'development' ? 'insurance' : 'insurance_dev',
  host: 'localhost',
  username: 'postgres',
  entities:
    process.env.NODE_ENV == 'development'
      ? ['**/*.entity.js']
      : ['**/*.entity.ts'],
  port: 5432,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.NODE_ENV == 'development' ? false : true,
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};