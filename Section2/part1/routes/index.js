const fs = require('fs');

const getHistory = function (timeline, callbackFunc) {
  //default timeline
  if (!timeline) timeline = 'The-Birth';
  if (timeline === 'Birth') timeline = 'The-Birth';

  fs.readFile(`${__dirname}/../data.json`, function (err, data) {
    webObject = JSON.parse(data);

    // console.log(webObject[timeline]);
    callbackFunc(webObject[timeline]);
  });
};

exports.api = function (req, res) {
  //function call
  getHistory(req.query.timeline, function (objectOfTemplates) {
    res.render('home', objectOfTemplates);
  });
};
