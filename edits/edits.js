if (data.love) {
    if (res.loggedInUser.role === 2) {
      find({ _id: data.user._id }, {}).then((data) => {
        if (data.love) {
          if (
            data.love.forEach((user, index) => {
              if (user._id === data.user._id) {
                data.love.splice(1, index);
                return;
              } else {
                const love = {
                  user: data.user,
                };
                product.love.unshift(love);
              }
            })
          )
            product.love = data.love;
        }
      });
    }
  }