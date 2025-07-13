## **Steps to run the project**
___
Install volta to auto use correct node and npm version.
https://docs.volta.sh/guide/
actual version check in `package.json` under `volta` object.

Install PM2 to run project

1. ```npm install``` and copy .env.example ```cp .env.example .env```
2. Start serwer by ```node server.js ```
3. Start client by ```node --env-file=.env client.js```
