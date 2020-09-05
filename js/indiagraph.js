
// GRAPH

window.onload = function () {

    url = 'https://api.covid19india.org/data.json';
    
    var	datapoint1 = [];
    var	datapoint2 = [];
    var	datapoint3 = [];
    
    const fetchData = async(url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data ;
    }
    
    const updateData = (data) => {
    
    console.log(data);
    console.log(data.cases_time_series[200].totalconfirmed);
    
    for(var i=0;i < data.cases_time_series.length ;i++)
        {
            datapoint1.push({x:new Date(data.cases_time_series[i].date),y:parseInt(data.cases_time_series[i].totalconfirmed)});
            datapoint2.push({x:new Date(data.cases_time_series[i].date),y:parseInt(data.cases_time_series[i].totaldeceased)});
            datapoint3.push({x:new Date(data.cases_time_series[i].date),y:parseInt(data.cases_time_series[i].totalrecovered)});
        }
    console.log(datapoint1);
        
    var chart = new CanvasJS.Chart("chartcoontainer", {
        title: {
            text: "Covid Data"
        },
        theme: "dark2",
        axisX: {
            valueFormatString: "DD MMM"
        },
        axisY2: {
            title: "Cases",
            
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type:"line",
            axisYType: "secondary",
            name: "confirmed",
            showInLegend: true,
            markerSize: 0,//points located ka marker size that dot
            dataPoints: datapoint1
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "diseased",
            showInLegend: true,
            markerSize: 0,
            dataPoints: datapoint2
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "recovered",
            showInLegend: true,
            markerSize: 0,
            dataPoints: datapoint3
        }
        ]
    });
    chart.render();
    
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        chart.render();
    } 
    
    
    
    }
    
    
    
    fetchData(url)
        .then(data => {
          console.log(data.cases_time_series);
           updateData(data)
        })
        .catch(error => {
            console.log(error);
        });
    
    
        
    
    
    }

