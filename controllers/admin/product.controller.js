const Product=require("../../models/product.model");
const filterStatusHelper=require("../../Helpers/filterStatus");
const systemConfig=require("../../config/system");
const searchHelper=require("../../Helpers/search");
const paginationHelper=require("../../Helpers/pagination");
//[get] /admin/products
module.exports.index=async(req, res) => {
    //3 nút lọc
    filterStatus=filterStatusHelper(req.query);
    let find={
        deleted:false
    };
    //hoạt động hay không hoạt động
    if(req.query.status){
        find.status=req.query.status;
    }
    //Tìm kiếm
    const objectSearch=searchHelper(req.query);
    if(objectSearch.regex){
        find.title=objectSearch.regex;
    }
    //Phân Trang
    const countProducts= await Product.countDocuments(find);
    let objectpagination =paginationHelper(
        {
            currentPage:1,
            limitItems:4,
        },
        req.query,
        countProducts
    )
    //END phân Trang
    //hiển thị
    const products= await Product.find(find)
    .sort({position:"desc"})
    .limit(objectpagination.limitItems)
    .skip(objectpagination.skip);
    res.render("admin/pages/product/index",{
        pageTitle:"Trang San Pham",
        products:products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectpagination
   });
}
//[path] /change-status/:status/:id
module.exports.changeStatus= async (req,res) => {
    console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id:id }, {status:status});
    req.flash("success", "Cập nhật trạng thái thành công.");
    //không chuyển hướng trang.
    res.redirect("back");
}
//[path] /change-multi
module.exports.changeMulti= async (req,res) => {
    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    // console.log(type);
    // console.log(ids);
    console.log(req.body);
    switch (type) {
        case "active":
            await Product.updateMany({ _id : {$in : ids}} , {status:"active"});  
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm.`);         
            break;

            case "inactive":
                await Product.updateMany({ _id : {$in : ids}} , {status:"inactive"});
                req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm.`);   
                break;
            case "deleted-all":
                await Product.updateMany({ _id : {$in : ids}} , {
                    deleted:true,
                    deletedAt:new Date()
                }
            );
            req.flash("success", ` Đã xóa thành công ${ids.length} sản phẩm.`);
                break;
            case "change-position":
               for (const item of ids) {
                let [id,position]=item.split("-");
                position=parseInt(position);
                await Product.updateOne({ _id : {$in : id}} , {
                    position:position
                }
              );
               }
               req.flash("success", `Đã thay dổi vị trí thành công ${ids.length} sản phẩm.`);          
                break;
        default:
            break;
    }
    res.redirect("back");
};
//[DELETE] /delete/:id
module.exports.deleteItem= async (req,res) => {
    const id = req.params.id;
    //xoá cứng
    // await Product.deleteOne({ _id:id });
    //xoá mềm
    await Product.updateOne({ _id:id },{
        deleted:true,
        deletedAt:new Date()
        }

    );
    req.flash("success", `Đã xóa thành công  sản phẩm.`);
    //không chuyển hướng trang.
    res.redirect("back");
}

//[get] /admin/products/create
module.exports.create=async(req, res) => {
    res.render("admin/pages/product/create",{
        pageTitle:"Thêm mới sản phẩm",
   });
}

//[POST] /admin/products/create
module.exports.createPost=async(req, res) => {
    
    // console.log(req.file);
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt( req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);

    if(req.body.position == "") {
        const countProduct= await Product.countDocuments();
        req.body.position=countProduct+1;
    }
    else {
        req.body.position=parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    const product=new Product(req.body);//khởi tạo đưa vào database
    await product.save();//lưu vào database
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[get] /admin/products/edit/:id
module.exports.edit=async(req, res) => {
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const product=await Product.findOne(find);
        console.log(product);
        res.render("admin/pages/product/edit",{
            pageTitle:"Chỉnh Sửa Sản Phẩm",
            product:product
       });    
    } catch (error) {
        req.flash("error", `không tồn tại id sản phẩm này.`); 
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editPatch=async(req, res) => {
    const id=req.params.id;
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt( req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.position=parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({_id:id},req.body);
        req.flash("success", `Cập nhật thành công.`);       
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
        req.flash("error", `Cập nhật thất bại!.`); 
    }
    res.redirect("back");
}

//[get] /admin/products/detail/:id
module.exports.detail=async(req, res) => {
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const product=await Product.findOne(find);
        res.render("admin/pages/product/detail",{
            pageTitle:product.title,
            product:product
       });    
    } catch (error) {
        req.flash("error", `không tồn tại id sản phẩm này.`); 
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}


