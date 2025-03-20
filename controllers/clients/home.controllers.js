const Product = require("../../models/product.model");
const productsHelper = require("../../Helpers/products");
module.exports.index=async(req, res) => {
    // Lấy sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured:1,
        deleted:false,
        status:"active"
    })
    const newProductsFeatured=productsHelper.priceNewProducts(productFeatured);
    //Hết lấy sản phẩm nổi bật

    // Lấy sản phẩm mới nhất
    const productNew=await Product.find({
        deleted:false,
        status:"active"
    }).sort({position:"desc"}).limit(6);
    const newproductNew=productsHelper.priceNewProducts(productNew);
    // Hết lấy sản phẩm mới nhất
    res.render("client/pages/home/index",{
        pageTitle:"Trang Chủ",
        productFeatured:newProductsFeatured,
        productNew:newproductNew
    });
  }