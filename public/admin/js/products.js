const buttonchangeStatus=document.querySelectorAll("[ button-change-status]");
if(buttonchangeStatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status");
    const path =formChangeStatus.getAttribute("data-path");

    buttonchangeStatus.forEach(button => {
    button.addEventListener("click",()=>{
        const status =button.getAttribute("data-status");
        const id=button.getAttribute("data-id");
        let newStatus= status=="active"?"inactive":"active";
        const action=path+`/${newStatus}/${id}?_method=PATCH`;
        formChangeStatus.action=action;
        formChangeStatus.submit();
    })
    })
}
//delete item
const buttonDelete =document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-id");
    const patch=formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click",()=>{
            const isconfirm=confirm("Bạn có chắc chắn muốn xoá?");
            if(isconfirm){
                const id=button.getAttribute("data-id");
                const action=`${patch}/${id}?_method=DELETE`;
                console.log(action);
                formDeleteItem.action=action;
                formDeleteItem.submit();
            }
        })
    })
}
//END delete item