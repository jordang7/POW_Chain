import axios from "axios";
let ENDPOINT_BASE = "http://localhost:8000/";
export const startMining = () => {
  axios({
    method: "POST",
    url: ENDPOINT_BASE + "startMining",
  }).then((response) => {
    console.log(response);
  });
};

export const stopMining = () => {
  axios({
    method: "POST",
    url: ENDPOINT_BASE + "stopMining",
  }).then((response) => {
    console.log(response);
  });
};

export const getBalance = (address) => {
  axios({
    method: "POST",
    url: ENDPOINT_BASE + "getBalance",
    data: {
        address:address
      },
  }).then((response) => {
        alert("Your balance is: " + response.data)
  });
};
