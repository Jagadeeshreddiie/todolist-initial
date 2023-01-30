const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js")

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const items = ['buy food', 'cook food', 'eat food'];
const newitems = [];

// Main root for main page

app.get('/', function (req, res) {
    const day = date.getDate();
    res.render('list', { listhead: day, listitem: items });
});
app.post('/', function (req, res) {
    var item = req.body.item;
    if (item != ''){
        if (req.body.button === 'New List') {
            newitems.push(item);
            res.redirect('/work');
        }
        else {
            items.push(item);
            res.redirect('/');
        }
    }
    else if (req.body.button === 'New List'){
        res.redirect('/work');
    }
    else{
        res.redirect('/');
    }
});

// workList page route

app.get('/work', function (req, res) {
    res.render('list', { listhead: 'New List', listitem: newitems });
});

// about section route

app.get('/about', function (req, res) {
    res.render('about');
});
app.listen(3000, function () {
    console.log("server started at 3000..")
});