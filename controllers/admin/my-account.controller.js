var md5 = require('md5');
const Account=require("../../models/account.model");

module.exports.index=async(req, res) => {
    res.render("admin/pages/my-account/index",{
         pageTitle:"Thông Tin cá Nhân"
    });
}
//[get] /admin/my-account/edit
module.exports.edit=async(req, res) => {
    res.render("admin/pages/my-account/edit",{
         pageTitle:"Chỉnh Sửa Thông tIn Cá Nhân"
    });
}

//[patch] /admin/my-account/edit
module.exports.editPatch=async(req, res) => {
    const id=res.locals.user.id;
   const emailExit= await Account.findOne({
    _id:{ $ne : id }, // id khác ne= not equal
    email:req.body.email,
    deleted:false
   })
   if(emailExit){
    req.flash("error","Email này đã tồn tại.");
   }
   else{
    if(req.body.password){
        req.body.password=md5(req.body.password);
    }
    else{
        delete req.body.password; //xoá cái password rỗng khi gửi lên đi
    }
    await Account.updateOne({_id:id},req.body);
    req.flash("success","Cập nhật thành công!");
   }
   res.redirect("back");
}