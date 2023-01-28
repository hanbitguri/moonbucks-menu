function App(){
    const addEspressoMenuField = $('#espresso-menu-name')
    .addEventListener('keypress',(e)=>{
        if(e.key==='Enter') console.log(e.target.value)
    })
    const addEspressoMenuButton = document.querySelector('#espresso-menu-submit-button')
    const addEspressoForm = document.querySelector('#espresso-menu-form')
    .addEventListener('submit',(e)=>{
        e.preventDefault();
    })
}
const $ = (selector) => document.querySelector(selector)
App()