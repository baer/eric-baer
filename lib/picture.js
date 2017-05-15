"use strict";

var fs = require("fs");
var pictureTube = require("picture-tube");

module.exports = function (customPath) {
  var tube = pictureTube();
  tube.pipe(process.stdout);

  var photoPath = customPath || "./me/profile.png";
  fs.createReadStream(photoPath).pipe(tube);
};
