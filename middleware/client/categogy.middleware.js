const ProductCategogy = require("../../models/product-categogy.model");
const createTreeHelper=require("../../Helpers/createTree");
module.exports.categogy =async (req,res,next)=>{
    const productsCategogy= await ProductCategogy.find({
        deleted:false
    })
    const newProductsCategogy=createTreeHelper.Tree( productsCategogy);
    res.locals.layoutProductsCategogy=newProductsCategogy;
    next();
}