const functions = require('firebase-functions');

//exports.sensor = functions.https.onRequest((request, response) => {
//    functions.logger.info("Hello logs!", { structuredData: true });
//    response.send("Sensor test");
//});

//exports.click = functions.https.onRequest((request, response) => {
//    functions.logger.info("Hello logs!", { structuredData: true });
//    response.send("Click test");
//});
//----------------------------------------------------------------------------------------------------//

const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send('get' + req.params.id));
app.post('/', (req, res) => res.send('post'));  
app.put('/:id', (req, res) => res.send('put' + req.params.id));
app.delete('/:id', (req, res) => res.send('del' + req.params.id));
app.get('/', (req, res) => res.send('get *'));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
exports.sensors = functions.https.onRequest(require('./sensors'));
exports.controls = functions.https.onRequest(require('./controls'));
exports.status = functions.https.onRequest(require('./status'));

/* exports.scheduledFunction = functions.pubsub.schedule('every 10 seconds').onRun((context) => {
    console.log('This will be run every 10 seconds');
    return null;
}); */