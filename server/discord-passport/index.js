const fetch = require("node-fetch");

const ENDPOINT = 'https://discordapp.com/api/v6/oauth2/token';
const CLIENT_ID = '594151696154755073';
const CLIENT_SECRET = '9de--Uipyw30XRJAcW3SBxfGN0Blhptk';
const REDIRECT_URI = 'http://localhost:3000';

function getToken(code) {
    const data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'scope': ''
    };

    fetch(ENDPOINT, {
        method: 'POST',
        body:    JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log(json));
}

getToken("hCQA9pVguJMxpmH5fFdvaRzg962B9d");