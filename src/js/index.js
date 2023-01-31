const $ = (selector) => document.querySelector(selector)
const store = {
    setLocalStorage(menu){
        localStorage.setItem(`menu`,JSON.stringify(menu))
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem('menu'))
    },
    
}
const BASE_URL = 'http://localhost:3000'
const MenuApi = {
    async getCategoryMenu(category){
        const response = await fetch(`${BASE_URL}/api/category/${category}/menu`)
        return response.json();
    }
}
function App(){
    this.menu={
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert : [],
    };
    this.currentCategory = 'espresso';
    this.init = () =>{
        this.menu[this.currentCategory]= MenuApi.getCategoryMenu(this.currentCategory)
        
    }
    this.render = () => {
        const template = this.menu[this.currentCategory].map((item,index)=>{
            return `
            <li class="menu-list-item d-flex items-center py-2" data-menu-id='${index}'>
                <span class="${this.menu[this.currentCategory][index].isSoldout ? 'sold-out ' : ''}w-100 pl-2 menu-name">${item.name}</span>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
                품절
              </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
            </li>`;
        }).join('')
        $('#menu-list').innerHTML = template;
        updateMenuCount()
    }
    $('#menu-form').addEventListener('submit',(e)=>{
        e.preventDefault();
    })

    const addMenu = async () =>{

            const menuName = $('#menu-name').value;
            if(menuName==='' ) {
                alert('메뉴를 입력해주세요.')
                return
            }
           await fetch(`${BASE_URL}/api/category/${this.currentCategory}/menu`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name:menuName})
            })
            this.menu[this.currentCategory]= await MenuApi.getCategoryMenu(this.currentCategory)
            
            this.render(); 
            $('#menu-name').value=''
           
            
            
    }
    const updateMenuCount = () =>{
        let menuCount =  $('#menu-list').querySelectorAll('li').length
        $('.menu-count').innerText = `총 ${menuCount}개`
        
    }
    const modifyMenu = (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const updatedMenuName = prompt('메뉴를 수정하세요.', $menuName.innerText);
        $menuName.innerText = updatedMenuName;
        
        this.menu[this.currentCategory][menuId].name=updatedMenuName;
        
        store.setLocalStorage(this.menu[this.currentCategory])
    }
    const removeMenu = (e) =>{
        if(confirm('삭제하시겠습니까?')) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId,1)
            store.setLocalStorage(this.menu[this.currentCategory])
            e.target.closest('li').remove()
            updateMenuCount()
        } 
    }
    const soldoutMenu = (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].isSoldout = !this.menu[this.currentCategory][menuId].isSoldout;
        store.setLocalStorage(this.menu[this.currentCategory])
        this.render();

    }

    $('#menu-submit-button').addEventListener('click',addMenu)
    $('#menu-name').addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            addMenu();
        }
    })
    $('#menu-list').addEventListener('click',(e)=>{
        if(e.target.innerText==='수정') {
            modifyMenu(e);
            return
        }
        if(e.target.innerText==='삭제') {
           removeMenu(e);
           return
        }
        if(e.target.innerText==='품절') {
            soldoutMenu(e);
            return
         }

    })

    $('.global-nav').addEventListener('click',(e)=>{
        const isCategoryButton=e.target.classList.contains('cafe-category-name')
        if(isCategoryButton) {
            const categoryName = e.target.dataset.categoryName
            this.currentCategory = categoryName;
            $('.category-title').innerText = `${e.target.innerText} 메뉴 관리`
            
            this.render()
        }
    })
    
}
const app = new App();
app.init()
