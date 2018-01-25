const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
let stringifyFile;


app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony głównej');
    res.send('Hello GET!');
});

app.get('/getNote', function(req, res) {
    console.log('Wyświetlanie JSON');
    fs.readFile('./test.json', 'utf8',function (err, data) {
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
});

app.get('/:id', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony głównej');
    res.send('Identyfikator, który został dopisany to ' + req.params.id);
});

app.get('/list_user', function (req, res) {
    console.log('Otrzymałem żądanie GET do strony /list_user');
    res.send('Strona z listą użytkowników!');
});

app.get('/ab*cd', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /ab*cd');
    res.send('Wzór pasuje');
});

app.post('/', function (req, res) {
    console.log('Otrzymałem żądanie POST do strony głównej');
    res.send('Hello POST!');
});

app.post('/updateNote/:note', function (req, res) {
    console.log('JSON update');
    fs.readFile('./test.json', 'utf8',function (err, data) {
        if (err) throw err;        
        let obj = [];
        obj = JSON.parse(data);
        console.log(Array.isArray(obj));
        let id = 'note_' + new Date().getTime().toString();
        obj.notes[id] = req.params.note;
        stringifyFile = JSON.stringify(obj); 
        fs.writeFile('./test.json', stringifyFile, function(err) {
            if (err) throw err;
            console.log('file updated');
        });
    });
    res.send('Your JSON File was updated!');
});

app.delete('/del_user', function (req, res) {
    console.log('Otrzymałem żądanie DELETE do strony /del_user');
    res.send('Hello DELETE!');
});

app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});