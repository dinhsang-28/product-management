const Chat = require("../../models/chat.model");
const uploadToCloudinary = require("../../Helpers/uploadToCloudinary"); 
module.exports = (res) => {
    const userId=res.locals.user.id;
    const fullname = res.locals.user.fullname;
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data)=>{
         let images = [];
         for (const image of data.images) {
             const link = await uploadToCloudinary(image);
             images.push(link);
         }
         console.log(images);
         // Lưu vaod database
         const chat = new Chat({
             user_id:userId,
             content:data.content,
             images:images
         });
         await chat.save();
         // trả data về cho client
         _io.emit("SERVER_RETURN_MESSAGE",{
             userId:userId,
             fullname:fullname,
             content:data.content,
             images:images 
         })
        })
       
         socket.on("CLIENT_SEND_TYPING", async (type)=>{
             socket.broadcast.emit("SERVER_RETURN_TYPING",{
                 userId:userId,
                 fullname:fullname,
                 type:type
             })
         })
       });
}