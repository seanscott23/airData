

export const fetchData = (query) => {
return $.ajax({
    method: "GET",
    url: `/api/csvData`,
    data: { query }
  });
  
};


// export const fetchData = (query) => {
// const data = () => {
//    $.ajax({
//     method: "GET",
//     url: `/api/csvData`,
//     data: { query }
//   });
// } ()
// console.log(data)
// return data
// };

// setup a route for the backend to fetch the data
// follow the tutorial for using a csv file
// /data use as route
// in controller of that route , read in the csv file
// res.json to send up to the frontend
// use axior or ajax in order to make a get request that will send me a json request with all the csv data

//review mern curriculum to help understand setting up the backend & route
//controller - request response callback
//res.json to send data to frontend in controller
//
