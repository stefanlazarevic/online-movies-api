const { verifyJWT } = require('../../lib/auth');

module.exports = (request, response, next) => {
    const token = request.headers['Authorization'] || request.body.token || request.query.token;

    verifyJWT(token).then(decodedToken => {
        request.user = decodedToken.data;
        next();
    }).catch(err => {
        response.status(400).json({ code: 400, message: "Invalid auth token provided." });
    });
};
