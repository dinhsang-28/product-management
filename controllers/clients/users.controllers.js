const User = require("../../models/user.model");
//[Get] / users/not-friend
module.exports.notFriend=async (req,res) => {
    const userId = res.locals.user.id;
    const users = await User.find({
        _id:{$ne:userId},
        status:"active",
        deleted:false
    }).select("id avatar fullname")
    console.log(users);
    res.render("client/pages/users/not-friend",{
    pageTitle: "Danh Sách Người Dùng",
    users:users
    });
}