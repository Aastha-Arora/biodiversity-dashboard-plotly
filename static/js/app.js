let data;

function buildDefaultBar() {
    /* Creating default bar chart (sample id: 940 at index: 0)
     to display top 10 OTUs found in that individual */
    let sample_values = data.samples[0].sample_values.slice(0,10);
    let otu_ids_numbers = data.samples[0].otu_ids.slice(0,10);
    let otu_ids = otu_ids_numbers.map(id => "OTU " + id)
    let otu_labels = data.samples[0].otu_labels.slice(0,10);
    
    let barTrace = {
        x: sample_values.reverse(),
        y: otu_ids.reverse(),
        text: otu_labels.reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: "sandybrown",
        }, 
    };

    let barLayout = {
        title: "Top 10 microbial species (OTUs)",
    };

    Plotly.newPlot("bar",[barTrace], barLayout);

    const displayMetadata = d3.select("#sample-metadata");

    // Displaying the metadata for sample 0 (subject id: 940)
    Object.entries(data.metadata[0]).forEach(([key,value]) => {
        displayMetadata.append("h6")
        .text(`${key.toUpperCase()}: ${value}`)
    });
}

function buildDefaultBubble() {
    // Creating a bubble chart to display each OTU sample 
    let bubbleTrace = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        text: data.samples[0].otu_labels,
        type: "scatter",
        mode: "markers",
        marker: {
            size: (data.samples[0].sample_values),
            sizeref: 1.5,
            color: data.samples[0].otu_ids,
            colorscale: 'Portland',
        }
    };

    let bubbleLayout = {
        title: `Microbial Species Cultures for ID: ${data.names[0]}`,
        xaxis: {
            title: "OTU ID"
        },
        hovermode: "closest"
    };

    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
}


function subjectIdChange() {
    const dropdownMenu = d3.select("#selDataset");
    let id = dropdownMenu.property("value");
    let index = data.names.indexOf(id);
    // console.log(`Displaying results for Subject ID: ${id} at index ${index}`)

    buildBar(index);
    buildBubble(index);
    buildGauge(index);
}


function buildBar(index) {
    // Updating the bar chart
    let sample_values = data.samples[index].sample_values.slice(0,10);
    let otu_ids_numbers = data.samples[index].otu_ids.slice(0,10);
    let otu_ids = otu_ids_numbers.map(id => "OTU " + id);
    let otu_labels = data.samples[index].otu_labels.slice(0,10);

    let update = {
        x: [sample_values.reverse()],
        y: [otu_ids.reverse()],
        text: [otu_labels.reverse()]
    };

    Plotly.restyle("bar", update)

    const displayMetadata = d3.select("#sample-metadata");

    // Updating the sample metadata i.e., an individual's demographic information
    d3.select("#sample-metadata").html("");
    Object.entries(data.metadata[index]).forEach(([key,value]) => {
        displayMetadata.append("h6")
        .text(`${key.toUpperCase()}: ${value}`)
    });
}

function buildBubble(index) {
    // Updating the bubble chart
    let updateTrace = {
        x: [data.samples[index].otu_ids],
        y: [data.samples[index].sample_values],
        text: [data.samples[index].otu_labels],
        'marker.size': [data.samples[index].sample_values],
        'marker.color': [data.samples[index].otu_ids]
    }
    
    let updateLayout = {
        title: `Microbial Species Cultures for ID: ${data.names[index]}`
    }

    Plotly.restyle("bubble", updateTrace);
    Plotly.relayout("bubble", updateLayout);
}

function init() {
    d3.json('data/samples.json').then(function(allData){
        // Storing allData in the global variable data
        data = allData;
        
        // Creating dropdown options to display all subject ids
        const dropdownMenu = d3.select("#selDataset");
        let subjectId = allData.names;

        subjectId.forEach(id => {
            dropdownMenu.append("option").text(id)
        });
        
        buildDefaultBar();
        buildDefaultBubble();
        buildDefaultGauge();
    });  
}

init();
d3.select("#selDataset").on("change", subjectIdChange);