const SettingGeneral  = require("../../models/setting-general.model");
module.exports.settingGerenal =async (req,res,next) =>{
   const settingGerenal = await SettingGeneral.findOne({});
   res.locals.settingGerenal=settingGerenal;
    next();
}