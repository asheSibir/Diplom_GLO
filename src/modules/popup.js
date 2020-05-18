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
            if (target.closest('.contacts')){
                showEl(document.querySelector('.popup-call'));
            }
            if (target.closest('.discount-btn')){
                showEl(document.querySelector('.popup-discount'));
            }
            if (target.closest('.check-btn')){
                showEl(document.querySelector('.popup-check'));
            }
            if (target.closest('.consultation-btn')){
                showEl(document.querySelector('.popup-consultation'));
            }
        });
        //Закрытие POPUP
        document.body.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (ev.target.closest('.popup-close') || //нажатие на крестик
                ev.target.closest('.popup-content') && ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'BUTTON' ||
                //нажатие на поле popup, кроме инпутов и кнопки
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