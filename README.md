# D3.js-challenge

Belly Button Biodiversity Dashboard
Welcome to the Belly Button Biodiversity Dashboard! This interactive dashboard allows you to explore the microbial species (OTUs) present in human navels. The dataset used for this dashboard catalogs the microbes found in various individuals' navels, revealing both common and rare species.

Before You Begin
Before getting started, make sure to follow these initial steps:

Clone the Repository: Clone the provided repository to your computer.
Push Changes to GitHub: Push any changes made to the repository to your GitHub account.
Deploy Repository to GitHub Pages: Deploy the repository to GitHub Pages to make the dashboard accessible online.
Instructions
To complete this assignment, follow the steps outlined below:

Data Retrieval: Use the D3 library to read the dataset from samples.json.
Horizontal Bar Chart: Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in each individual. Use sample_values as the values for the bars, otu_ids as the labels, and otu_labels as the hovertext.
Bubble Chart: Create a bubble chart displaying each sample. Use otu_ids for the x values, sample_values for the y values and marker size, otu_ids for the marker colors, and otu_labels for the text values.
Display Metadata: Display the demographic information for each individual by showing each key-value pair from the metadata JSON object somewhere on the page.
Update Plots: Ensure that all plots update dynamically when a new sample is selected.
Custom Layout: Feel free to create a layout for your dashboard according to your preferences.
Deployment
Deploy your app to a free static page hosting service, such as GitHub Pages, to make it accessible online.
