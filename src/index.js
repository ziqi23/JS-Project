//Object oriented programming - constructor for each HTML element

const el = document.getElementById("svg-graph");

let data;

async function fetchData() {
    data = await fetch("https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=2015-02-28&end_date=2023-02-28&api_key=z4ZhwWk_L5Tp-MszdTFD")
    .then(async function (response) {
        data = await response.json();
        // console.log(data.dataset.data);
        createGraph(data.dataset.data.reverse());
        // data.dataset.data.forEach((date) => {
        //     let newEle = document.createElement("div");
        //     newEle.innerHTML = date;
        //     el.appendChild(newEle);
        // })
        // console.log(newEle);
    })
    return data
}

fetchData();
// console.log(dataset);
// createGraph(dataset)

function createGraph(dataset) {
    // Currently assumes data in [[key, value], ...] format
    let margin = {left: 50, bottom: 50}
    let svgWidth = 1000, svgHeight = 500
    let width = svgWidth - margin.left;
    let height = svgHeight - margin.bottom;
    let barWidth = (svgWidth / dataset.length) // May need to update

    let svg = d3.select("#svg-graph")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    let xScale = d3.scaleLinear()
        .domain([0, 95])
        .range([0, width])

    let yScale = d3.scaleLinear()
        .domain([200, 400])
        .range([height, 0])
    
    let xAxis = d3.axisBottom()
        .scale(xScale)

    let yAxis = d3.axisLeft()
        .scale(yScale)

    let chart = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (data, index) => margin.left + barWidth * index)
        .attr("cy", data => yScale(data[1]))
        .attr("data-y", data[1])
        .attr("r", 1)
        .attr("stroke", "black");

    svg.append("g")
        .attr("transform", `translate(${margin.bottom}, 0)`)
        .call(yAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${height})`)
        .call(xAxis);
}


