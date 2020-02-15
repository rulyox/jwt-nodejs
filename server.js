const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const secret = 'thisIsSecret';
const userPW = 'thisIsPassword';

const createToken = (userId) => {
    return new Promise((resolve, reject) => {

        let payload = {
            id: userId,
            someData: 'anythingHere'
        };

        let options = {
            expiresIn: '7d'
        };

        jwt.sign(payload, secret, options, (error, token) => {

            if (error) reject(error);
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

    let id = request.body.id;
    let pw = request.body.pw;
    let responseJson;

    if(pw === userPW) {

        let token = await createToken(id)
            .then((token) => {

                return token;

            }).catch((error) => {

                console.log(error);

            });

        responseJson = {
            'auth' : true,
            'token' : token
        };

    } else {

        responseJson = {
            'auth' : false
        };

    }

    await response.json(responseJson);

});

server.post('/check', async (request, response) => {

    let token = request.body.token;

    let responseJson = await checkToken(token)
        .then((decoded) => {

            decoded['auth'] = true;

            return decoded;

        })
        .catch((error) => {

            console.log(error);

            return {
                'auth' : false
            };

        });

    await response.json(responseJson);

});

server.listen(8080, () => console.log('Server listening on port 8080!'));
