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
    // admin.database().ref('/devices/'+req.params.deviceid+'/sensors').on('value', (val) => {
    //     returnVal = val;
    //     res.send(returnVal);
    // })

    admin.database().ref('/devices').orderByChild("/deviceid").equalTo(req.params.deviceid).once('value').then((val) => {
        var key = Object.keys(val.val())[0];
        returnVal = val.val()[key].sensors;
        admin.database().ref('/user_device').orderByChild("/deviceid").equalTo(req.params.deviceid).once('value').then((userVal)=>{
            var register = Object.keys(userVal.val()).length;
            returnVal.register = register.toString();                
            res.send(returnVal);
        }).catch((error)=>{
            returnVal.register = "0";
            res.send(returnVal);
        });
        
    }).catch((error)=>{
        res.send("No entry!");
    });
});

//post로 센서값 업데이트하기
app.post('/:deviceid', (req, res) => {
    //log
    functions.logger.log(req.body);
    functions.logger.log(json);

    var jsonString = req.body.sensors;
    var json = JSON.parse(jsonString);

    var returnVal = {
        'status':'undefined'
    };

    admin.database().ref('/devices').orderByChild("/deviceid").equalTo(req.params.deviceid).once('value').then((val) => {
        var key = Object.keys(val.val())[0];
        var device = val.val()[key];
        admin.database().ref('/devices/'+key+'/sensors').update(json);

//`````````````````````````````````````````````````````실시간으로 records push ((set을 push로 바꿔야함))``````````````````````````````````````````````````````
        admin.database().ref('/records/'+req.params.deviceid+'/dust').push({
            value : json.dust,
            datetime : new Date().addHours(9).toLocaleString()
        });
        admin.database().ref('/records/'+req.params.deviceid+'/gas').push({
            value : json.gas,
            datetime : new Date().addHours(9).toLocaleString()
        });
        admin.database().ref('/records/'+req.params.deviceid+'/humidity').push({
            value : json.humidity,
            datetime : new Date().addHours(9).toLocaleString()
        });
        admin.database().ref('/records/'+req.params.deviceid+'/temperature').push({
            value : json.temperature,
            datetime : new Date().addHours(9).toLocaleString()
        });
        admin.database().ref('/records/'+req.params.deviceid+'/voc').push({
            value : json.voc,
            datetime : new Date().addHours(9).toLocaleString()
        });


        //필터 잔량 예측
        var wind = device.controls.wind;
        var filterStatus = device.filterStatus - (0.000011 * wind);
        functions.logger.log(filterStatus);
        if(filterStatus != NaN){
            admin.database().ref('/devices/'+key).update({
                filterStatus : filterStatus
            });
        }
        admin.database().ref('/records/'+req.params.deviceid+'/filterStatus').push({
            value : filterStatus,
            datetime : new Date().addHours(9).toLocaleString()
        });
//``````````````````````````````````````````````````````````실시간으로 records push END`````````````````````````````````````````````````````````````````````````````

        returnVal = {
            'deviceid' : key,
            'status':'OK',
            'value': json,
            'time': new Date().addHours(9),
            'message': "sensors value was upadted",
        }
        
        admin.database().ref('/devices/'+key+'/sensors').update({
            isConnected : admin.database.ServerValue.increment(1)
        });
        
        setTimeout(function(){
            admin.database().ref('/devices/'+key+'/sensors').update({
                isConnected : admin.database.ServerValue.increment(-1)
            });
        }, 1000 * 10);
        res.send(returnVal);

    }).catch((error) => {

        functions.logger.log(error);
        functions.logger.log(req.params.deviceid);

        var devices = admin.database().ref("/devices");
    
        //devices table : sensors, controls, deviceid 컬럼 push
        var newDevices={
            deviceid: req.params.deviceid,
            sensors: {
            dust : "0", gas : "0", voc : "0", temperature : "0", humidity : "0"
            },
            controls: {
            filter : "0", light : "1" , lock : "0" , mode : "1" , power : "0" , sound : "1" , timer : "0" , wind : "1"
            },
            filterStatus : 100
        };
        
        returnVal = {
            'deviceid' : newDevices.deviceid,
            'status':'OK',
            'value': json,
            'time': new Date().addHours(9),
            'message': "sensors value was added",
        } 
        
        // admin.database().ref('/devices/'+key+'/sensors').update({
        //     isConnected : admin.database.ServerValue.increment(1)
        // });
        
        // setTimeout(function(){
        //     admin.database().ref('/devices/'+key+'/sensors').update({
        //         isConnected : admin.database.ServerValue.increment(-1)
        //     });
        // }, 1000 * 10);

        functions.logger.log(newDevices);
        
        devices.push(newDevices);

        res.send(returnVal);
    });

    
    
    
});

app.put('/:id', (req, res) => res.send('put' + req.params.id));

app.delete('/:id', (req, res) => res.send('del' + req.params.id));

module.exports = app;
