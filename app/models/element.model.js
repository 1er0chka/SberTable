module.exports = (sequelize, Sequelize) => {
    const Element = sequelize.define("element", {
        l1: {
            type: Sequelize.BIGINT
        },
        l2: {
            type: Sequelize.BIGINT
        },
        l3: {
            type: Sequelize.BIGINT
        },
        l4: {
            type: Sequelize.BIGINT
        }
    });
    return Element;
};
