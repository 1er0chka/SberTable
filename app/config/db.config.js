const Sequelize = require("sequelize");
module.exports = sequelize = new Sequelize("table", "postgres", "2612", {
    dialect: "postgres",
    host: "localhost"
});