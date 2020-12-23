## Plan Setup
- nodejs server
- package needle for twitter api
- implement socket.io

## Twitter API Docs
[Quick Start](https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start)

[Use Cases](https://developer.twitter.com/en/application/use-case)


# Steps 
```
npm init
npm i express socket.io needle dotenv
npm i -D node
```
(Needle - http client)
package.json
```
  "scripts": {
    "start": "node server/index.js",
    "dev"  : "nodemon server/index.js"
  },
```

 - Add a server folder , and index file
 - root location add .env
```
Bearer_Token
PORT
```

Added Packages to work with web:
```
http
path
express
socket.io
```