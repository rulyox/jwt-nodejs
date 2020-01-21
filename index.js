const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const secret = 'thisIsSecret';
const userPW = 'thisIsPassword';

let createToken = (userId) => {
    return new Promise((resolve, reject) => {

        let payload = {
            id: userId
        };

        let options = {
            expiresIn: '7d',
            issuer: 'issuedBy',
            subject: 'userInfo'
        };

        jwt.sign(payload, secret, options, (error, token) => {

            if (error) reject(error);
            resolve(token);

        });

    });
};

let checkToken = (token) => {
    return new Promise((resolve, reject) => {

        jwt.verify(token, secret, (error, decoded) => {

            if(error) reject(error);
            resolve(decoded);

        });

    });
};

let app = express();
app.use(bodyParser.json());

app.post('/token', async (request, response) => {

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

app.post('/check', async (request, response) => {

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

app.listen(8080);
