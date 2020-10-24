const passwordHash = require("password-hash");
module.exports = (user, data ,loggedInUser = null) => {
  let updated = 0;
  for (key in data) {
    if(key !== "password" || "permanent_address" || "temp_address" );
    user[key] = data[key];
    if (key === "password") {
      user.password = passwordHash.generate(data.password);
    }
    if (key === "permanent_address" || "temp_address") {
      user.address ={
        temp_address :data.temp_address && data.temp_address.split(",").length > 1
                ? data.temp_address.split(",")
                : data.temp_address,
        permanent_address: data.permanent_address && data.permanent_address
      }
    }
    if(loggedInUser && updated === 0){
      user.updatedBy = loggedInUser.username
      updated = 1
    }
    
  }
};
