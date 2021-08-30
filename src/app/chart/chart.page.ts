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
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements AfterViewInit {
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
  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    Chart.register(...registerables);
    // this.barChartMethod();
    this.lineChartMethod();
  }
// 바차트
  // barChartMethod() {
  //   const randomData1 = Math.floor(Math.random()*100)
  //   const randomData2 = Math.floor(Math.random()*100)
  //   const randomData3 = Math.floor(Math.random()*100)
  //   const randomData4 = Math.floor(Math.random()*100)
  //   const randomData5 = Math.floor(Math.random()*100)

    // dust value
    // const a = firebase.database().ref('/devices/'+"-MfeV091c-Z0nJK3h1-j"+'/sensors/dust');
    // a.on('value', function(snapshot) { 
    //   console.log(snapshot.val());
    // });

    // const testChartData = firebase.database().ref('/records/0884B6D108F0/gas');
    // testChartData.on('value', function(snapshot) { 
    //   var data = snapshot.val();

    //   var result = Object.keys(data).map((val) => data[val]['value']);
    //   console.log(result);
    // });

    // const chartConfig = {
    //   type: 'bar' as ChartType,
    //   data: {
    //     labels: ['dust', 'gas', 'voc', 'filter', 'temp', 'humidity'],
    //     datasets: [{
    //       label: 'Value',
    //       data: [randomData1,randomData2,randomData3,randomData4,randomData5, ],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   }
    // }
    // this.barChart = new Chart(this.barCanvas.nativeElement, chartConfig);

    // const datatest = chartConfig.data.datasets[0].data;
    // console.log(datatest);

    // this.barChart = new Chart(this.barCanvas.nativeElement, chartConfig);
    
    // settimeout 반복실행
    //   function dataLive() {
    //     console.log("timeout");
    //     firebase.database().ref('/devices/'+"-MfeV091c-Z0nJK3h1-j"+'/sensors').on('value', (val) => {
    //       console.log(val.val());  
    //     });

    //     datatest.push(Math.floor(Math.random()*100));
    //     datatest.shift();

    //     console.log(datatest);
    //  }

    //  setInterval(function() {
    //     dataLive();
    //  }, 3000);

  
    // setTimeout(function(){
    //   console.log('timeout');
    //   chartConfig.data.datasets[0].data.push(10012);
    //   console.log(chartConfig.data.datasets[0].data);
    //   // this.barChart.update();
    // }, 1000)
  // }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// 라인차트

  lineChartMethod() {
    console.log(this.deviceid);
    const gasChart = firebase.database().ref('/records/'+this.deviceid+'/gas').limitToLast(100);

    var result = [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15]
    var resultLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    var linechart = this.lineChart;
    var lineCanvas = this.lineCanvas;
    


    gasChart.once('value', function(snapshot) { 
      var data = snapshot.val();

      result = Object.keys(data).map((val) => data[val]['value']);
      resultLabel = Object.keys(data).map((val) => data[val]['datetime'].split(' ')[1]);
      console.log(result);
      console.log(resultLabel);
      linechart = new Chart(lineCanvas.nativeElement, {
        type: 'line',
        data: {          
          labels: resultLabel,
          datasets: [
            {
              label: 'Value',
              fill: false,
              tension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: result,
              // result.reverse() 결과값 시간 거꾸로
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
              text: 'Gas Sensor 변화'
            }
          }
        },
      });
    });

  }
//end
}