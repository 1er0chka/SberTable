const express = require("express");
const cors = require("cors");
const app = express();
const port = 1106;

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// парсинг json req
app.use(express.json());

// получение данных о бд
const db = require("./app/models");

// синхронизация модели бд с бд
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// подключение
require("./app/routers/element.routers.js")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


// TODO если что-то сломается - добавить
// парсинг запросов типа - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));