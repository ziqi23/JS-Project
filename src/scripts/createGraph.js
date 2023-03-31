class CreateGraph {

    createEciGraph(dataset, startYear, endYear) {
        console.log(dataset)
        // Currently assumes data in [[key, value], ...] format
    
        let margin = {left: 50, bottom: 50, top: 50, right: 50} // Define margins
        let svgWidth = 1000, svgHeight = 500 // Define container size
        let width = svgWidth - margin.left - margin.right; // Define inner container size
        let height = svgHeight - margin.bottom - margin.right; // Define inner container size
        let eachWidth = (width / dataset.length) // Define space between each data point
    
        let svg = d3.select("#eci-graph") // Set HTML element to container size
            .attr("width", svgWidth)
            .attr("height", svgHeight)
    
        let xScale = d3.scaleTime() // Define x axis scaling to fill container area
            .domain([new Date(`${startYear}-03-31`), new Date(`${endYear}-12-31`)])
            .range([0, width])
            // .domain([0, 95])
            // .range([0, width])
    
        let yScale = d3.scaleLinear() // Define y axis scaling to fill container area
            .domain([0, 2])
            .range([height, 0])
        
        let xAxis = d3.axisBottom() // Create x axis and define number of ticks
            .scale(xScale)
            .ticks(8)
    
        let yAxis = d3.axisLeft() // Create y axis and define number of ticks
            .scale(yScale)
    
        let cpiChart = svg.selectAll("circle") // Plot data points
            .data(dataset) // Import dataset
            .enter() // For each data element
            .append("circle") // Append to the SVG a circle element
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`) // Account for padding
            .attr("cx", (data, index) => eachWidth * index) // x coordinate
            .attr("cy", data => yScale(data.value)) // y coordinate
            .attr("r", 1) // radius
            .attr("stroke", "black");
    
        svg.append("g") // Append y Axis
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(yAxis);
    
        svg.append("g") // Append x Axis
            .attr("transform", `translate(${margin.left}, ${svgHeight - margin.bottom})`)
            .call(xAxis);
    }
}

module.exports = CreateGraph;