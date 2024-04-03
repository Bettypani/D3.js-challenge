const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Promise pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

var globaldata = [];

d3.json(url).then(function(x) {
    console.log(x);
    globaldata.push(x);
    create_menu(x.names);
});

function create_menu(names){
d3.select("select")
  .selectAll('option')
	.data(names).enter()
	.append('option')
		.text(function (d) { return d; })
        .attr("value", function (d) { return d; });
}

function changedSubjectId(subjectId){
    console.log(subjectId)
    updatePlotly(subjectId)
};

// Initializes the page with a default plot
function init() {
    let data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
  }

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly(subjectId) {

    console.log(globaldata[0])
   

    samples = globaldata[0].samples;

    sample = samples.filter(d => d.id == subjectId);

    console.log(sample);

    let xdata = sample[0].otu_ids.slice(0,10);
    xdata_otu = xdata.map(d => `OTU ${d}`);

    //Trace for plot
    let trace = {
        y: xdata_otu,
        x: sample[0].sample_values.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
    };

  //Data trace array
  let data = [trace];

  //Apply layout
  let layout = {
    title: "Top 10 OTUs"
  };
   //Render the plot
   Plotly.newPlot("bar", data, layout);
  };
  
  init();

