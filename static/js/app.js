//URL of the json data to the fetched
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Fetching data from the URL and storing the promise in dataPromise variable
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Initialize globaldata empty array
var globaldata = [];

//Making an API call and append data onto globaldata variable
d3.json(url).then(function(x) {
    console.log(x);
    globaldata.push(x);
    create_menu(x.names);
});

//Function to create a dropdown menu using the names data
function create_menu(names){
d3.select("select")
  .selectAll('option')
	.data(names).enter()
	.append('option')
		.text(function (d) { return d; })
        .attr("value", function (d) { return d; });
}

//Function to handle changes when a new subject is selected from the dropdown
function changedSubjectId(subjectId){
    console.log(subjectId)
    updatePlotly(subjectId)
};


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly(subjectId) {

    console.log(globaldata[0]);
   

  let  samples = globaldata[0].samples;

  let  sample = samples.filter(d => d.id == subjectId);

    console.log(sample);

    let xdata = sample[0].otu_ids.slice(0,10);
    let xdata_otu = xdata.map(d => `OTU ${d}`);

    //Trace for plot
    let trace = {
        y: xdata_otu,
        x: sample[0].sample_values.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    };

  //Data trace array
  let data = [trace];

  //Apply layout
  let layout = {
    title: "Top 10 OTUs"
  };
   //Render the plot
   Plotly.newPlot("bar", data, layout);
  

 // Bubble chart
   let bubbleTrace = {
    x: sample[0].otu_ids,
    y: sample[0].sample_values,
    text: sample[0].otu_labels,
    mode: 'markers',
    marker: {
        size: sample[0].sample_values,
        color: sample[0].otu_ids
    }
};

let bubbleData = [bubbleTrace];

let bubbleLayout = {
    title: 'Sample Values and OTU IDs',
    height: 600,
    width: 800
};

Plotly.newPlot("bubble", bubbleData, bubbleLayout);


init();

};
