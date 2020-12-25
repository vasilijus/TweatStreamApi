class Tweet {
    constructor(id, auth_id, text, username) {
        this.id = id;               // int
        this.author_id = auth_id;   // int
        this.username = username;   // str
        this.text = text;           // str
    }
}

module.exports = Tweet;