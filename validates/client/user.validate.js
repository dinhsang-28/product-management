module.exports.register=(req, res ,next) => {
    if(!req.body.fullname){
        req.flash("error", `vui lòng nhập tên. `);  
        res.redirect("back");
        return;
    }
    if(!req.body.email){
        req.flash("error", `vui lòng nhập email. `);  
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("error", `vui lòng nhập password. `);  
        res.redirect("back");
        return;
    }
    next();
}

module.exports.loginPost=(req, res ,next) => {
    if(!req.body.email){
        req.flash("error", `vui lòng nhập email. `);  
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("error", `vui lòng nhập password. `);  
        res.redirect("back");
        return;
    }
    next();
}
module.exports.forgotPasswordPost=(req, res ,next) => {
    if(!req.body.email){
        req.flash("error", `vui lòng nhập email. `);  
        res.redirect("back");
        return;
    }
    next();
}
module.exports.resetPasswordPost=(req, res ,next) => {
    if(!req.body.password){
        req.flash("error", `vui lòng nhập mật khẩu. `);  
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword){
        req.flash("error", `vui lòng nhập xác nhận mật khẩu. `);  
        res.redirect("back");
        return;
    }
    if(req.body.password !== req.body.confirmPassword){
        req.flash("error", `Xác nhận mật khẩu và mật khẩu không hợp lệ.`);  
        res.redirect("back");
        return;
    }
    next();
}