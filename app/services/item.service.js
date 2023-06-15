const db = require("../models/item.model");
const temporal = require("../models/item.temporal.model")


exports.base = (req, res) => {
    db.findAll({
        order: [['id', 'ASC']]
    })
        .then(data => {
            res.render("itemsTable.hbs", {
                items: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving elements."
            });
        });
}

exports.update = (req, res) => {
    const newData = {
        id: req.body.id,
        info: req.body.info
    }

    console.log(newData); // undef undef
    db.update(newData, {
        where: {id: newData.id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id="
            });
        });
}

exports.delete = (req, res) => {
    db.destroy({
        where: {id: req.body.id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id="
            });
        });
}

exports.create = (req, res) => {
    const item = {
        id: req.body.id,
        info: req.body.info
    }
    console.log(item)
    db.create(item)
        .then(data => {
            res.send({
                message: "Tutorial was created successfully!"
            });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}