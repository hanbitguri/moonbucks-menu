const BASE_URL = 'http://localhost:3000'
const MenuApi = {
    async getCategoryMenu(category){
        const response = await fetch(`${BASE_URL}/api/category/${category}/menu`)
        return response.json();
    },
    async createMenu(name,category){
        const response = await fetch(`${BASE_URL}/api/category/${category}/menu`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name})
        })
    },
    async updateMenu(name,category,menuId){
        const response = await fetch(`${BASE_URL}/api/category/${category}/menu/${menuId}`,{
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name})
        })
        return response.json();
    },
    async soldoutMenu(category,menuId){
        const response = await fetch(`${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`,{
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({menuId})
        })
        return response.json();
    },
    async removeMenu(category,menuId){
        fetch(`${BASE_URL}/api/category/${category}/menu/${menuId}`,{
            method:'DELETE'
        })
    }
}
export default MenuApi;