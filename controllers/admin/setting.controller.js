const SettingGeneral = require("../../models/setting-general.model");
//[GET] admin/settings/gerenal
module.exports.gerenal=async(req, res) => {
    const settingGerenal = await SettingGeneral.findOne({});
    res.render("admin/pages/settings/gerenal",{
         pageTitle:"Cài đặt chung",
         settingGerenal:settingGerenal
    });
}

//[PATCH] admin/settings/gerenal
module.exports.gerenalPatch=async(req, res) => {
    const settingGerenal = await SettingGeneral.findOne({});
    if(settingGerenal){
        await SettingGeneral.updateOne(
            { _id : settingGerenal.id },req.body
        )
    }else {
    const record = new SettingGeneral(req.body);
    await record.save();
    }
   res.redirect("back");
}