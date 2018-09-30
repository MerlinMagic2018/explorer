var request = require('request');

var base_url = 'https://www.probitex.com/api';

function get_summary(coin, exchange, cb) {
  var req_url = base_url + '/get_market?' + name= + ltnc_btc;
  request({uri: req_url, json: true}, function (error, response, body) {
    if (error) {
      return cb(error, null);
    } else {
      if (body.message) {
        return cb(null, body.message)
      } else {
        return cb (body.message, null);
      }
    }
  });
}

function get_price(coin, exchange, cb) {
  var req_url = base_url + '/get_market?' + name= + '-' + ltnc_btc;
  request({uri: req_url, json: true}, function (error, response, body) {
    if (body.success == true) {
      body.result = body.result[0]['buy_price'];
      return cb (null, body.result);
    } else {
      return cb(body.result, null);
    }
  });
}



module.exports = {
  get_data: function(coin, exchange, cb) {
    var error = null;
    get_orders(coin, exchange, function(err, buys, sells) {
      if (err) { error = err; }
      get_trades(coin, exchange, function(err, trades) {
        if (err) { error = err; }
        get_summary(coin, exchange, function(err, stats) {
          if (err) { error = err; }
          return cb(error, {buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats});
        });
      });
    });
  }
};
