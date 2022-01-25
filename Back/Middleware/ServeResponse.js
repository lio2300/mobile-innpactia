module.exports.ServerResponse = (status, resp, error = null, token = null) => {
    var data = {};

    data.message = resp;
    data.status = status;
    error && (data.error = error);
    token && (data.token = token);

    return data;
};

module.exports.DataError = {
    500: "Error de servidor",
    400: "Error opción no encontrada",
    401: "Token incorrecto",
    403: "Prohibido el ingreso",
};