const CategogyMiddleware = require("../../middleware/client/categogy.middleware");
const CartMiddleware = require("../../middleware/client/cart.middleware");
const UserMiddleware = require("../../middleware/client/user.middleware");
const SettingMiddleware = require("../../middleware/client/setting.middleware");
const authMiddleWare = require("../../middleware/client/auth.middleware");
const homeRoute = require("./home.route");
const productRouter = require("./product.route");
const searchRoutes = require("./serch.route");
const cartRoutes = require("./cart.route")
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const chatRoutes = require("./chat.route");
const usersRoutes = require("./users.route");
module.exports = (app) => {
  app.use(CategogyMiddleware.categogy);
  app.use(CartMiddleware.cartId);
  app.use(UserMiddleware.infoUser);
  app.use(SettingMiddleware.settingGerenal);
    app.use("/",homeRoute);

      app.use("/products",productRouter);
      app.use("/search",searchRoutes);
      app.use("/cart",cartRoutes);
      app.use("/checkout",checkoutRoutes);
      app.use("/user",userRoutes);
      app.use("/chat",authMiddleWare.requireAuth,chatRoutes);
      app.use("/users",authMiddleWare.requireAuth,usersRoutes);
    //   app.get('/products', async(req, res) => {
    //     res.render("client/pages/products/index");
    //     })
}