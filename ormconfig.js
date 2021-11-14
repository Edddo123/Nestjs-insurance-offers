// module.exports = {
//     name: 'default',
//     type: 'sqlite',
//     database: process.env.NODE_ENV == "development" ? 'db.sqlite': 'db.sqlite',
//     entities: process.env.NODE_ENV == "development" ?
//     ['**/*.entity.js'] : ['**/*.entity.js'],
//     synchronize: process.env.NODE_ENV == "development" ? false : false, // test seem to need it maybe since db gets deleted and recreated every time to synchronize entity file with db
//     migrations: ["dist/src/migrations/*.js"],
//     migrationsTableName: "migrations_typeorm",
//     migrationsRun: true
// }
