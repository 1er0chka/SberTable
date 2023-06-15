const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("table", "postgres", "2612", {
    dialect: "postgres",
    host: "localhost"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.elements = require("./element.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js");

module.exports = db;
