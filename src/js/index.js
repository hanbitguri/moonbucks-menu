const $ = (selector) => document.querySelector(selector)
const store = {
    setLocalStorage(menu){
        localStorage.setItem('menu',JSON.stringify(menu))
    },
    getLocalStorage(){
        localStorage.getItem('menu')
    },
    
}
function App(){
    
    this.menu=[];
    $('#espresso-menu-form').addEventListener('submit',(e)=>{
        e.preventDefault();
    })

    const addEspressoMenu = () =>{
            const espressoMenuName = $('#espresso-menu-name').value;
            this.menu.push( {name:espressoMenuName} )
            store.setLocalStorage(this.menu)
            const template = this.menu.map((item,index)=>{
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
            if(espressoMenuName==='') {
                alert('메뉴를 입력해주세요.')
                return
            }
                $('#espresso-menu-list').innerHTML =template;
                $('#espresso-menu-name').value=''
                updateMenuCount()
            
        
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
        console.log(menuId)

        this.menu[menuId].name=updatedMenuName;
        console.log(2)
        store.setLocalStorage(this.menu)
    }
    const removeMenu = (e) =>{
        if(confirm('삭제하시겠습니까?')) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu.splice(menuId,1)
            store.setLocalStorage(this.menu)
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
    
}
const app = new App();
