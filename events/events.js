const event = require("events");
const { EventEmitter } = require("events");
const myEvent = new EventEmitter();

module.exports = function (req, res, next) {
  req.myEvent = myEvent;
  next();
};
myEvent.on("err", function (data) {
  console.log("error in application", dara.status(400).json(data.err));
});

myEvent.on('data',function (data){
    console.log('data is',data)
})
