const auth = require("../Authentication");

const express = require('express');
const router = express.Router();

router.post("/code", (req, res) => {
    auth.authCode({ token: req.headers['authorization'], code: req.body.code })
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
});

router.post("/token", (req, res) => {
    auth.authToken({ token: req.headers['authorization'] })
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
    auth.login(req.body)
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
});

router.post("/register", (req, res) => {
    auth.register(req.body)
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
});

router.post("/activity", (req, res) => {
    auth.follow(req)
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
});

router.get("/profile", (req, res) => {
    auth.getProfile(req)
        .then(data => { res.json(data) })
        .catch((err) => res.json(err));
})

module.exports.router = router;
module.exports.name = "v1";