var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const pool = require("./config/db");
var SEED = require("./config/config").SEED;
var MainPg = {};
const bcrypt = require("bcryptjs");
// var sendEm = require("./sendemail");

var DataServe = require("./ServeResponse");
var ServerResponse = DataServe.ServerResponse;
var DataError = DataServe.DataError;

var atob = require("atob");

MainPg.Login = function(consulta, parametros, res) {
    pool.query(consulta, [parametros.opcion, parametros.json], async(err, response) => {
        // console.log(err);
       
        if (err) {
            return res
                .status(500)
                .json(ServerResponse(500, ServerResponse(500,  DataError[500], null, err)));
        }
        
        response[0].Datos=JSON.parse(response[0].Datos);
        if (!response[0].Datos.data) {
            return res
                .status(400)
                .json(ServerResponse(400, ServerResponse(400,  response[0].Datos.message, null, err)));
        }

        var status = response[0].Datos.status;

        if (status != 400) {
            var clave = response[0].Datos.data.user_pass;
            if(parametros.opcion=='L'){
                bCryp = bcrypt.compareSync(parametros.json.user_pass, clave);
                if (bCryp) {
                    var dataPg = response[0].Datos.data;
                    var token = jwt.sign({ user: dataPg }, SEED, {
                        expiresIn: 43200,
                    });
                    res
                        .status(200)
                        .json(
                            ServerResponse(200, ServerResponse(200, response[0].Datos, null, token))
                        );
                } else {
                    res
                        .status(403)
                        .json(ServerResponse(403, ServerResponse(403,  response[0].Datos.message,  response[0].Datos.message)));
                }
            }
            if(parametros.opcion==='R'){
                res
                .status(200)
                .json(
                    ServerResponse(200, ServerResponse(200, response[0].Datos, null, token))
                );
            }
        } else {
            res
                .status(200)
                .json(ServerResponse(200, ServerResponse(200, response[0].Datos)));
        }
    });
};

MainPg.Main = function(consulta, parametros, res) {
    pool.query(consulta, [parametros.opcion, parametros.json], (error, response) => {
        console.log(response);
        console.log(error);
        response[0].Datos=JSON.parse(response[0].Datos);

        if (!response[0].Datos.data) {
            return res
                .status(400)
                .json(ServerResponse(400, ServerResponse(400,  response[0].Datos.message, null, error)));
        }

        res.status(200).json(ServerResponse(200, ServerResponse(200, response[0].Datos)));
    });
};

module.exports = MainPg;