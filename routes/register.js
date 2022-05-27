const express = require("express");
const Users = require("../models/users.js");
const encrypt = require("../services/encryptPassword");
const constants = require("../constants/values");
const Wallet = require("../models/wallet.js");
const currency = require("../services/currencyHelpers");
const server = express();

server.use(express.json());

server.post("/register", async (req, res) => {
    const { displayName, username, email, password } = req.body;

    let encryptedPassword;
    await encrypt.encryptPassword(password).then((encryptedPass) => {
        encryptedPassword = encryptedPass;
    });

    const user = {
        displayName,
        username,
        email,
        provider: "register",
        password: encryptedPassword,
    };

    const userReq = await Users.findOne({ username });

    if (!userReq) {
        await Users.create({
            ...user,
        }).then(user => {
            res.status(200).json({
                message: "User successfully created",
                user
            });
        });
    } else {
        res.status(409).json({
            message: "Username already exists",
        });
    }
});

module.exports = server;
