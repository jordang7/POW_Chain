import axios from "axios";
let ENDPOINT_BASE = "http://localhost:8000/";
export const startMining = (address) => {
  axios({
    method: "POST",
    url: ENDPOINT_BASE + "startMining",
    data: {
      address:address
    },
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

export const lookUpBalance = (address) => {
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
