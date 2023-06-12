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


// создание нового объекта
exports.create = (req, res) => {
    /*
    // проверка на заполнение
    if (!req.body.title) {
        res.status(400).send({
            message: "Данные не могут быть пустыми!"
        });
        return;
    }
    // Create a Element
    */
    const element = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Element in the database
    Element.create(element)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Element."
            });
        });
};

// Retrieve all Elements from the database.
exports.findAll = (req, res) => {
    Element.findAll()
        .then(data => {
            res.render("main.hbs", {
                users: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving elements."
            });
        });
};

// Find a single Element with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Element.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Element with id=" + id
            });
        });
};

// Update a Element by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Element.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Element was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Element with id=${id}. Maybe Element was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Element with id=" + id
            });
        });
};

// Delete a Element with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Element.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Element was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Element with id=${id}. Maybe Element was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Element with id=" + id
            });
        });
};

// Delete all Elements from the database.
exports.deleteAll = (req, res) => {
    Element.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Elements were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all elements."
            });
        });
};

// find all published Element
exports.findAllPublished = (req, res) => {
    Element.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving elements."
            });
        });
};
