const ProductCategogy = require("../models/product-categogy.model");
module.exports.getSubCategogy =async (parentId)=>{
   const getCategogy = async (parentId) => {
        const subs = await ProductCategogy.find({
            parent_id:parentId,
            status:"active",
            deleted:false
        });
         let allsub = [...subs];
         for (const sub of subs) {
            const childs = await getCategogy(sub.id);
            allsub=allsub.concat(childs);
         }
         return allsub;
       }
       const result = await getCategogy(parentId);
       return result;
}