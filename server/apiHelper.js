import TOKEN from ('../config.js');

var apiGet = function(endpoint, callback) {
  var options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${endpoint}`,
    headers: {
      'Authorization': `token ${TOKEN}`
    }

  }

  axios.method
}

