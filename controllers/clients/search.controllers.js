const Product=require("../../models/product.model");
const productsHelper = require("../../Helpers/products");

//[GET]
module.exports.index=async (req,res) => {
    const keyword = req.query.keyword;
    let newProducts = [];

    if(keyword){
        const regex = new RegExp(keyword,"i"); // tìm kiếm , i là không phân biệt chữ hoa và chữ thường 
        const products = await Product.find({
            title:regex,
            deleted:false,
            status:"active"
        })
        newProducts=productsHelper.priceNewProducts(products)
    }
    res.render("client/pages/search/index",{
        pageTitle:"Kết quả tìm kiếm",
        keyword:keyword,
        products:newProducts
    });
}