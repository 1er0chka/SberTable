const db = require("../config/db.config")
const Sequelize = require("sequelize")

module.exports =  db.define("item", {
        info: {
            type: Sequelize.BIGINT
        }
});
