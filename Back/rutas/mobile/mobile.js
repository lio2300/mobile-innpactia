var express = require("express");
var app = express();
var MainPg = require("../../Middleware/MainPg");
const bcrypt = require("bcryptjs");
var mdAuthenticationJWT = require("../../Middleware/Authentication");

var datos = {
    pg_procedimiento: "crud_mobile",
};

// app.post("/", mdAuthenticationJWT.verificarToken,(req, res) => {
app.post("/",(req, res) => {
    var body = req.body;
    consulta = `SELECT ${datos.pg_procedimiento}('${body.opcion}','${JSON.stringify(body.json)}') as Datos`;
    MainPg.Main(consulta, body, res);
});

module.exports = app;