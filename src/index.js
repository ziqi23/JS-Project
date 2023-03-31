const Data = require('./scripts/data.js')
const CreateGraph = require('./scripts/createGraph.js');

//Object oriented programming - constructor for each HTML element


const el = document.getElementById("svg-graph");
const el2 = document.getElementById("eci-graph");
let cpiData;
// let salaryData;
let eciData;


async function fetchData() {
    cpiData = await fetch("https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=2015-02-28&end_date=2023-02-28&api_key=z4ZhwWk_L5Tp-MszdTFD")
    .then(async function (response) {
        // console.log(response)
        cpiData = await response.json();
            createGraph2(cpiData.dataset.data.reverse());

        // data.dataset.data.forEach((date) => {
        //     let newEle = document.createElement("div");
        //     newEle.innerHTML = date;
        //     el.appendChild(newEle);
        // })
        // console.log(newEle);
    })
    return cpiData
}

// salaryData = fetch("https://api.stlouisfed.org/fred/series/observations?series_id=CEU0500000003&api_key=50c37cf826ff0bb2e15e19cb6d19483f&file_type=json", {headers: {'Access-Control-Allow-Origin': '*'}})
//         .then(async function(res) {
//             console.log(res);
//             salaryData = res.json();
//             console.log(salaryData);
//         })

// fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/CMU2010000000000D?registrationkey=7f547dfafd2b470cbd505daa838b9304&catalog=true&startyear=2015&endyear=2022")
//     .then(async function(response) {
//         // console.log(response);
//         eciData = await response.json();
//         // console.log(eciData.Results.series[0].data);
//         createEciGraph(eciData.Results.series[0].data.reverse());
//     })


async function createEciGraph(startYear, endYear, type="general") {
    let d = new Data();
    let g = new CreateGraph();
    let dataset;
    if (type === "general") {
        dataset = await d.fetchRegularEciData(startYear, endYear);
    } else {
        dataset = await d.fetchEciDataByIndustry(type, startYear, endYear)
    }
    g.createEciGraph(dataset, startYear, endYear)
}

createEciGraph(2012, 2022, "professionalServices");

function _createEciGraph(dataset, startYear, endYear) {
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


// function createGraph2(dataset) {
//     // Currently assumes data in [[key, value], ...] format

//     let margin = {left: 50, bottom: 50, top: 50, right: 50} // Define margins
//     let svgWidth = 1000, svgHeight = 500 // Define container size
//     let width = svgWidth - margin.left - margin.right; // Define inner container size
//     let height = svgHeight - margin.bottom - margin.right; // Define inner container size
//     let eachWidth = (width / dataset.length) // Define space between each data point

//     let svg = d3.select("#svg-graph") // Set HTML element to container size
//         .attr("width", svgWidth)
//         .attr("height", svgHeight)

//     let xScale = d3.scaleTime() // Define x axis scaling to fill container area
//         .domain([new Date("2015-02-28"), new Date("2023-02-28")])
//         .range([0, width])
//         // .domain([0, 95])
//         // .range([0, width])

//     let yScale = d3.scaleLinear() // Define y axis scaling to fill container area
//         .domain([200, 400])
//         .range([height, 0])
    
//     let xAxis = d3.axisBottom() // Create x axis and define number of ticks
//         .scale(xScale)
//         .ticks(8)

//     let yAxis = d3.axisLeft() // Create y axis and define number of ticks
//         .scale(yScale)

//     let cpiChart = svg.selectAll("circle") // Plot data points
//         .data(dataset) // Import dataset
//         .enter() // For each data element
//         .append("circle") // Append to the SVG a circle element
//         .attr("transform", `translate(${margin.left}, ${margin.bottom})`) // Account for padding
//         .attr("cx", (data, index) => eachWidth * index) // x coordinate
//         .attr("cy", data => yScale(data[1])) // y coordinate
//         .attr("r", 1) // radius
//         .attr("stroke", "black");

//     svg.append("g") // Append y Axis
//         .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
//         .call(yAxis);

//     svg.append("g") // Append x Axis
//         .attr("transform", `translate(${margin.left}, ${svgHeight - margin.bottom})`)
//         .call(xAxis);
// }

fetchData();

let toggleButton = document.getElementById("toggle-graph");

toggleButton.addEventListener('click', handleClick);


function handleClick(e) {
    e.preventDefault();
    // console.log(el.style.display)
    if (el.getAttribute("visibility") !== "visible") {
        el.setAttribute("visibility", "visible");
    } else {
        el.setAttribute("visibility", "hidden");
    }
}

// console.log(dataset);
// createGraph(dataset)

// function createGraph(dataset) {
//     // Currently assumes data in [[key, value], ...] format
//     let margin = {left: 50, bottom: 50}
//     let svgWidth = 1000, svgHeight = 500
//     let width = svgWidth - margin.left;
//     let height = svgHeight - margin.bottom;
//     let barWidth = (svgWidth / dataset.length) // May need to update

//     let svg = d3.select("#svg-graph")
//         .attr("width", svgWidth)
//         .attr("height", svgHeight)

//     let xScale = d3.scaleTime()
//         .domain([new Date("2015-02-28"), new Date("2023-02-28")])
//         .range([0, width])
//         // .domain([0, 95])
//         // .range([0, width])

//     let yScale = d3.scaleLinear()
//         .domain([200, 400])
//         .range([height, 0])
    
//     let xAxis = d3.axisBottom()
//         .scale(xScale)
//         .ticks(8)

//     let yAxis = d3.axisLeft()
//         .scale(yScale)

//     let chart = svg.selectAll("circle")
//         .data(dataset)
//         .enter()
//         .append("circle")
//         .attr("cx", (data, index) => margin.left + barWidth * index)
//         .attr("cy", data => yScale(data[1]))
//         .attr("data-y", data[1])
//         .attr("r", 1)
//         .attr("stroke", "black");

//     svg.append("g")
//         .attr("transform", `translate(${margin.bottom}, 0)`)
//         .call(yAxis);

//     svg.append("g")
//         .attr("transform", `translate(${margin.left}, ${height})`)
//         .call(xAxis);
// }

function createGraph2(dataset) {
    // Currently assumes data in [[key, value], ...] format

    let margin = {left: 50, bottom: 50, top: 50, right: 50} // Define margins
    let svgWidth = 1000, svgHeight = 500 // Define container size
    let width = svgWidth - margin.left - margin.right; // Define inner container size
    let height = svgHeight - margin.bottom - margin.right; // Define inner container size
    let eachWidth = (width / dataset.length) // Define space between each data point

    let svg = d3.select("#svg-graph") // Set HTML element to container size
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    let xScale = d3.scaleTime() // Define x axis scaling to fill container area
        .domain([new Date("2015-02-28"), new Date("2023-02-28")])
        .range([0, width])
        // .domain([0, 95])
        // .range([0, width])

    let yScale = d3.scaleLinear() // Define y axis scaling to fill container area
        .domain([200, 400])
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
        .attr("cy", data => yScale(data[1])) // y coordinate
        .attr("r", 1) // radius
        .attr("stroke", "black");

    svg.append("g") // Append y Axis
        .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
        .call(yAxis);

    svg.append("g") // Append x Axis
        .attr("transform", `translate(${margin.left}, ${svgHeight - margin.bottom})`)
        .call(xAxis);
}

