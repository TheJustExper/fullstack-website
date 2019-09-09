const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");
let database;

module.exports = new class {
    constructor() {
        this.url = "mongodb://localhost:27017";
        this.dbName = "uncaptcha";

        this.connect();
    }
      

    connect() {
        console.log('connecting to database ' + this.dbName + ' with URL ' + this.url);
        MongoClient.connect(this.url, (err, client) => {
            if (err) {
                reject(err)
            } else {
                database = client.db(this.dbName);
            console.log("Connected to the database!")
            }
        });
    }

    addActivity({ id, color = "rgb(88, 88, 191)", text }) {
        return new Promise(async (resolve, reject) => {
            let user = await this.findUser({ _id: ObjectId(id) });
            if (user) {
                database.collection("users").updateOne({ _id: ObjectId(user._id) }, { $push: {"activity": { text, color, time: new Date() }}}, function(err, res) {
                    if (err) reject(err);
                    console.log("Added activity");
                    resolve();
                });
            }
        });
    }

    addFollower({ type, username, id }) {
        const dis = this;
        return new Promise(async (resolve, reject) => {
            let user = await this.findUser({ username });
            if (user) {
                if (type === 1) {
                    if (user.followers.filter(e => String(e.id) == id).length == 0) {
                        database.collection("users").updateOne({ _id: ObjectId(user._id) }, { $push: {"followers": { id: ObjectId(id), date: new Date() }}}, function(err, res) {
                            if (err) reject(err);
                            console.log("Added to followers")
                            resolve();
                        });
                        database.collection("users").updateOne({ _id: ObjectId(id) }, { $push: {"following": { id: ObjectId(user._id), date: new Date() }}}, function(err, res) {
                            if (err) reject(err);
                            console.log("Added to following")
                            dis.addActivity({ id, color: "#0095ff", text: `has started following ${user.username}`})
                            resolve();
                        });
                    } else reject();
                } else {
                    if (type === 2) {
                        console.log("Unfollowed")
                        if (user.followers.filter(e => String(e.id) == id).length > 0) {
                            database.collection("users").updateOne({ _id: ObjectId(user._id) }, { $pull: {"followers": { id: ObjectId(id) }}}, function(err, res) {
                                if (err) reject(err);
                            });
                            database.collection("users").updateOne({ _id: ObjectId(id) }, { $pull: {"following": { id: ObjectId(user._id) }}}, function(err, res) {
                                if (err) reject(err);
                                dis.addActivity({ id, color: "#ed2f2f", text: `has unfollowed ${user.username}`})
                                resolve();
                            });
                        } else reject();
                    }
                }
            }
        });
    }

    addUser(data) {
        return new Promise(async (resolve, reject) => {
            const user = await this.findUser({ username: data.username });
            if (!user) {
                const password = bcrypt.hashSync(data.password, 10); 
                
                data.info = "A momentum mod server that is very good and this is just preset text from the database";
                data.password = password; 
                data.img = "https://source.unsplash.com/random/500x500";
                data.rank = "Rookie";
                data.joined = new Date();
                data.followers = []
                data.following = []
                data.feed = [{
                    title: "Test",
                    description: "Testing description lol xd 420",
                    timestamp: new Date(),
                    creator: data.username
                },
                {
                    title: "Lol 2nd test",
                    description: "Idk what to put here lol",
                    timestamp: new Date(),
                    creator: data.username
                }]
                data.activity = [
                    { text: "has joined", color: "#5858bf", time: new Date() },
                ]

                database.collection("users").insertOne(data, function(err, result) {
                    if (err) reject(err);
                    resolve(result);
                });

            } else reject({ error: "1000", msg: "Username already exists" });
        });
    }

    findUser(data) {
        return new Promise((resolve, reject) => {
            database.collection("users").findOne(data, function(err, result) {
                if (err) reject(err);
                resolve(result)
            });
        });
    }
}