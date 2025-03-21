
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js";

const upload = new FileUploadWithPreview('upload-images',{
    multiple:true,
    maxFileCount:5
});
// file-upload-with-preview
// const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images');
// END file-upload-with-preview

//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray;
        console.log(images);
        if(content || images.length > 0){
            socket.emit("CLIENT_SEND_MESSAGE",{
                content:content,
                images:images
            });
            e.target.elements.content.value="";
            upload.resetPreviewPanel();
            socket.emit("CLIENT_SEND_TYPING","hidden");
        }
    })
}
//END CLIENT_SEND_MESSAGE
//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE",(data)=>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".chat .inner-list-typing");
    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlContent="";
    let htmImages="";
    if(myId == data.userId){
        div.classList.add("inner-outgoing");
    }
    else {
        htmlFullName=`<div class="inner-name">${data.fullname}</div>`;
        div.classList.add("inner-incoming");
    }
    if(data.content){
        htmlContent=`
        <div class="inner-content">${data.content}</div>
        `;
    }
    if(data.images.length > 0){
        htmlContent +=`<div class="inner-images">`
        for (const image of data.images) {
             htmlContent +=`<img src="${image}">`
        }
        htmlContent +=`</div>`
    }
    div.innerHTML=`
    ${htmlFullName}
    ${htmlContent}
    ${htmImages}`;
    body.insertBefore(div,boxTyping);
    bodyChat.scrollTop=bodyChat.scrollHeight;
    //Preview Images
    const gallery = new Viewer(div);
})
// END SERVER_RETURN_MESSAGE
//Scroll Chat
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop=bodyChat.scrollHeight;
}
// END Scroll Chat

//SHOW ICON CHAT
const buttonIcon = document.querySelector(".button-icon");
if(buttonIcon){
    const tooltip = document.querySelector('.tooltip');
Popper.createPopper(buttonIcon, tooltip);
buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}
//SHOW TYPING
var timeOut;
const showTypig = () => {
    socket.emit("CLIENT_SEND_TYPING","show");
    clearTimeout(timeOut);
  timeOut = setTimeout(()=>{
        socket.emit("CLIENT_SEND_TYPING","hidden");
    },5000);
}
//END SHOW TYPING

//Insert Icon To Input

const emojiPicker = document.querySelector("emoji-picker");
if(emojiPicker){
   const inputchat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener('emoji-click', (event) => {
       const icon = event.detail.unicode;
       inputchat.value=inputchat.value+icon;

       const end = inputchat.value.length;
       inputchat.setSelectionRange(end,end);
       inputchat.focus();
      showTypig();
});
//INPUT KEYUP

    inputchat.addEventListener("keyup",()=>{
        showTypig();
    })
    // END INPUT KEYUP
}
// END  Insert Icon To Input
//END SHOW ICON CHAT
// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if(elementListTyping){
    socket.on("SERVER_RETURN_TYPING",(data)=>{
        console.log(data);
        if(data.type == "show"){
            const bodyChat = document.querySelector(".chat .inner-body");
            const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if(!existTyping){
                const boxTyping = document.createElement("div");
            boxTyping.classList.add("box-typing");
            boxTyping.setAttribute("user-id",data.userId);
            boxTyping.innerHTML=`
            <div class="inner-name"> ${data.fullname} </div>
            <div class="inner-dots"> 
                <span></span> 
                <span></span> 
                <span></span> 
            </div>
            `;
            elementListTyping.appendChild(boxTyping);
            bodyChat.scrollTop=bodyChat.scrollHeight;
            }
        }
        else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if(boxTypingRemove){
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    })
}

// END SERVER_RETURN_TYPING
// Preview Full Images
const bodyChatPreviewImage = document.querySelector(".chat .inner-body");
if(bodyChatPreviewImage){
    const gallery = new Viewer(bodyChatPreviewImage);
}
// END Preview Full Images