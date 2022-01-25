var express = require("express");
var app = express();
var MainPg = require("../../Middleware/MainPg");
const bcrypt = require("bcryptjs");

var datos = {
    pg_procedimiento: "crud_user",
};

app.post("/", (req, res) => {
    var body = req.body;
    if(body.opcion=='R'){
        body.json.user_pass=bcrypt.hashSync(body.json.user_pass, 10);
    }
    consulta = `SELECT ${datos.pg_procedimiento}('${body.opcion}','${JSON.stringify(body.json)}') as Datos`;
    MainPg.Login(consulta, body, res);
});

module.exports = app;