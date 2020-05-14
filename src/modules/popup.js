'use strict';
const movePopUp = () => {
    try{
        
        const contacts = document.querySelectorAll('.contacts'),
            popupCall = document.querySelector('.popup-call'),
            btnPopupClose = document.querySelector('.popup-close');

        const showEl = (el) => {
            el.style.display = 'block';
        };
        const hideEl = (el) => {
            el.style.display = 'none';
        };

        contacts.forEach(block => {
            block.addEventListener('click', (ev) => {
                showEl(popupCall);
            });
        });
        document.body.addEventListener('click', (ev) => {
            if (ev.target === btnPopupClose || //нажатие на крестик
                ev.target.closest('.popup-content') && ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'BUTTON' ||
                //нажатие на поле popup, кроме инпутов и кнопки
                !ev.target.closest('.popup-content') && !ev.target.closest('.contacts')){
                //нажатие на любой элемент страницы, кроме модального окна и кнопки вызова popup
                hideEl(popupCall);
            }
        });
    } catch(e){ 
        console.warn(e);
    }
};
export default movePopUp;