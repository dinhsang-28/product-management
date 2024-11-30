module.exports=( objectpagination,query,countProducts)=>{
    if(query.page){
        objectpagination.currentPage=parseInt(query.page);
    }
    objectpagination.skip=(objectpagination.currentPage - 1)*objectpagination.limitItems;
    //tính tổng số trang
    const totalpage=Math.ceil(countProducts/objectpagination.limitItems);
    objectpagination.totalpage=totalpage;
    return objectpagination;
}