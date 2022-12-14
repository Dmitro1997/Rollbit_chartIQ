import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
function TradingChartDemo() {
  var lastDate = 0;
  var data = [];
  var TICKINTERVAL = 86400000
  let XAXISRANGE = 777600000
  const [series, setSeries] = useState([{
                                          name: "Desktops",
                                          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                                        }]);
  const [options, setOptions] = useState({
                                          chart: {
                                            id:'realtime',
                                            height: 350,
                                            type: 'line',
                                            animations: {
                                              enabled: true,
                                              easing: 'linear',
                                              dynamicAnimation: {
                                                speed: 1000
                                              }
                                            },
                                            toolbar: {
                                              show: false
                                            },
                                            zoom: {
                                              enabled: false
                                            }
                                          },
                                          dataLabels: {
                                            enabled: false
                                          },
                                          stroke: {
                                            curve: 'smooth'
                                          },
                                          title: {
                                            text: 'Coin',
                                            align: 'left'
                                          },
                                          markers: {
                                            size: 0
                                          },
                                          xaxis: {
                                            type: 'datetime',
                                            range: XAXISRANGE,
                                          },
                                          yaxis: {
                                            max: 100
                                          },
                                          legend: {
                                            show: false
                                          },
                                          // grid: {
                                          //   row: {
                                          //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                          //     opacity: 0.5
                                          //   },
                                          // },
                                          // xaxis: {
                                          //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                                          // }
                                        }
                                      );

      

      const getDayWiseTimeSeries = (baseval, count, yrange) => {
        var i = 0;
        while (i < count) {
          var x = baseval;
          var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
          data.push({
            x, y
          });
          lastDate = baseval
          baseval += TICKINTERVAL;
          i++;
        }
      }

      getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 90
      })

      const getNewSeries = (baseval, yrange) => {
        var newDate = baseval + TICKINTERVAL;
        lastDate = newDate
      
        for(var i = 0; i< data.length - 10; i++) {
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          data[i].x = newDate - XAXISRANGE - TICKINTERVAL
          data[i].y = 0
        }
      
        data.push({
          x: newDate,
          y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        })
      }

      const resetData = () => {
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
        data = data.slice(data.length - 10, data.length);
      }



    useEffect(() => {
      window.setInterval(() => {
          getNewSeries(lastDate, {
            min: 10,
            max: 90
          })
          ApexCharts.exec('realtime', 'updateSeries', [{
            data: data
          }])
        }, 1000)

    }, []);  
    

    return (
        <>
            <ReactApexChart options={options} series={series} type='line' height={350}></ReactApexChart>
        </>
    );
}
  
export default TradingChartDemo;