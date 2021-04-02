const { fetchData } = require("../util/data");
const topojson = require("topojson");

document.addEventListener("DOMContentLoaded", () => {
  let countryArray = [];
  let countryData = {};
  let filtered = [];
  let allLoaded = false;
  var colorClasses = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "eigth",
    9: "ninth",
    10: "tenth",
  };
  const range = document.getElementById("Range");
  const rangeInput = document.querySelector(".rangeInput");
  const modalButton = document.querySelector(".modal-open");
  const closeButton = document.querySelector(".modal-close");
  const modal = document.getElementById("modal");
  const mainScreen = document.createElement("div");
  const body = document.querySelector("body");
  const screen = "screen";
  const show = "show";
  const hide = "hide";
  mainScreen.classList.add(screen);
  modal.classList.add(hide);
  rangeInput.classList.add(hide);
  modal.classList.remove(show);
  modalButton.addEventListener("click", (e) => {
    modalButton.classList.add(hide);
    const modal = document.getElementById("modal");
    if (!modal.classList.contains(show)) {
      modal.classList.remove(hide);
      modal.classList.add(show);
      body.append(mainScreen);
    }
  });
  closeButton.addEventListener("click", (e) => {
    if (modal.classList.contains(show)) {
      modal.classList.remove(show);
      modal.classList.add(hide);
      body.removeChild(mainScreen);
      rangeInput.classList.remove(hide);
      rangeInput.classList.add(".rangeInput");
    }
  });

  document.getElementById("Range").setAttribute("disabled", true);
  class countryAverage {
    constructor(dt, AverageTemperature, Country) {
      this.dt = dt;
      this.AverageTemperature = AverageTemperature;
      this.Country = Country;
    }
  }
  let tempArray = [];
  let finalArray = [];

  range.addEventListener("change", (e) => {
    if (allLoaded === false) {
      return;
    }
    let targetYear = e.target.value;
    let input = document.getElementById("textInput");
    input.innerText = targetYear;
    filtered = [];
    countryArray.forEach((country) => {
      const data = countryData[country];
      let dataArray = Object.values(data);
      dataArray.forEach((object) => {
        if (object.dt.includes(targetYear)) {
          filtered.push(object);
        }
      });
    });

    for (const country of countryArray) {
      let testArray = [];
      for (let index = 0; index < filtered.length; index++) {
        if (country === filtered[index].Country) {
          testArray.push(filtered[index]);
        }
      }
      tempArray.push(testArray);
    }

    for (const country of tempArray) {
      if (country.length === 0) {
        continue;
      }
      let sum = 0;
      for (let index = 0; index < country.length - 1; index++) {
        sum += parseInt(country[index].AverageTemperature);
      }
      let averageTemp = sum / country.length;
      let currentCountry = new countryAverage(
        country[0].dt,
        averageTemp,
        country[0].Country
      );

      finalArray.push(currentCountry);
    }

    const updatedArray = finalArray.filter((object) => {
      if (object.dt.includes(targetYear) && object != "null") {
        return object;
      }
    });

    changeColor = () => {
      updatedArray.forEach((countryObject) => {
        Object.values(colorClasses).forEach((number) => {
          // debugger;
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            number,
            false
          );
        });
        let aveTemp = countryObject.AverageTemperature;
        if (aveTemp <= 5) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "first",
            true
          );
        }
        if (aveTemp > 5 && aveTemp <= 6) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "second",
            true
          );
        }
        if (aveTemp > 6 && aveTemp <= 7) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "third",
            true
          );
        }
        if (aveTemp > 7 && aveTemp <= 8) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "fourth",
            true
          );
        }

        if (aveTemp > 8 && aveTemp <= 9) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "fifth",
            true
          );
        }
        if (aveTemp > 9 && aveTemp <= 10) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "sixth",
            true
          );
        }
        if (aveTemp > 10 && aveTemp <= 11) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "seventh",
            true
          );
        }
        if (aveTemp > 11 && aveTemp <= 12) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "eigth",
            true
          );
        }
        if (aveTemp > 12 && aveTemp <= 13) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "ninth",
            true
          );
        }
        if (aveTemp > 13) {
          d3.select(`[country-name="${countryObject.Country}"]`).classed(
            "tenth",
            true
          );
        }
      });
    };
    changeColor();
  });

  const width = 1000;
  const height = 600;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3
    .geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.4]);
  const path = d3.geoPath(projection);

  const g = svg.append("g");

  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((data) => {
    const countries = topojson.feature(data, data.objects.countries);
    g.selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("country-name", (country) => {
        if (country.properties.name === "United States of America") {
          return "United States";
        } else {
          return country.properties.name;
        }
      })
      .attr("d", path)
      .on("click", function (e, d) {
        if (e.metaKey) {
          d3.select(this).classed("selected", false);
          Object.values(colorClasses).forEach((number) => {
            if (e.target.classList.contains(number)) {
              d3.select(this).classed(number, false);
            }
          });
          const countryName = this.getAttribute("country-name");
          for (var i = 0; i < countryArray.length; i++) {
            if (countryArray[i] === countryName) {
              countryArray.splice(i, 1);
              i--;
            }
          }
          delete countryData[countryName];
          if (countryArray.length === Object.keys(countryData).length) {
            allLoaded = true;
            document.getElementById("Range").disabled = false;
          } else {
            allLoaded = false;
            document.getElementById("Range").setAttribute("disabled", true);
          }
        } else {
          d3.select(this).classed("selected", true);
          const countryName = this.getAttribute("country-name");
          if (!countryArray.includes(countryName)) {
            countryArray.push(countryName);
          }
          let object = {};
          object[countryName] = "";
          fetchData(countryName).then((res) => {
            object[countryName] = res;
            countryData[countryName] = object[countryName];
            if (countryArray.length === Object.keys(countryData).length) {
              allLoaded = true;
              document.getElementById("Range").disabled = false;
            } else {
              allLoaded = false;
              document.getElementById("Range").setAttribute("disabled", true);
            }
            let targetYear = document.getElementById("textInput").innerText;
            let countryInfo = countryData[countryName];
            countryInfo.forEach((object) => {
              if (object.dt.includes(targetYear)) {
                filtered.push(object);
              }
            });
          });
        }
      });
  });
});
