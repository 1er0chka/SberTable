const Sequelize = require("sequelize")
const model = require('../models/item.model');
const db = require("../config/db.config");
const Temporal = require("sequelize-temporal");
const temporal = Temporal(model, db , {blocking: true, full: false});
temporal.sequelize.sync({force: false, hooks: true, benchmark: true});
module.exports = temporal;
