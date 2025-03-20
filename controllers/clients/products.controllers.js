const Product=require("../../models/product.model");
const ProductCategogy = require("../../models/product-categogy.model");
const productsHelper = require("../../Helpers/products");
const  ProductCategogyHelper = require("../../Helpers/product-categogy");
module.exports.index=async(req, res) => {
    const products = await Product.find({
        status:"active",
        deleted:false
    })
    .sort({position:"desc"});

    const newProduct=productsHelper.priceNewProducts(products);
    // console.log(products);
    res.render("client/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        products:newProduct
    });
    }

module.exports.detail=async(req,res) => {
    try {
        const find={    
            deleted:false,
            slug:req.params.slugProduct,
            status:"active"
        }
        const product=await Product.findOne(find);
        if(product.product_categogy_id){
            const categogy = await ProductCategogy.findOne({
                _id:product.product_categogy_id,
                status:"active",
                deleted:false
            });
            product.categogy=categogy;
        }
          product.priceNew = productsHelper.priceNewProduct(product);
        // console.log(product);
        res.render("client/pages/products/detail",{
            pageTitle:product.title,
            product:product
       });    
    } catch (error) {
        req.flash("error", `không tồn tại id sản phẩm này.`); 
        res.redirect(`/products`);
    }
}
//[get] /products/:slug
module.exports.categogy=async(req,res) => {
   console.log(req.params.slugCategogy)
   const categogy = await ProductCategogy.findOne({
    slug:req.params.slugCategogy,
    status:"active",
    deleted:false
   });

   

   const listSubCategogy = await ProductCategogyHelper.getSubCategogy(categogy.id);
   
   const listSubCategogyID = listSubCategogy.map(item => item.id);

   console.log(listSubCategogyID);

   const products= await Product.find({
    product_categogy_id:{$in:[categogy.id , ...listSubCategogyID]},
    deleted:false
   }).sort({position:"desc"});
   const newProduct=productsHelper.priceNewProducts(products);

   res.render("client/pages/products/index",{
    pageTitle:categogy.title,
    products:newProduct
});
}