module.exports = app => {
    const elements = require("../services/element.service.js");

    var router = require("express").Router();

    router.get("/", elements.base);

    // открыть новый уровень
    router.put("/open", elements.open);

    app.use("/elements", router);
};
