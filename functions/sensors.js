const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

const admin = require('firebase-admin');

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

app.use(cors({ origin: true }));

//get으로 센서값 목록 가져오기
app.get('/:deviceid', (req, res) => {
    //firebase 안에있는 sensors 테이블 벨류값 가져오기
    admin.database().ref('/devices/'+req.params.deviceid+'/sensors').on('value', (val) => {
        returnVal = val;
        res.send(returnVal);
    })
});

//post로 센서값 업데이트하기
app.post('/:deviceid', (req, res) => {
    functions.logger.log(req.body);
    var jsonString = req.body.sensors;
    var json = JSON.parse(jsonString);
    functions.logger.log(json);

    admin.database().ref('/devices/'+req.params.deviceid+'/sensors').update(json);
    returnVal = {
        'status':'OK',
        'value': json,
        'time': new Date().addHours(9),
        'message': "sensors value was setted",
    }
    res.send(returnVal);
});

app.put('/:id', (req, res) => res.send('put' + req.params.id));

app.delete('/:id', (req, res) => res.send('del' + req.params.id));

module.exports = app;
