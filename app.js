const express = require("express")
const app = express();
const csvtojson = require("csvtojson");
const csvfilepath = "airData.csv";
const path = require("path");

// const csv = require('csv-parser');
const fs = require("fs");


app.use(express.static("frontend"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'./frontend/index.html'))
});

app.get("/api/csvData", (req, res) => {
  let country = req.url.split("=")[1];
  let changedCountry = country.split('%20').join(" ")
csvtojson()
  .fromFile(csvfilepath)
  .then((countries) => {
    const filtered = countries.filter(country => country.Country == changedCountry)
    return res.json(filtered)
  });
});



// app.get('/csvData', (req, res) => {
//  const results = [];
//  fs.createReadStream("sample_data.csv")
//    .pipe(csv({}))
//    .on("data", (data) => results.push(data))
//    .on("end", () => {
//       realData = Object.values(results);
//     console.log(realData)
//      res.json(realData)
//    });

 

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

