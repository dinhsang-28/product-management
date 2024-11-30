const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session')
//env
require('dotenv').config();
//route
const routeAdmin=require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
//config
const systemConfig=require("./config/system");
//kết nối data
 const data = require("./config/database");
 data.connect();
 //app
const app = express();
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//FLASH
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//END FLASH


//Port env
const port = process.env.PORT;

//pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//App locals variables
app.locals.prefixAdmin =systemConfig.prefixAdmin;

//nhúng file tĩnh
app.use(express.static(`${__dirname}/public`))
//route
routeAdmin(app);
route(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})