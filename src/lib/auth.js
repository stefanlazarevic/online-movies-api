const jwt = require('jsonwebtoken');

exports.verifyJWT = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
}

exports.generateJWT = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
            },
            (err, token) => {
                if (err || !token) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

module.exports = exports;
