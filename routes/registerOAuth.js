var express = require("express");
//var jwt = require("jsonwebtoken");
const Users = require("../models/user.js");
const CryptoJS = require('crypto-js');
//const { application } = require("express");

const server = express();

server.use(express.json());

server.post('/auth/register',
    async (req, res) => {
        const { email, password, role, firstName, lastName } = req.body;

        const encrypted_password = CryptoJS.AES.encrypt(JSON.stringify(password), process.env.SECRET_KEY).toString();

        const user = {
            email,
            password: encrypted_password,
            firstName,
            lastName,
            role
        }
        console.log(user)

        const userReq = await Users.findOne(user);

        if (!userReq) {
            await Users.create({
                ...user
            }).then(user =>
                res.status(200).json({
                    message: "User successfully created",
                    user,
                })
                // res.redirect(`/api/users/${user.id}`);
            )
        } else {
            res.status(401).json({
                message: "User not created",
            });
            // res.redirect(constants.UNAUTHORIZED_URL);
        }
    });

server.post('/auth/login',
    async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body)
        //console.log(email)
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" })
        }

        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var decrypted_password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log("🚀 ~ file: registerOAuth.js ~ line 59 ~ decrypted_password", decrypted_password)

        // if (password == decrypted_password) {
        //     const token = jwt.sign(
        //         {
        //             id: user._id,
        //             email: user.email
        //         },
        //         process.env.JWT_SECRET)

        //     const dev = await Devices.findOne({ deviceID: device.deviceID });

        //     // if (!dev) {
        //     //     await Devices.create({
        //     //         ...device
        //     //     }).then(device => {
        //     //         console.log("Device successfully created:", device)
        //     //     })
        //     // } else {
        //     //     user.currentDeviceID = dev.deviceID;
        //     // }
        //     res.status(200).json({
        //         message: "Login successfully",
        //         token
        //         })
        // }

    }
)

module.exports = server;