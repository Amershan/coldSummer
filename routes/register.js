/**
 * Created by arpadbudai on 2015.06.11..
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  checkDataValidity(req.body, function (responseObj) {
    res.json(responseObj);
  });
});

var checkDataValidity = function (data, cb) {
  console.log(data);
  var responseObj ={};
  var nameRegex  = /^[a-zA-Z ]{3,60}$/;
  var emailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var eighteenUnx = 567993600;
  var diff = Math.abs((Math.floor(Date.now() / 1000)) - Math.floor(new Date(data.age) / 1000));

  if(!data.name || !data.email || !data.age || !nameRegex.test(data.name) || !emailregex.test(data.email) || eighteenUnx > diff) {

    responseObj = {
      code: 401,
      errorMsg: 'data validation failed',
      isSuccess: false
    };

    return cb(responseObj);
  }
  responseObj = {
    code: 200,
    errorMsg: '',
    isSuccess: true
  };
  return cb(responseObj);

};

module.exports = router;