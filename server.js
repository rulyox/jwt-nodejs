const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const secret = 'thisIsSecret';
const userPW = 'thisIsPassword';

const createToken = (userId) => {
    return new Promise((resolve, reject) => {

        const payload = {
            id: userId,
            someData: 'anythingHere'
        };

        const options = {
            expiresIn: '7d'
        };

        jwt.sign(payload, secret, options, (error, token) => {

            if(error) reject(error);
            resolve(token);

        });

    });
};

const checkToken = (token) => {
    return new Promise((resolve, reject) => {

        jwt.verify(token, secret, (error, decoded) => {

            if(error) reject(error);
            resolve(decoded);

        });

    });
};

const server = express();
server.use(bodyParser.json());

server.post('/token', async (request, response) => {

    const id = request.body.id;
    const pw = request.body.pw;

    if(pw === userPW) { // correct password

        try {

            let token = await createToken(id);

            const result = {
                auth: true,
                token: token
            };

            response.json(result);

        } catch(error) { // error

            console.log(error);
            response.status(500).end();

        }

    } else { // wrong password

        const result = {
            auth: false
        };

        response.json(result);

    }

});

server.post('/check', async (request, response) => {

    const token = request.body.token;

    try { // correct token

        const result = await checkToken(token);
        result['auth'] = true;

        response.json(result);

    } catch(error) { // wrong token

        const result = {
            auth: false
        };

        response.json(result);

    }

});

server.listen(8080, () => console.log('Server listening on port 8080!'));
