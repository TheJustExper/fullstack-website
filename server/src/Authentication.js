const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectId;

const database = require("./Database");
const config = require("../config.json");

module.exports = new class {
    constructor() {}

    authCode({ token, code }) {
        token = token.split("Bearer ")[1];
        return new Promise((resolve, reject) => {
            if (token && code) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) reject(err);
                    if (decoded) {
                        if (code === "4201337") {
                            resolve({ code: "AUTHENTICATED" })
                        } else {
                            reject({ error: "1004", msg: "Wrong code try again" })
                        }
                    } else {
                        reject({ error: "1003", msg: "Token is invalid or has expired" })
                    }
                });
            }
        });
    }

    authToken({ token }) {
        token = token.split("Bearer ")[1];
        return new Promise((resolve, reject) => {
            if (token) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) reject(err);
                    if (decoded) {
                        resolve({ code: "AUTHENTICATED" })
                    } else {
                        reject({ error: "1003", msg: "Token is invalid or has expired" })
                    }
                });
            }
        });
    }

    register({ username, password }) {
        return new Promise((resolve, reject) => {
            database.addUser({ username, password }).then(payload => {
                resolve({ code: "REGISTERED" });
            }).catch(e => reject(e));
        });
    }

    login({ username, password }) {
        return new Promise((resolve, reject) => {
            database.findUser({ username }).then(payload => {
                if (payload) {
                    bcrypt.compare(password, payload.password, (err, match) => {
                        if (match) {
                            const followers = payload.followers.map(e => this.getFollowersProfile({ _id: ObjectId(e.id) }));
                            const following = payload.following.map(e => this.getFollowersProfile({ _id: ObjectId(e.id) }));

                            Promise.all([Promise.all(followers), Promise.all(following)]).then((d) => {
                                console.log(d)
                                const data = {
                                    id: payload._id,
                                    username: payload.username,
                                    info: payload.info,
                                    img: payload.img,
                                    rank: payload.rank,
                                    followers: d[0],
                                    following: d[1],
                                    feed: payload.feed,
                                    activity: payload.activity
                                };
                                const token = jwt.sign({data}, config.secret, {expiresIn: '1hr'});
                                resolve({token, data});
                            });

                        } else reject({ error: "1001", msg: "Password does not match" })
                    });
                } else reject({ error: "1002", msg: "You have supplied incorrect details" });
            }).catch(e => reject(e));
        });
    }

    async getProfile(req) {
        const { username } = req.query;
        return new Promise((resolve, reject) => {
            console.log(username)
            database.findUser({ username }).then(payload => {
                const followers = payload.followers.map(e => this.getFollowersProfile({ _id: ObjectId(e.id) }, e.date));
                const following = payload.following.map(e => this.getFollowersProfile({ _id: ObjectId(e.id) }, e.date));

                Promise.all([Promise.all(followers), Promise.all(following)]).then((d) => {
                    console.log(d)
                    const data = {
                        id: payload._id,
                        username: payload.username,
                        info: payload.info,
                        img: payload.img,
                        rank: payload.rank,
                        followers: d[0],
                        following: d[1],
                        feed: payload.feed,
                        activity: payload.activity
                    }

                    resolve({ account: data })
                });
            }).catch(e => reject({ error: "1005", msg: "No account with that username"}));
        });
    }

    getKey(arg, arr) {
        return new Promise((resolve, reject) => {
            database.findUser(arg).then(payload => {
                resolve(payload.username);
            });
        });
    }

    getFollowersProfile(arg, followed) {
        return new Promise((resolve, reject) => {
            database.findUser(arg).then(payload => {
                if (payload) {
                    resolve({
                        username: payload.username,
                        img: payload.img,
                        joined: followed,
                    });
                } 
            });
        });
    }

    follow({ headers, body }) {
        const { type, username } = body;
        const token = headers['authorization'].split("Bearer ")[1];

        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, function (err, { data }) {
                if (err) reject(err);
                if (data) {
                    if (username) {
                        database.addFollower({ type, username, id: data.id }).then((e) => resolve({ msg: "Followed" })).catch(e => reject({ error: "1007", msg: "Unable to follow" }))
                    } else {
                        reject({ error: "1006", msg: "No username specified" })
                    }
                } else {
                    reject({ error: "1003", msg: "Token is invalid or has expired" })
                }
            });
        });
    }
    
};
