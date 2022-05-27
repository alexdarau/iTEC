var express = require("express");
const Users = require("../models/user.js");
const CryptoJS = require('crypto-js');
const encrypt = require("../helpers/encryptPassword");
const server = express();

server.use(express.json());

server.post('/auth/register',
    async (req, res) => {
        const { email, password, firstName, lastName } = req.body;

        let encrypted_password;
        await encrypt.encryptPassword(password).then((response) => {
            encrypted_password = response;
        });

        const user = {
            email,
            password: encrypted_password,
            firstName,
            lastName,
        };

        console.log(user)

        const userReq = await Users.findOne(email);

        if (!userReq) {
            await Users.create({
                ...user
            }).then(user =>
                res.status(200).json({
                    message: "User successfully created",
                    user,
                })
            )
        } else {
            res.status(401).json({
                message: "User not created",
            });
        }
    });

module.exports = server;