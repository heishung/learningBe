const express = require('express')
const routerAccount = require("./router/accountRouter");
const app = express()
const port = 4000

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get('/page', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use('/api/account/', routerAccount);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} hello `)
})

module.exports = app;
