//Object oriented programming - constructor for each HTML element
const Data = require('./scripts/data.js')
const CreateGraph = require('./scripts/createGraph.js');

const cpiGraph = document.getElementById("svg-graph");
const eciGraph = document.getElementById("eci-graph");

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

async function createCpiGraph(startYear, endYear) {
    let d = new Data();
    let g = new CreateGraph();
    let dataset = await d.fetchCpiData(startYear, endYear);
    
    g.createCpiGraph(dataset, startYear, endYear)
}


createCpiGraph(2015, 2023);

let toggleButton = document.getElementById("toggle-graph");
let goodsButton = document.getElementById("goods");
let servicesButton = document.getElementById("services");

toggleButton.addEventListener('click', handleClick);

function handleClick(e) {
    e.preventDefault();
    // console.log(el.style.display)
    if (cpiGraph.getAttribute("visibility") === "visible") {
        cpiGraph.setAttribute("visibility", "hidden");
    } else {
        cpiGraph.setAttribute("visibility", "visible");
    }
}

// goodsButton.addEventListener('click', handleGoodsClick);

// function handleGoodsClick(e) {
//     e.preventDefault();
//     let container = document.getElementById("eci-graph")
//     container.remove();

//     let newContainer = document.createElement("svg");
//     newContainer.setAttribute("id", "eci-graph");
//     document.getElementById("eci-holder").appendChild(newContainer);
//     createEciGraph(2015, 2022);
// }



















// let cpiData;
// // let salaryData;
// let eciData;


// async function fetchData() {
//     cpiData = await fetch("https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=2015-02-28&end_date=2023-02-28&api_key=z4ZhwWk_L5Tp-MszdTFD")
//     .then(async function (response) {
//         // console.log(response)
//         cpiData = await response.json();
//             console.log(cpiData.dataset.data.reverse())
//             createGraph2(cpiData.dataset.data.reverse());

//         // data.dataset.data.forEach((date) => {
//         //     let newEle = document.createElement("div");
//         //     newEle.innerHTML = date;
//         //     el.appendChild(newEle);
//         // })
//         // console.log(newEle);
//     })
//     return cpiData
// }

// fetchData();

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






