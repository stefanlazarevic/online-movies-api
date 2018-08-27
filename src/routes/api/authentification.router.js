const express = require('express');
const { Router } = express;
const { generateJWT } = require('../../lib/auth');

const AuthentificationRouter = Router();

AuthentificationRouter.post('/login', (request, response) => {
    const user = {
        username: request.body.username,
        password: request.body.password,
    };

    if (user.username === process.env.ADMIN_USERNAME && user.password === process.env.ADMIN_PASSWORD) {
        generateJWT(user).then(token => {
            response.status(200).json({
                code: 200,
                data: {
                    token: token,
                }
            });
        }).catch(err => {
            response.status(500).json({
                code: 500,
                message: err.message,
            });
        });
    } else {
        response.status(403).json({
            code: 403,
            message: 'Not authorized.',
        });
    }
});

AuthentificationRouter.get('/logout', (request, response) => {

});

module.exports = AuthentificationRouter;
