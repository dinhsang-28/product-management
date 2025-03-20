const md5 = require('md5');
const Account=require("../../models/account.model");
const Role=require("../../models/role.model");
const systemConfig=require("../../config/system");
module.exports.index=async(req, res) => {
    let find={
        deleted:false
    }
    const records = await Account.find(find).select("-password -token");
    for (const item of records) {
        const role =await Role.findOne({
            _id:item.role_id,
            deleted:false
        });
        item.role=role;
    }
    res.render("admin/pages/accounts/index",{
         pageTitle:"Tài Khoản",
         records:records
    });
}
//[GET] /admin/accounts/create
module.exports.create=async(req, res) => {
    const roles = await Role.find({
        deleted:false
    })
   
    res.render("admin/pages/accounts/create",{
         pageTitle:" Tạo Tài Khoản",
         roles:roles
    });
}
//[POST] /admin/accounts/create    
module.exports.createPost=async(req, res) => {
    const emailExit= await Account.findOne({
        email:req.body.email,
        deleted:false
    })
    if(emailExit){
        req.flash("error","Email đã tồn tại!");
        res.redirect("back");
    }
    else{
        req.body.password=md5(req.body.password);
     const record=new Account(req.body);
     await record.save();
     res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    } 
 }

//[GET] /admin/accounts/edit/:id
module.exports.edit=async(req, res) => {  
 try {
    const id=req.params.id;
const data = await Account.findOne({
    _id:id,
    deleted:false
})
const role= await Role.find({ deleted:false});

res.render("admin/pages/accounts/edit",{
     pageTitle:"Chỉnh sửa danh Mục Sản Phẩm",
     data:data,
     roles:role
});
    
} catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}
}
//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch=async(req, res) => {  
   const id=req.params.id;
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
        delete req.body.password
    }
    await Account.updateOne({_id:id},req.body);
    req.flash("success","Cập nhật thành công!");
   }
   res.redirect("back");

   
}