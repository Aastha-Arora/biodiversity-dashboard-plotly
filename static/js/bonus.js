function buildGauge(index) {
    // Updating the gauge chart
    Plotly.restyle("gauge", "value", [data.metadata[index].wfreq]);
}

function buildDefaultGauge() {
    // Displaying the washing freq for sample 0 (subject id: 940)
    let gaugeTrace = {
        value: data.metadata[0].wfreq,
        title: {
            text: "Scrubs per Week",
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "rgba(12, 51, 131, .5)" },
              { range: [1, 2], color: "rgba(12, 51, 131, .7)" },
              { range: [2, 3], color: "rgba(10, 136, 186, .9)" },
              { range: [3, 4], color: "rgba(0, 155,158, .8)" },
              { range: [4, 5], color: "rgba(242, 211, 56, .8)" },
              { range: [5, 6], color: "rgba(242, 143, 56, .5)" },
              { range: [6, 7], color: "rgba(217, 30, 30, .2)" },
              { range: [7, 8], color: "rgba(217, 30, 30, .5)" },
              { range: [8, 9], color: "rgba(217, 30, 30, .8)" },
            ],
            bar: {color: "black"},
            bordercolor: "limegreen",

        },
    };

    let gaugeLayout = {
        title: "Belly Button Washing Frequency",
    }

    Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);
}