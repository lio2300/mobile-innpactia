const express = require("express");
const app = express();
const chalk = require("chalk");
const cors = require("cors");
var bodyParser = require("body-parser");

var DataRouter = {
    login: {
        ruta: "/login",
        file: () => {
            return require("./rutas/login/login");
        }
    },
    client: {
        ruta: "/client",
        file: () => {
            return require("./rutas/client/client");
        }
    },
    mobile: {
        ruta: "/mobile",
        file: () => {
            return require("./rutas/mobile/mobile");
        }
    },
    repair: {
        ruta: "/repair",
        file: () => {
            return require("./rutas/repair/repair");
        }
    }
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
const options = {
    cors: {
        origin: "*",
        // origin: "http://localhost:4200",
        // methods: "GET,HEAD,PUT,PATCH,POST,DELETE".
        methods: "POST",
    },
};

const server = require("http").Server(app);

app.use(DataRouter.login.ruta, DataRouter.login.file());
app.use(DataRouter.client.ruta, DataRouter.client.file());
app.use(DataRouter.mobile.ruta, DataRouter.mobile.file());
app.use(DataRouter.repair.ruta, DataRouter.repair.file());

server.listen(5000, function () {
    console.log("\n");
    console.log(
        `>> Socket listo y escuchando por el puerto: ${chalk.green("5000")}`
    );
});