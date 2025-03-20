// show-alert
const showalert=document.querySelector("[show-alert]");
if(showalert){
    const time = parseInt(showalert.getAttribute("data-time"));
    const closeAleart=showalert.querySelector("[close-alert]");
    setTimeout(()=>{
        showalert.classList.add("alert-hidden");
    },time)
    closeAleart.addEventListener("click",()=>{
        showalert.classList.add("alert-hidden");
    })
}

// END show-alert