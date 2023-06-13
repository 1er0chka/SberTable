module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        info: {
            type: Sequelize.BIGINT
        }
    });
    return Item;
};
