const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "http://13.245.101.82/api/v1/responses",
  };

  let res = await axios(config);

  console.log(res.data.data.forEach());
}

makeRequest();
