// URL of the JSON data to be fetched
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetching data from the URL and storing the promise in dataPromise variable
let dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Initialize globaldata empty array
var globaldata = [];

//Fetches data and logs the data to the console and pushes data to globaldata
d3.json(url).then(function(data) {
  console.log(data);
  globaldata.push(data);
  createMenu(data.names);
});


//Function to populate table with sample number data
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    // Use d3 to select the panel with id of #sample-metadata
    let PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    for (key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
  });
}

// Function to create a dropdown menu using the names data
function createMenu(names){
    d3.select("#selDataset")
      .selectAll('option')
      .data(names)
      .enter()
      .append('option')
      .text(function (d) { return d; })
      .attr("value", function (d) { return d; });
}

// Function to handle changes when a new subject is selected from the dropdown
function changedSubjectId(subjectId){
    console.log(subjectId);
    updatePlotly(subjectId);
    buildMetadata(subjectId);
}

// This function is called when a dropdown menu item is selected
function updatePlotly(subjectId) {
    console.log(globaldata[0]);

    let samples = globaldata[0].samples;
    let sample = samples.filter(d => d.id === subjectId)[0];
    console.log(sample);

    let xdata = sample.otu_ids.slice(0,10);
    let xdata_otu = xdata.map(d => `OTU ${d}`);
    

    // Trace for the bar plot
    let trace = {
        y: xdata_otu,
        x: sample.sample_values.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    };

    let data = [trace];

    //Add a title
    let layout = {
        title: "Top 10 OTUs"
    };
   
    //Display the plot 
    Plotly.newPlot("bar", data, layout);

    // Bubble chart
    let bubbleTrace = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids
        }
    };

    let bubbleData = [bubbleTrace];

    //Add a title
    let bubbleLayout = {
        title: 'Sample Values and OTU IDs'
    };
    //Display the plot
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

}
