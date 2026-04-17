"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
let db = {};
let sequelize;
const databaseUrl = process.env.DATABASE_URL || process.env.JAWSDB_URL;
const runtimeConfig = {
  database: process.env.DB_NAME || config.database,
  username: process.env.DB_USER || config.username,
  password: process.env.DB_PASSWORD || config.password,
  host: process.env.DB_HOST || config.host,
  port: Number(process.env.DB_PORT || config.port || 3306),
  dialect: process.env.DB_DIALECT || config.dialect || "mysql",
  logging: process.env.DB_LOG_SQL === "true" ? console.log : false
};

const configDatabaseUrl = config.use_env_variable ? process.env[config.use_env_variable] : undefined;

if (databaseUrl || configDatabaseUrl) {
  sequelize = new Sequelize(databaseUrl || configDatabaseUrl, {
    dialect: runtimeConfig.dialect,
    logging: runtimeConfig.logging
  });
} else {
  sequelize = new Sequelize(
    runtimeConfig.database,
    runtimeConfig.username,
    runtimeConfig.password,
    {
      ...config,
      ...runtimeConfig
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
