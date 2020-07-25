## Interactive visualizations and dashboard using Plotly
Link to the dashboard:
https://aastha-arora.github.io/plotly-dashboard/

### Dataset
[Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/)

The dataset catalogs the microbes that colonize human navels. It was found that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Objective
Build an interactive dashboard to explore the dataset.

The webpage provides a dropdown menu to select a particular test subject ID and the results displayed on the the page are
filtered according to the subject ID selected. An individual's demographic information is also displayed on the page.

**Bar Chart:**
Horizontal bar chart displays the top 10 OTUs found in that individual.
* `sample_values` are displayed as as the values for the bar chart
* `otu_ids` are the labels for the bar chart
* `otu_labels` are displayed as the hovertext for the chart

**Bubble Chart:**
Bubble Chart displays each sample for the selected subject ID using the dropdown menu.
* `otu_ids` are used for the x values
* `sample_values` are used for the y values
* `sample_values` are used for the marker size
* `otu_ids` are used for the marker colors
* `otu_labels` are used for the text values

**Gauge Chart:**
Gauge Chart is used to plot the weekly washing frequency of the individual.

![](https://github.com/Aastha-Arora/plotly-dashboard/blob/master/dashboard%20snapshot.png)
