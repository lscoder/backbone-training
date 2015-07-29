'use strict';

module.exports = function(req, res) {
  var user = req.user;

  res.send({
    id: user._id,
    name: user.name
  });
};
