'use strict';
const movePopUp = () => {
    try{
        const showEl = (el) => {
            el.style.display = 'block';
            el.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        };
        const hideEl = (el) => {
            if (!el){
                return;
            }
            el.style.display = 'none';
        };
        //Открытие разных POPUP
        document.body.addEventListener('click', (ev) => {
            const target = ev.target;
            if (target.closest('.call-btn')){ //При клике на эту надписи в header и footer 
                showEl(document.querySelector('.popup-call'));
            }
            if (target.closest('.discount-btn')){ //после нажатия на кнопку “Получить расчет и скидку” 
                showEl(document.querySelector('.popup-discount'));
            }
            if (target.closest('.check-btn')){ //При нажатии на кнопку “Получить чек-лист и скидку”
                showEl(document.querySelector('.popup-check'));
            }
            if (target.closest('.consultation-btn')){ //открывается модальное окно с классом popup-consultation
                showEl(document.querySelector('.popup-consultation'));
            }
        });
        //Закрытие POPUP
        document.body.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (ev.target.closest('.popup-close') || //нажатие на крестик
                !ev.target.closest('.popup-content') && !ev.target.closest('.contacts')){
                //нажатие на любой элемент страницы, кроме модального окна и кнопки вызова popup
                hideEl(ev.target.closest('.popup'));
            }
        });
    } catch(e){ 
        console.warn(e);
    }
};
export default movePopUp;