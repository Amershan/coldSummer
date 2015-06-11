/**
 * Created by arpadbudai on 2015.06.11..
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
  var searchString = req.query.term;

  findOccupation(searchString, function (found) {
    console.log(found);
    return res.send(found);
  });

});


var findOccupation = function (searchString, cb) {
  var found = [];
  //read the ocupations from file
  fs.readFile('/coldSummer/public/resources/occupationlist.txt', function(err, data) {
    if(err) throw err;
    var occupationList = data.toString().split("\n");
    for(var i in occupationList) {
      //check if the typed chars contained by any of the occupation in the list
      if (occupationList[i].toLowerCase().indexOf(searchString) > -1) {
        found.push(occupationList[i]);
      }
    }
    cb(found)
  });
}

module.exports = router;