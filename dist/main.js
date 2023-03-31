/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("//Object oriented programming - constructor for each HTML element\n\nconst el = document.getElementById(\"svg-graph\");\nlet data;\nasync function fetchData() {\n  data = await fetch(\"https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=2015-02-28&end_date=2023-02-28&api_key=z4ZhwWk_L5Tp-MszdTFD\").then(async function (response) {\n    data = await response.json();\n    // console.log(data.dataset.data);\n    createGraph(data.dataset.data.reverse());\n    // data.dataset.data.forEach((date) => {\n    //     let newEle = document.createElement(\"div\");\n    //     newEle.innerHTML = date;\n    //     el.appendChild(newEle);\n    // })\n    // console.log(newEle);\n  });\n\n  return data;\n}\nfetchData();\n// console.log(dataset);\n// createGraph(dataset)\n\nfunction createGraph(dataset) {\n  // Currently assumes data in [[key, value], ...] format\n  let margin = {\n    left: 50,\n    bottom: 50\n  };\n  let svgWidth = 1000,\n    svgHeight = 500;\n  let width = svgWidth - margin.left;\n  let height = svgHeight - margin.bottom;\n  let barWidth = svgWidth / dataset.length; // May need to update\n\n  let svg = d3.select(\"#svg-graph\").attr(\"width\", svgWidth).attr(\"height\", svgHeight);\n  let xScale = d3.scaleLinear().domain([0, 95]).range([0, width]);\n  let yScale = d3.scaleLinear().domain([200, 400]).range([height, 0]);\n  let xAxis = d3.axisBottom().scale(xScale);\n  let yAxis = d3.axisLeft().scale(yScale);\n  let chart = svg.selectAll(\"circle\").data(dataset).enter().append(\"circle\").attr(\"cx\", (data, index) => margin.left + barWidth * index).attr(\"cy\", data => yScale(data[1])).attr(\"data-y\", data[1]).attr(\"r\", 1).attr(\"stroke\", \"black\");\n  svg.append(\"g\").attr(\"transform\", `translate(${margin.bottom}, 0)`).call(yAxis);\n  svg.append(\"g\").attr(\"transform\", `translate(${margin.left}, ${height})`).call(xAxis);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJlbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhIiwiZmV0Y2hEYXRhIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY3JlYXRlR3JhcGgiLCJkYXRhc2V0IiwicmV2ZXJzZSIsIm1hcmdpbiIsImxlZnQiLCJib3R0b20iLCJzdmdXaWR0aCIsInN2Z0hlaWdodCIsIndpZHRoIiwiaGVpZ2h0IiwiYmFyV2lkdGgiLCJsZW5ndGgiLCJzdmciLCJkMyIsInNlbGVjdCIsImF0dHIiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwieVNjYWxlIiwieEF4aXMiLCJheGlzQm90dG9tIiwic2NhbGUiLCJ5QXhpcyIsImF4aXNMZWZ0IiwiY2hhcnQiLCJzZWxlY3RBbGwiLCJlbnRlciIsImFwcGVuZCIsImluZGV4IiwiY2FsbCJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNfd2Fsa3Rocm91Z2gvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvL09iamVjdCBvcmllbnRlZCBwcm9ncmFtbWluZyAtIGNvbnN0cnVjdG9yIGZvciBlYWNoIEhUTUwgZWxlbWVudFxyXG5cclxuY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1ncmFwaFwiKTtcclxuXHJcbmxldCBkYXRhO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKCkge1xyXG4gICAgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9kYXRhLm5hc2RhcS5jb20vYXBpL3YzL2RhdGFzZXRzL1JBVEVJTkYvQ1BJX1VTQT9zdGFydF9kYXRlPTIwMTUtMDItMjgmZW5kX2RhdGU9MjAyMy0wMi0yOCZhcGlfa2V5PXo0Wmh3V2tfTDVUcC1Nc3pkVEZEXCIpXHJcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEuZGF0YXNldC5kYXRhKTtcclxuICAgICAgICBjcmVhdGVHcmFwaChkYXRhLmRhdGFzZXQuZGF0YS5yZXZlcnNlKCkpO1xyXG4gICAgICAgIC8vIGRhdGEuZGF0YXNldC5kYXRhLmZvckVhY2goKGRhdGUpID0+IHtcclxuICAgICAgICAvLyAgICAgbGV0IG5ld0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgLy8gICAgIG5ld0VsZS5pbm5lckhUTUwgPSBkYXRlO1xyXG4gICAgICAgIC8vICAgICBlbC5hcHBlbmRDaGlsZChuZXdFbGUpO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3RWxlKTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG5mZXRjaERhdGEoKTtcclxuLy8gY29uc29sZS5sb2coZGF0YXNldCk7XHJcbi8vIGNyZWF0ZUdyYXBoKGRhdGFzZXQpXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHcmFwaChkYXRhc2V0KSB7XHJcbiAgICAvLyBDdXJyZW50bHkgYXNzdW1lcyBkYXRhIGluIFtba2V5LCB2YWx1ZV0sIC4uLl0gZm9ybWF0XHJcbiAgICBsZXQgbWFyZ2luID0ge2xlZnQ6IDUwLCBib3R0b206IDUwfVxyXG4gICAgbGV0IHN2Z1dpZHRoID0gMTAwMCwgc3ZnSGVpZ2h0ID0gNTAwXHJcbiAgICBsZXQgd2lkdGggPSBzdmdXaWR0aCAtIG1hcmdpbi5sZWZ0O1xyXG4gICAgbGV0IGhlaWdodCA9IHN2Z0hlaWdodCAtIG1hcmdpbi5ib3R0b207XHJcbiAgICBsZXQgYmFyV2lkdGggPSAoc3ZnV2lkdGggLyBkYXRhc2V0Lmxlbmd0aCkgLy8gTWF5IG5lZWQgdG8gdXBkYXRlXHJcblxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdmctZ3JhcGhcIilcclxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHN2Z1dpZHRoKVxyXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHN2Z0hlaWdodClcclxuXHJcbiAgICBsZXQgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIDk1XSlcclxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcclxuXHJcbiAgICBsZXQgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzIwMCwgNDAwXSlcclxuICAgICAgICAucmFuZ2UoW2hlaWdodCwgMF0pXHJcbiAgICBcclxuICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oKVxyXG4gICAgICAgIC5zY2FsZSh4U2NhbGUpXHJcblxyXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoKVxyXG4gICAgICAgIC5zY2FsZSh5U2NhbGUpXHJcblxyXG4gICAgbGV0IGNoYXJ0ID0gc3ZnLnNlbGVjdEFsbChcImNpcmNsZVwiKVxyXG4gICAgICAgIC5kYXRhKGRhdGFzZXQpXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXHJcbiAgICAgICAgLmF0dHIoXCJjeFwiLCAoZGF0YSwgaW5kZXgpID0+IG1hcmdpbi5sZWZ0ICsgYmFyV2lkdGggKiBpbmRleClcclxuICAgICAgICAuYXR0cihcImN5XCIsIGRhdGEgPT4geVNjYWxlKGRhdGFbMV0pKVxyXG4gICAgICAgIC5hdHRyKFwiZGF0YS15XCIsIGRhdGFbMV0pXHJcbiAgICAgICAgLmF0dHIoXCJyXCIsIDEpXHJcbiAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKTtcclxuXHJcbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxyXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHttYXJnaW4uYm90dG9tfSwgMClgKVxyXG4gICAgICAgIC5jYWxsKHlBeGlzKTtcclxuXHJcbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxyXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7aGVpZ2h0fSlgKVxyXG4gICAgICAgIC5jYWxsKHhBeGlzKTtcclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsTUFBTUEsRUFBRSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7QUFFL0MsSUFBSUMsSUFBSTtBQUVSLGVBQWVDLFNBQVNBLENBQUEsRUFBRztFQUN2QkQsSUFBSSxHQUFHLE1BQU1FLEtBQUssQ0FBQyxnSUFBZ0ksQ0FBQyxDQUNuSkMsSUFBSSxDQUFDLGdCQUFnQkMsUUFBUSxFQUFFO0lBQzVCSixJQUFJLEdBQUcsTUFBTUksUUFBUSxDQUFDQyxJQUFJLEVBQUU7SUFDNUI7SUFDQUMsV0FBVyxDQUFDTixJQUFJLENBQUNPLE9BQU8sQ0FBQ1AsSUFBSSxDQUFDUSxPQUFPLEVBQUUsQ0FBQztJQUN4QztJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDSixDQUFDLENBQUM7O0VBQ0YsT0FBT1IsSUFBSTtBQUNmO0FBRUFDLFNBQVMsRUFBRTtBQUNYO0FBQ0E7O0FBRUEsU0FBU0ssV0FBV0EsQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCO0VBQ0EsSUFBSUUsTUFBTSxHQUFHO0lBQUNDLElBQUksRUFBRSxFQUFFO0lBQUVDLE1BQU0sRUFBRTtFQUFFLENBQUM7RUFDbkMsSUFBSUMsUUFBUSxHQUFHLElBQUk7SUFBRUMsU0FBUyxHQUFHLEdBQUc7RUFDcEMsSUFBSUMsS0FBSyxHQUFHRixRQUFRLEdBQUdILE1BQU0sQ0FBQ0MsSUFBSTtFQUNsQyxJQUFJSyxNQUFNLEdBQUdGLFNBQVMsR0FBR0osTUFBTSxDQUFDRSxNQUFNO0VBQ3RDLElBQUlLLFFBQVEsR0FBSUosUUFBUSxHQUFHTCxPQUFPLENBQUNVLE1BQU8sRUFBQzs7RUFFM0MsSUFBSUMsR0FBRyxHQUFHQyxFQUFFLENBQUNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FDNUJDLElBQUksQ0FBQyxPQUFPLEVBQUVULFFBQVEsQ0FBQyxDQUN2QlMsSUFBSSxDQUFDLFFBQVEsRUFBRVIsU0FBUyxDQUFDO0VBRTlCLElBQUlTLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxXQUFXLEVBQUUsQ0FDeEJDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUNmQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVYLEtBQUssQ0FBQyxDQUFDO0VBRXRCLElBQUlZLE1BQU0sR0FBR1AsRUFBRSxDQUFDSSxXQUFXLEVBQUUsQ0FDeEJDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUNsQkMsS0FBSyxDQUFDLENBQUNWLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztFQUV2QixJQUFJWSxLQUFLLEdBQUdSLEVBQUUsQ0FBQ1MsVUFBVSxFQUFFLENBQ3RCQyxLQUFLLENBQUNQLE1BQU0sQ0FBQztFQUVsQixJQUFJUSxLQUFLLEdBQUdYLEVBQUUsQ0FBQ1ksUUFBUSxFQUFFLENBQ3BCRixLQUFLLENBQUNILE1BQU0sQ0FBQztFQUVsQixJQUFJTSxLQUFLLEdBQUdkLEdBQUcsQ0FBQ2UsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUM5QmpDLElBQUksQ0FBQ08sT0FBTyxDQUFDLENBQ2IyQixLQUFLLEVBQUUsQ0FDUEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUNoQmQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDckIsSUFBSSxFQUFFb0MsS0FBSyxLQUFLM0IsTUFBTSxDQUFDQyxJQUFJLEdBQUdNLFFBQVEsR0FBR29CLEtBQUssQ0FBQyxDQUMzRGYsSUFBSSxDQUFDLElBQUksRUFBRXJCLElBQUksSUFBSTBCLE1BQU0sQ0FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25DcUIsSUFBSSxDQUFDLFFBQVEsRUFBRXJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN2QnFCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQ1pBLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO0VBRTVCSCxHQUFHLENBQUNpQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1ZkLElBQUksQ0FBQyxXQUFXLEVBQUcsYUFBWVosTUFBTSxDQUFDRSxNQUFPLE1BQUssQ0FBQyxDQUNuRDBCLElBQUksQ0FBQ1AsS0FBSyxDQUFDO0VBRWhCWixHQUFHLENBQUNpQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1ZkLElBQUksQ0FBQyxXQUFXLEVBQUcsYUFBWVosTUFBTSxDQUFDQyxJQUFLLEtBQUlLLE1BQU8sR0FBRSxDQUFDLENBQ3pEc0IsSUFBSSxDQUFDVixLQUFLLENBQUM7QUFDcEIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguY3NzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzX3dhbGt0aHJvdWdoLy4vc3JjL2luZGV4LmNzcz84MDZlIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.css\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.css"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;