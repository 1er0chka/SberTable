const express = require("express");
const cors = require("cors");
const app = express();
const port = 1106;

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
const db = require("./app/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


require("./app/routers/element.router.js")(app);
require("./app/routers/item.router.js")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
