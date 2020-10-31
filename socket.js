const socket = require("socket.io");
const users =[];
module.exports = function (app) {
  const io = socket(app.listen(8080));
  io.on("connect", function (client) {
    const id = client.id;
    client.on("new-message", function (data) {
        console.log(data)
      client.emit("rply-msg", data);
      client.broadcast.to(data.reciverId).emit("rply-msg-to", data);
    });
    client.on('new-user',data => {
        if(users.length!==0){
            users.forEach(user => {
               if(user.username === data.username){
                
               }else{
                   users.push({id,username:data.username})
               }
           })
        }
        else{
            users.push({id,username:data.username})
        }
        client.emit('user',users)
        client.broadcast.emit('user',users)
    })
    client.on('disconnect',() => {
        users.forEach((user,i) => {
            if(user.id === id){
                users.splice(1,i);
            }
        })
        client.broadcast.emit('user',users)
    })

  });
//   io.on("notifications", function (client) {
//     client.emit("notifications", "zero notifications");
//   });
};
