var http = require('http');
var wifiList;
var wifiUUID;

//Wifi 목록 가져오는 함수
function getListResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
      serverData += chunk;
    });
    response.on('end', function () {
      console.log("Wifi List:");
      parsedData = JSON.parse(serverData);
      console.log(parsedData.list);
      wifiList = parsedData.list;
    });
  }

//Wifi 목록 선택해서 세팅하는 함수
function setWifiResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
      serverData += chunk;
    });
    response.on('end', function () {
      console.log("wifi set result:");
      parsedData = JSON.parse(serverData);
      console.log(parsedData.result);
      console.log(parsedData.uuid);
      wifiUUID = parsedData.uuid;
    });
  }

//Wifi 리스트 가저오기
var getListOptions = {
    hostname: '192.168.4.1',
    path: '/list'
  }; 
http.request(getListOptions, function(response){
    getListResponse(response);
}).end();

//Wifi 셋팅하기
var wifiName = "SmartSwitch301";
var wifiPwd = "";

var setWifiOptions = {
    hostname: '192.168.4.1',
    path: '/setWifi'+"?name="+wifiName+"&pwd="+wifiPwd
  };
http.request(setWifiOptions, function(response){
    setWifiResponse(response);
}).end();