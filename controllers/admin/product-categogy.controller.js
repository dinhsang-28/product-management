const ProductCategogy = require("../../models/product-categogy.model");
const systemConfig=require("../../config/system");
const createTreeHelper=require("../../Helpers/createTree");
//[GET] /admin/products-categogy
module.exports.index=async(req, res) => {
    let find={
        deleted:false
    };
    
    const records= await ProductCategogy.find(find)
    const newRecords=createTreeHelper.Tree(records);
    res.render("admin/pages/product-categogy/index",{
         pageTitle:"Danh Mục Sản Phẩm",
         records:newRecords
    });
}
//[GET] /admin/products-categogy/create
module.exports.create=async(req, res) => {
    let find={
        deleted:false
    }

    const records= await ProductCategogy.find(find);
    const newRecords=createTreeHelper.Tree(records);
    res.render("admin/pages/product-categogy/create",{
         pageTitle:"Thêm mới danh Mục Sản Phẩm",
         records:newRecords
    });
}

//[POST] /admin/products-categogy/create
module.exports.createPost=async(req, res) => {
    const permissions = res.locals.role.permissions;
    if(permissions.includes("products-categogy_view")){
        if(req.body.position == "") {
            const count= await ProductCategogy.countDocuments();
            req.body.position=count+1;
        }
        else {
            req.body.position=parseInt(req.body.position);
        }
        const record=new ProductCategogy(req.body);//khởi tạo đưa vào database
        await record.save();//lưu vào database
        res.redirect(`${systemConfig.prefixAdmin}/products-categogy`);

    }
    else {
        res.render("404");
        return;
    }
    // if(req.body.position == "") {
    //     const count= await ProductCategogy.countDocuments();
    //     req.body.position=count+1;
    // }
    // else {
    //     req.body.position=parseInt(req.body.position);
    // }
    // const record=new ProductCategogy(req.body);//khởi tạo đưa vào database
    // await record.save();//lưu vào database
    // res.redirect(`${systemConfig.prefixAdmin}/products-categogy`);

}

//[GET] /admin/products-categogy/edit/:id
module.exports.edit=async(req, res) => {
    try {
        const id=req.params.id;
    const data = await ProductCategogy.findOne({
        _id:id,
        deleted:false
    })
    const records= await ProductCategogy.find({ deleted:false});
    const newRecords=createTreeHelper.Tree(records);

    res.render("admin/pages/product-categogy/edit",{
         pageTitle:"Chỉnh sửa danh Mục Sản Phẩm",
         data:data,
         records:newRecords
    });
        
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-categogy`);
    }
}
//[PATCH] /admin/products-categogy/edit/:id
module.exports.editPatch=async(req, res) => {
    const id=req.params.id;
    req.body.position=parseInt(req.body.position);
    console.log(req.body);
    await ProductCategogy.updateOne({_id:id},req.body);
    res.redirect("back");
    
}