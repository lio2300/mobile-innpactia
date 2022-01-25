var cryptoDevCode = {};
var CryptoJS = require("crypto-js");
const crypto = require("crypto");

var Storage = require("node-storage");
var store = new Storage("Middleware/613931e91fcee.json");

cryptoDevCode.encrypt = (datos, pk_empresa, pk_user) => {
    const data = JSON.stringify(datos);

    var publicKey = store.get(`key_empresa${pk_empresa}.key_user${pk_user}.keyPublic`);

    const encryptedData = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_NO_PADDING,
            cipher: "aes-256-cbc",
        },
        Buffer.from(data)
    );

    return encryptedData.toString("base64");
};
cryptoDevCode.dencrypt = (encryptedData, pk_empresa, pk_user) => {
    var privateKey = store.get(`key_empresa${pk_empresa}.key_user${pk_user}.keyPrivate`);

    const decryptedData = crypto.privateDecrypt({
            key: privateKey,
            passphrase: "_VEA$O9%32jvw#cnW&E10o3nw6",
            cipher: "aes-256-cbc",
            padding: crypto.constants.RSA_NO_PADDING,
        },
        Buffer.from(encryptedData, "base64")
    );

    return JSON.parse(decryptedData.toString());
};

cryptoDevCode.generateKeys = (pk_empresa, pk_user) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                modulusLength: 4096,
                publicKeyEncoding: { type: "spki", format: "pem" },
                privateKeyEncoding: {
                    type: "pkcs8",
                    format: "pem",
                    cipher: "aes-256-cbc",
                    passphrase: "_VEA$O9%32jvw#cnW&E10o3nw6",
                },
            });

            store.put(`key_empresa${pk_empresa}.key_user${pk_user}.keyPrivate`, privateKey);
            store.put(`key_empresa${pk_empresa}.key_user${pk_user}.keyPublic`, publicKey);

            resolve({ privateKey, publicKey });
        } catch (error) {
            reject(error);
        }
    });
};

cryptoDevCode.encryptData = (data) => {
    try {
        return CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "asdREAGKO248ad2167gd1jnk140954by2r6nxu3yy23vu43"
        ).toString();
    } catch (e) {
        //console.log(e);
    }
};

cryptoDevCode.decryptData = (data) => {
    try {
        const bytes = CryptoJS.AES.decrypt(data, "asdREAGKO248ad2167gd1jnk140954by2r6nxu3yy23vu43");
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    } catch (e) {
        //console.log(e);
    }
};

module.exports = cryptoDevCode;