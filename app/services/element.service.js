const db = require("../models");
const Element = db.elements;

exports.base = (req, res) => {
    Element.findAll({attributes: ['id', 'l1', 'l2']})
        .then(data => {
            const formattedElements = data.map((item) => {
                return {
                    id: item.id,
                    l1: item.l1,
                    isLeaf: !!item.l2,
                };
            });
            openElements = formattedElements;
            res.render("main.hbs", {
                users: formattedElements
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving elements."
            });
        });
}

exports.open = (req, res) => {
    const element = {
        id: req.body.id,
        level: req.body.level
    };
    console.log("1")

    Element.findByPk(element.id)
        .then(data => {
            const nextField = Object.keys(data.dataValues)[Object.keys(data.dataValues).indexOf(element.level) + 1];
            let isLeaf = false;
            if (nextField && data[nextField] !== null && nextField !== "createdAt" && nextField !== "updatedAt") {
                isLeaf = true;
            }
            const item = {
                id: data.id,
                label: data[element.level],
                isLeaf: isLeaf
            };
            res.json(item);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Element with id"
            });
        });
};

