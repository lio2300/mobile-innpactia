var jwt = require("jsonwebtoken");

var SEED = require("../Middleware/config/config").SEED;

var DataServe = require("./ServeResponse");
var ServerResponse = DataServe.ServerResponse;
var DataError = DataServe.DataError;

var EncryptDevCode = require("../Middleware/crypto");

exports.verificarToken = function(req, res, next) {
    //var token = req.query.token;
    //aqui va sin el bearer

    // var token = EncryptDevCode.decryptData(req.headers.token);
    var token = req.headers.token;

    //token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InBrX3VzZXIiOjMsInBrX3BlcnNvbiI6MSwidXN1YXJpb191c2VyIjoiMTcxNjczMTU3MyIsInBhc3N3b3JkX3VzZXIiOiIkMnkkMTAkTTBOcEt6azcwZmFkalJEbkdSYktoT29rN210eUZzYUd3OHpJRjAuR2tMbHRHYldQLjF1VG0iLCJ2aXNpYmxlX3VzZXIiOnRydWUsImF1ZGl0X2NyZWFjaW9uIjp7InVzZXIiOiJBRE1JTklTVFJBRE9SIn0sImF1ZGl0X21vZGlmaWNhY2lvbiI6bnVsbCwicGtfdGlwaWRlbiI6MSwibnVtaWRlbnRpZmljYWNpb25fcGVyc29uIjoiMTcxNjczMTU3MyIsIm5vbWJyZXNfcGVyc29uIjoiQURNSU5JU1RSQURPUiIsImFwZWxsaWRvc19wZXJzb24iOiJBRE1JTklTVFJBRE9SIiwiZXN0YWRvY2l2aWxfcGVyc29uIjoiTklOR1VOTyIsInNleG9fcGVyc29uIjoiTSIsInRlbGVmb25vX3BlcnNvbiI6bnVsbCwiY2VsdWxhcl9wZXJzb24iOiIwOTk5MzE5MjczIiwiY29ycmVvX3BlcnNvbiI6bnVsbCwicGtfdWJpZ2VvIjo3NCwiZmVjaGFuYWNfcGVyc29uIjoiMTk4Ny0wNy0xMFQwNTowMDowMC4wMDBaIiwiZGlyZWNjaW9uX3BlcnNvbiI6IlNBTlRPIERPTUlOR08iLCJwa19uaXZlZHUiOm51bGwsInBrX3Byb2YiOm51bGwsIm9jdXBhY2lvbl9wZXJzb24iOm51bGx9LCJpYXQiOjE1NTgwMzY5NTYsImV4cCI6MTU1ODA1MTM1Nn0.dHrePRqsiCbODLXLwMXVleF_fxOD_ucUxIbrm83gW3g';

    jwt.verify(token, SEED, (err, decode) => {
        if (err) {
            return res.status(401).json(ServerResponse(401, ServerResponse(401, DataError[401])));
        }

        req.user = decode.user;

        //este si esta bien el token me permite avanzar a la siguiente fase del codigo
        next();
    });
}; //

//VERIFICA SI EL user LOGUEADO ES ADMINISTRADOR ADMIN_ROLE
exports.verificarADMIN_ROLE = function(req, res, next) {
    var user = req.user;
    if (user.role === "ADMIN_ROLE") {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: "Token Incorrecto - No es administrador",
            errors: { message: "No es administrador, no puede realizar esa accion" },
        });
    }
};

//VERIFICA SI EL user LOGUEADO ES ADMINISTRADOR ADMIN_ROLE
exports.verificarADMIN_o_MISMO_user = function(req, res, next) {
    var user = req.user;
    var id = req.params.id;

    if (user.role === "ADMIN_ROLE" || user._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: "Token Incorrecto - No es administrador, ni el mismo user",
            errors: { message: "No es administrador, no puede realizar esa accion" },
        });
    }
};