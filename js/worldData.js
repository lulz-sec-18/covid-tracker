const countryForm = document.getElementById("form1");
const details = document.getElementById("details1");


var countryDets = {};

const getCountry = async (country) => {
  const base = "https://disease.sh/v3/covid-19/countries/";
  const query = country;
  const response = await fetch(base + country);
  const data = await response.json();
  return data;
};

function colorInvert() {
  if ($("body").hasClass("dark-theme")) {
    return "dark2";
  } else {
    return "light2";
  }
}
// GRAPH
if ($(".btn-toggle").hasClass("dark-theme")) {
  bgc = "#00BFD8";
  fc = "#00BFD8";
} else {
  bgc = "#00BFD8";
  fc = "#00BFD8";
}

//number wuth commas and font-sizing

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function checkSize(x) {
  if (x > 999999) return "2.2rem";
  else return "2.5rem";
}

const updateUI = (data) => {
  var countryDets = data.countryDets;

  details.innerHTML = `
    <div class="row">
    <div class="col-lg-12">
        
    <hr class="title-divider"><h2>${countryDets.country.toUpperCase()}</h2> <hr class="title-divider">
        
    </div> 
</div> 
<div class="row">
    <div class="col-lg-12">

        <!-- Card-->
        <div class="card">
            <div class="card-body">
                <div class="card-title">CASES</div>
                
                <hr class="cell-divide-hr">
                <div class="numbers">
                    <span class="value" style="font-size:${checkSize(
                      countryDets.cases
                    )};">${numberWithCommas(countryDets.cases)}</span>
                    
                </div>
                <hr class="cell-divide-hr">
                
                
            </div>
        </div> <!-- end of card -->
        <!-- end of card -->

       <!-- Card-->
       <div class="card">
        <div class="card-body">
            <div class="card-title">ACTIVE</div>
            
            <hr class="cell-divide-hr">
            <div class="numbers">
                <span class="value"  style="font-size:${checkSize(
                  countryDets.active
                )};">${numberWithCommas(countryDets.active)}</span>
                
            </div>
            <hr class="cell-divide-hr">
            
            
        </div>
    </div> <!-- end of card -->
    <!-- end of card -->

       <!-- Card-->
       <div class="card">
        <div class="card-body">
            <div class="card-title">RECOVERED</div>
            
            <hr class="cell-divide-hr">
            <div class="numbers">
                <span class="value" style="font-size:${checkSize(
                  countryDets.recovered
                )};">${numberWithCommas(countryDets.recovered)}</span>
                
            </div>
            <hr class="cell-divide-hr">
            
            
        </div>
    </div> <!-- end of card -->
    <!-- end of card -->
    <!-- Card-->
    <div class="card">
        <div class="card-body">
            <div class="card-title">DEATHS</div>
            
            <hr class="cell-divide-hr">
            <div class="numbers">
                <span class="value" style="font-size:${checkSize(
                  countryDets.deaths
                )};">${numberWithCommas(countryDets.deaths)}</span>
                
            </div>
            <hr class="cell-divide-hr">
            
            
        </div>
    </div> <!-- end of card -->
    <!-- end of card -->
    <!-- Card-->
    <div class="card">
        <div class="card-body">
            <div class="card-title">TODAY+</div>
            
            <hr class="cell-divide-hr">
            <div class="numbers">
                <span class="value" style="font-size:${checkSize(
                  countryDets.todayCases
                )};">${numberWithCommas(countryDets.todayCases)}</span>
                
            </div>
            <hr class="cell-divide-hr">
            
            
        </div>
    </div> <!-- end of card -->
    <!-- end of card -->


    </div> <!-- end of col -->
</div> <!-- end of row -->
<hr class="title-divider"><h3 style="text-align:center;">WORLD COVID GRAPH</h3><hr class="title-divider">
    <div class="world-graph">
        <div id="chartContainer"></div>
    </div>
`;
  var bgc;
  var fc;
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Country Wise Census",
      fontColor: fc,
    },
    backgroundColor: bgc,

    axisX: {
      interval: 1,
    },
    axisY: {
      title: "Cases",
      includeZero: true,
    },
    data: [
      {
        type: "column",
        toolTipContent: "<b>{label}</b><br>{y}",
        dataPoints: [
          { label: "Cases", y: countryDets.cases },
          { label: "Active", y: countryDets.active },
          { label: "Recovered", y: countryDets.recovered },
          { label: "Deaths", y: countryDets.deaths },
          { label: "Today", y: countryDets.todayCases },
        ],
      },
    ],
  });
  chart.render();
};

const updateCountry = async (country) => {
  const countryDets = await getCountry(country);
  return { countryDets };
};

// execution starts from here
countryForm.addEventListener("submit", (e) => {
  console.clear();
  e.preventDefault(); //to prevent default action of reloading of page
  //get country value
  const country = countryForm.country.value.trim();
  
  countryForm.reset();
  //update the UI with new country
  updateCountry(country)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});


// remember to add this placeholder afterwards

/* <img src="${countryDets.countryInfo.flag}" class="time card-img-top"> */
