const BASE_URL = 'http://localhost:3000'
const HTTP_OPTIONS = {
    POST(data){
        return {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }
    },
    PUT(data){
        return {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:data ? JSON.stringify(data) : null
        }
    },
    DELETE(data){
        return{
            method:"DELETE",
        }
    }
}
const dataFetch = async (url,option) =>{
    const response = await fetch(url,option)
    if(!response.ok){
        alert('에러가 발생했습니다.')
    
    }
    return response.json();
}
const fetchWithOutData=async(url,option)=>{
    await fetch(url,option)
}
const MenuApi = {
    async getCategoryMenu(category){
        return dataFetch((`${BASE_URL}/api/category/${category}/menu`))
    },
    async createMenu(name,category){
       
        
        dataFetch(`${BASE_URL}/api/category/${category}/menu`,HTTP_OPTIONS.POST({name}))
    },
    async updateMenu(name,category,menuId){
       
       return dataFetch(`${BASE_URL}/api/category/${category}/menu/${menuId}`,HTTP_OPTIONS.PUT({name}))
        
    },
    async soldoutMenu(category,menuId){
       
        return dataFetch(`${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`,HTTP_OPTIONS.PUT())
    },
    async removeMenu(category,menuId){

       return fetchWithOutData(`${BASE_URL}/api/category/${category}/menu/${menuId}`,HTTP_OPTIONS.DELETE())
    }
}
export default MenuApi;