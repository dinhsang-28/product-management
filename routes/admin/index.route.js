const systemConfig=require("../../config/system");
const dashboardRoutes=require("./dashboard.route");
const productRoutes=require("./product.route");
const productCategogyRoutes=require("./product-categogy.route");
const roleRoutes=require("./role.route");
const accountRoutes=require("./account.routte");
const authRoutes=require("./auth.route");
const authMiddlesware=require("../../middleware/admin/auth.middleware");
const myAccountRoutes=require("./my-account.route");
const settingGerenalRoutes=require("./setting-general.route");
module.exports = (app) => {
    const PATH_ADMIN=systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN+"/dashboard",authMiddlesware.requireAuth,dashboardRoutes);

    app.use(PATH_ADMIN+"/products",authMiddlesware.requireAuth,productRoutes);

    app.use(PATH_ADMIN+"/products-categogy",authMiddlesware.requireAuth,productCategogyRoutes);

    app.use(PATH_ADMIN+"/roles",authMiddlesware.requireAuth,roleRoutes);
    app.use(PATH_ADMIN+"/accounts",authMiddlesware.requireAuth,accountRoutes);
    app.use(PATH_ADMIN+"/auth",authRoutes);
    app.use(PATH_ADMIN+"/my-account",authMiddlesware.requireAuth,myAccountRoutes);
    app.use(PATH_ADMIN+"/settings",authMiddlesware.requireAuth,settingGerenalRoutes);

}