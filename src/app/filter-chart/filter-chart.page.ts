import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';

import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import { Router, ActivatedRoute } from '@angular/router';
//로그인기능
import { AngularFireAuth } from '@angular/fire/auth';


// import { clearTimeout, setTimeout } from 'timers';
@Component({
  selector: 'app-filter-chart',
  templateUrl: './filter-chart.page.html',
  styleUrls: ['./filter-chart.page.scss'],
})
export class FilterChartPage implements AfterViewInit {
  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  // barChart: any=[];
  lineChart: any=[];
  data = [];
  deviceid: any;


  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.deviceid = this.route.snapshot.paramMap.get('deviceId');
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.lineChartMethod();
  }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// 라인차트
lineChartMethod() {
  var predictionStep = 2; //seconds
  var predictionDuration = 1; //hours, 24 is 1 day

  const filterChart = firebase.database().ref('/records/'+this.deviceid+'/filterStatus').limitToLast(3600 * predictionDuration);

  var result = [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15]
  var resultLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  var linechart = this.lineChart;
  var lineCanvas = this.lineCanvas;
  
  var randomfilter = [];

  filterChart.once('value', function(snapshot) { 
    var data = snapshot.val();
    var len = Object.keys(data).length;
    result = Object.keys(data).map((val) => data[val]['value']);
    //randomfilter = Object.keys(data).map((val) => data[val]['value']-(Math.random()*0.00011)).slice(len/2, len);
    resultLabel = Object.keys(data).map((val) => data[val]['datetime'].split(' ')[1]);
    var currentTime = Date.now();
    var filterVal = result[result.length-1];
    
    for(var i = 0 ; i < 3600 / predictionStep * predictionDuration; i++){
      filterVal -= (Math.random()*0.000011 * 2.5);
      randomfilter.push(filterVal);
      var currentTimeString = new Date(currentTime).toLocaleString().split(' ')[4];
      resultLabel.push(currentTimeString);
      
      currentTime+= predictionStep * 1000;
    }
    console.log("randomFilter : " + randomfilter);
    randomfilter = result.concat(randomfilter);
    console.log("current time : ");
    console.log(result);
    console.log(resultLabel);
    linechart = new Chart(lineCanvas.nativeElement, {
      type: 'line',
      data: {          
        labels: resultLabel,
        datasets: [
          {
            label: 'Now',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [0,0],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
            data: result,
            spanGaps: false,
          },
          {
            label: 'Prediction',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [1,1],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
            data: randomfilter,
            spanGaps: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'filter Sensor 잔여량'
          }
        }
      },
    });
  });

}
//end
}


