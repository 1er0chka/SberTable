module.exports = app => {
    const items = require("../services/item.service.js");

    var router = require("express").Router();

    router.get("/", items.base);

    router.put('/update', items.update);

    router.delete('/delete', items.delete);

    router.post('/create', items.create);

    app.use("/items", router);
};
