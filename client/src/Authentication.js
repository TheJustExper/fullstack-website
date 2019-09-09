class Authentication {
    constructor() {
        this.authCodeUrl  = "http://localhost:8080/v1/code";
        this.authTokenUrl = "http://localhost:8080/v1/token";
        this.loginUrl     = "http://localhost:8080/v1/login";
        this.registerUrl  = "http://localhost:8080/v1/register";
        this.activityUrl  = "http://localhost:8080/v1/activity";
        this.profileUrl   = "http://localhost:8080/v1/profile?username=";
    }

    reloadAccountData() {
        const dis = this;
        return new Promise((resolve, reject) => {
            fetch(this.profileUrl + JSON.parse(this.getAccountData()).username).then(function (response) {
                return response.json();
            }).then(function ({ account }) {
                if (account) {
                    dis.setAccountData(JSON.stringify(account));
                    resolve();
                } else reject();
            });
        });
    }

    follow(type, { username }) {
        return new Promise((resolve, reject) => {
            fetch(this.activityUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({
                    type,
                    username
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.error) reject(data);
                else resolve();
            });
        });
    }

    authCode(code) {
        return new Promise((resolve, reject) => {
            fetch(this.authCodeUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({code})
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.error) reject(data);
                else resolve();
            });
        });
    }

    authToken() {
        const dis = this;
        return new Promise((resolve, reject) => {
            if (this.getToken() != null) {
                fetch(this.authTokenUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    },
                    body: JSON.stringify({})
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.name) reject(data)
                    else resolve();
                });
            }
        });
    }

    login(username, password) {
        const dis = this;
        return new Promise((resolve, reject) => {
            fetch(this.loginUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.error) reject(data);
                else {
                    resolve();
                    dis.setToken(data.token);
                    dis.setAccountData(JSON.stringify(data.data));
                }
            });
        });
    }

    register(username, password) {
        fetch(this.registerUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
           alert(data);
        });
    }

    setToken(token) {
        localStorage.setItem("bearer-token", token);
    }

    getToken() {
        return localStorage.getItem("bearer-token");
    }

    setAccountData(data) {
        localStorage.setItem("account-data", data);
    }

    getAccountData() {
        return localStorage.getItem("account-data");
    }

    isLoggedIn() {
        return this.getToken() != null;
    }

    logout() {
        localStorage.removeItem("bearer-token");
        localStorage.removeItem("account-data");
    }
}

export default new Authentication;