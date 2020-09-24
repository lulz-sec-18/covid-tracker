function colorInvert() {
  if ($(".btn-toggle").hasClass("dark-theme")) {
    return "#ffffff";
  } else {
    return "#000";
  }
}
// GRAPH
if ($(".btn-toggle").hasClass("dark-theme")) {
  bgc = "#121212";
  fc = "#ffffff";
} else {
  bgc = "#fffff";
  fc = "#000000";
}

window.onload = function () {
  var bgc;
  var fc;

  url = "https://api.covid19india.org/data.json";

  var datapoint1 = [];
  var datapoint2 = [];
  var datapoint3 = [];
  var datapoint4 = [];

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const updateData = (data) => {
    console.log(data);
    console.log(data.cases_time_series[200].totalconfirmed);

    for (var i = 0; i < data.cases_time_series.length; i++) {
      datapoint1.push({
        x: new Date(data.cases_time_series[i].date),
        y: parseInt(data.cases_time_series[i].totalconfirmed),
      });
      datapoint2.push({
        x: new Date(data.cases_time_series[i].date),
        y: parseInt(data.cases_time_series[i].totaldeceased),
      });
      datapoint3.push({
        x: new Date(data.cases_time_series[i].date),
        y: parseInt(data.cases_time_series[i].totalrecovered),
      });
      //Active Cases
      datapoint4.push({
        x: new Date(data.cases_time_series[i].date),
        y: parseInt(
          parseInt(data.cases_time_series[i].totalconfirmed) -
            parseInt(data.cases_time_series[i].totalrecovered) -
            parseInt(data.cases_time_series[i].totaldeceased)
        ),
      });
    }
    console.log(datapoint1);
    console.log(datapoint4);

    var chart = new CanvasJS.Chart("chartcoontainer", {
      title: {
        text: "Covid Data",
        fontColor: fc,
      },
      backgroundColor: bgc,

      axisX: {
        valueFormatString: "DD MMM",
        labelFontColor: "#00bfd8",
      },
      axisY2: {
        title: "Cases",
        labelFontColor: "#00bfd8",
        titleFontColor: colorInvert(),
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries,
      },
      data: [
        {
          type: "line",
          axisYType: "secondary",
          name: "confirmed",
          showInLegend: true,
          markerSize: 0, //points located ka marker size that dot
          dataPoints: datapoint1,
          lineThickness: 3,
        },
        {
          type: "line",
          axisYType: "secondary",
          name: "diseased",
          showInLegend: true,
          markerSize: 0,
          dataPoints: datapoint2,
        },
        {
          type: "line",
          axisYType: "secondary",
          name: "recovered",
          showInLegend: true,
          markerSize: 0,
          dataPoints: datapoint3,
        },
        //Active Cases
        {
          type: "line",
          axisYType: "secondary",
          name: "active",
          showInLegend: true,
          markerSize: 0,
          dataPoints: datapoint4,
          color: "#00bfd8",
        },
      ],
    });
    chart.render();

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  };

  fetchData(url)
    .then((data) => {
      console.log(data.cases_time_series);
      updateData(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
