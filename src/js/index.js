import MenuApi from "./api/api.js";
import $ from "./utils/func.js";

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
    this.render = async () => {
        this.menu[this.currentCategory] = await MenuApi.getCategoryMenu(this.currentCategory)
        const template = this.menu[this.currentCategory].map((item)=>{
            return `
            <li class="menu-list-item d-flex items-center py-2" data-menu-id='${item.id}'>
                <span class="${item.isSoldOut ? 'sold-out ' : ''}w-100 pl-2 menu-name">${item.name}</span>
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
            await MenuApi.createMenu(menuName,this.currentCategory) 
            this.render(); 
            $('#menu-name').value=''
           
            
            
    }
    const updateMenuCount = () =>{
        let menuCount =  $('#menu-list').querySelectorAll('li').length
        $('.menu-count').innerText = `총 ${menuCount}개`
        
    }
    const modifyMenu = async (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const updatedMenuName = prompt('메뉴를 수정하세요.', $menuName.innerText);
        await MenuApi.updateMenu(updatedMenuName,this.currentCategory,menuId)
        this.render();
    }
    const removeMenu = async (e) =>{
        if(confirm('삭제하시겠습니까?')) {
            const menuId = e.target.closest("li").dataset.menuId;
            await MenuApi.removeMenu(this.currentCategory,menuId)
            this.render();
            updateMenuCount()
        } 
    }
    const soldoutMenu = async (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        await MenuApi.soldoutMenu(this.currentCategory,menuId)
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

    $('.global-nav').addEventListener('click',async (e)=>{
        const isCategoryButton=e.target.classList.contains('cafe-category-name')
        if(isCategoryButton) {
            const categoryName = e.target.dataset.categoryName
            this.currentCategory = categoryName;
            $('.category-title').innerText = `${e.target.innerText} 메뉴 관리`
            this.menu[this.currentCategory] = await MenuApi.getCategoryMenu(this.currentCategory)
            this.render()
        }
    })
    
}
const app = new App();
app.init()
