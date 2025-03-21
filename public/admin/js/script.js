console.log("ok");
const buttonStatus=document.querySelectorAll("[button-status]");
if(buttonStatus.length>0){
    let url =new URL(window.location.href);
    console.log(url);
    buttonStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const status=button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status);
            }
            else {
                url.searchParams.delete("status");
            }
            console.log(url.href);
            window.location.href=url.href;
        })
    })
}
// FORM SEARCH
const formSearch=document.querySelector("#form-search");
if(formSearch){
    let url =new URL(window.location.href);
formSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    const keyword=e.target.elements.keyword.value;
    if(keyword){
        url.searchParams.set("keyword",keyword);
    }
    else {
        url.searchParams.delete("keyword");
    }
    window.location.href=url.href;
})
}
// END FORM SEARCH
// pagination
const buttonPagination=document.querySelectorAll("[ button-pagination]");
if(buttonPagination.length>0){
    let url =new URL(window.location.href);
    buttonPagination.forEach(button =>{
        button.addEventListener("click",()=>{
           const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href=url.href;
        })
    })
}
// END pagination
// checkbox-multi
const checkboxMulti=document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked=true;
            })
        }
        else{
            inputsId.forEach(input => {
                input.checked=false;
            })
        }

    })
    inputsId.forEach((input) => {
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==inputsId.length){
                inputCheckAll.checked=true;
            }
            else{
                inputCheckAll.checked=false;
            }
        })
    })
}
// END checkbox-multi

//form change-multi
    const formChangeMulti=document.querySelector("[form-change-multi]");
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit",(e)=>{
            e.preventDefault();
            const checkboxMulti=document.querySelector("[checkbox-multi]");
            const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            const typeChange=e.target.elements.type.value;
            if(typeChange=="deleted-all"){
                const isconfirm=confirm("Bạn có chắc chắn muốn xoá các cột đã chọn?");
                if(!isconfirm){
                    return;
                }
            }

            if(inputsChecked.length>0){
                let ids=[];
                const inputIds=formChangeMulti.querySelector("input[name='ids']");
                inputsChecked.forEach(input => {
                    const id=input.value;
                    if(typeChange=="change-position"){
                        const position =input.closest("tr").querySelector("input[name='position']").value;
                        ids.push(`${id}-${position}`);
                    }
                    else{
                        ids.push(id);
                    }
                   
                })
                inputIds.value=ids.join(", ");
                formChangeMulti.submit();
            }
            else{
                alert("vui lòng chọn ít nhất một bản ghi");
            }

        })
    }


//END form change-multi

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

//Upload Image Preview
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInuput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");
    const deleteImagePreview=document.querySelector("[delete-image-preview]");
    uploadImageInuput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
            // uploadImageInuput.getElementsByClassName.add("btn-deletedNone");
        }
    })
    deleteImagePreview.addEventListener("click",(e)=>{     
            uploadImageInuput.value="";
            uploadImagePreview.src="";

    })
}

//END Upload Image Preview
// sort
    const sort=document.querySelector("[sort]");
    if(sort){
        let url =new URL(window.location.href);
        const sortSelect=sort.querySelector("[sort-select]");
        const sortClear=sort.querySelector("[sort-clear]");
        //sắp xếp
        sortSelect.addEventListener("change",(e)=>{
            const value=e.target.value;
            const [sortkey,sortValue]=value.split("-");
            url.searchParams.set("sortkey",sortkey);
            url.searchParams.set("sortValue",sortValue);

            window.location.href=url.href;
        })
        // xoá sắp xếp
        sortClear.addEventListener("click",()=>{
            url.searchParams.delete("sortkey");
            url.searchParams.delete("sortValue");

            window.location.href=url.href;
        })
        //thêm selected cho option
         const sortkey = url.searchParams.get("sortkey");
         const sortValue =   url.searchParams.get("sortValue");
         if(sortkey && sortValue){
            const stringSort = `${sortkey}-${sortValue}`;
            const optionSelected=sortSelect.querySelector(`option[value='${stringSort}']`);
            optionSelected.selected=true;
         }
    }
// END sort


