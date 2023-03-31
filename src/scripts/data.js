//	Total compensation for Private industry workers in various industries and occupations, 3-month percent change

class Data {

    constructor(url) {
        this.url = url;
    }

    async fetchRegularEciData(startYear, endYear) {
        return fetch(`https://api.bls.gov/publicAPI/v2/timeseries/data/CIS2010000000000Q?registrationkey=7f547dfafd2b470cbd505daa838b9304&catalog=true&startyear=${startYear}&endyear=${endYear}`)
            .then(function(response) {
                return response.json()
            })
            .then((res) => {
                return res.Results.series[0].data.reverse();
            })
    }

    async fetchEciDataByIndustry(industry, startYear, endYear) {
        const seriesId = {
            finance: "CIS201520A000000Q", 
            professionalServices: "CIS201540A000000Q",
            educationAndHealthServices: "CIS2016000000000Q",
            leisureAndHospitality: "CIS2017000000000Q",
            goodProducing: "CIS201G000000000Q",
            serviceProviding: "CIS201S000000000Q"
        }

        return fetch(`https://api.bls.gov/publicAPI/v2/timeseries/data/${seriesId[industry]}?registrationkey=7f547dfafd2b470cbd505daa838b9304&catalog=true&startyear=${startYear}&endyear=${endYear}`)
            .then(async function(response) {
                return response.json()
            })
            .then((res) => {
                return res.Results.series[0].data.reverse();
            })
    }

    async fetchCpiData(startYear, endYear) {
        return fetch(`https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=${startYear}-01-01&end_date=${endYear}-12-31&api_key=z4ZhwWk_L5Tp-MszdTFD`)
            .then(async function (response) {
                return response.json() 
            })
            .then((res) => {
                return res.dataset.data.reverse();
            })
    }
}


module.exports = Data;