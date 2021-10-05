import TOKEN from ('../config.js');

var apiGet = function(method, endpoint, callback) {
  var options = {
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${endpoint}`,
    headers: {
      'Authorization': `token ${TOKEN}`
    }
  }

  axios.request(options.url, options.header)
  .then((result) => {
    callback(null, result.data);
  })
  .catch(err => {

  })
}
