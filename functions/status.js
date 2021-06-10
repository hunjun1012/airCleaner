const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

// const admin = require('firebase-admin');
// admin.initializeApp();


app.use(cors({ origin: true }));

app.get('/:id', (req, res) => res.send('statusget' + req.params.id));
app.post('/', (req, res) => res.send('post'));
app.put('/:id', (req, res) => res.send('put' + req.params.id));
app.delete('/:id', (req, res) => res.send('del' + req.params.id));
app.get('/', (req, res) => res.send('statusget *'));

module.exports = app;