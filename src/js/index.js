const $ = (selector) => document.querySelector(selector)
const store = {
    setLocalStorage(menu){
        localStorage.setItem(`menu`,JSON.stringify(menu))
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem('menu'))
    },
    
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
        if(store.getLocalStorage()) {
            this.menu[this.currentCategory] = store.getLocalStorage();
            this.render()
        }
    }
    this.render = () => {
        const template = this.menu[this.currentCategory].map((item,index)=>{
            return `
            <li class="menu-list-item d-flex items-center py-2" data-menu-id='${index}'>
                <span class="w-100 pl-2 menu-name">${item.name}</span>
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
        $('#espresso-menu-list').innerHTML =template;
        updateMenuCount()
    }
    $('#espresso-menu-form').addEventListener('submit',(e)=>{
        e.preventDefault();
    })

    const addEspressoMenu = () =>{
            const espressoMenuName = $('#espresso-menu-name').value;
            this.menu[this.currentCategory].push( {name:espressoMenuName} )
            this.render(); 
            store.setLocalStorage(this.menu[this.currentCategory])
            $('#espresso-menu-name').value=''
           
            if(espressoMenuName==='' ) {
                alert('메뉴를 입력해주세요.')
                return
            }
            
        
    }
    const updateMenuCount = () =>{
        let menuCount =  $('#espresso-menu-list').querySelectorAll('li').length
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

    $('#espresso-menu-submit-button').addEventListener('click',addEspressoMenu)
    $('#espresso-menu-name').addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            addEspressoMenu();
        }
    })
    $('#espresso-menu-list').addEventListener('click',(e)=>{
        if(e.target.innerText==='수정') {
            modifyMenu(e);
        }
    })
    $('#espresso-menu-list').addEventListener('click',(e)=>{
        if(e.target.innerText==='삭제') {
           removeMenu(e);
        }
    })
    $('.global-nav').addEventListener('click',(e)=>{
        const isCategoryButton=e.target.classList.contains('cafe-category-name')
        if(isCategoryButton) {
            const categoryName = e.target.dataset.categoryName
            console.log(this.currentCategory);
        }
    })
    
}
const app = new App();
app.init()
