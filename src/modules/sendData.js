'use strict';
const sendData = () => {
    try{
        const forms = document.querySelectorAll('form'),
            errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successsMessage = 'Спасибо! Мы скоро с Вами свяжемся!';  
        
        //ВАЛИДАЦИЯ ВВОДОВ
        const validate = (data) => {
            const showMistake = (area) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: red; border: 2px solid red;`;
                const warnDiv = document.createElement('div');
                warnDiv.id = 'warn-div';
                warnDiv.style.cssText = `font-size: 11px; color: red;`;
                area.insertAdjacentElement('beforebegin', warnDiv);
                warnDiv.textContent = 'Вы ввели некорректное значение! Пожалуйста, проверьте!';        
            };
            const hideMistake = (area) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: ''; border: '';`;     
            };
            data.addEventListener('input', (ev) => {
                const target = ev.target.value;
                if (ev.target.matches('[name="user_name"]') || ev.target.matches('[name="user_quest"]')){
                    if (/[\da-z\.\?\,!:;^%$#@\(\)\*_\+\=№'"!\/]/gi.test(ev.target.value)){
                        showMistake(ev.target);
                    } else {
                        hideMistake(ev.target);
                    }
                }
                if (ev.target.matches('[name="user_phone"]')){
                    
                    if (/[a-zа-я\s\-\.\?\,!:;^%$#@\(\)\*_\=#'"\/]/gi.test(target) || 
                    /[a-zа-я\s\-\.\?\,!:;^%$#@\(\)\*_\=#'"\/]/gi.test(target.slice(-1))){
                        showMistake(ev.target);
                    } else {
                        hideMistake(ev.target);
                    }
                }
            });
        };
        forms.forEach(form => {
            validate(form);
        });
        
        //ЛОАДЕР
        const preloader = () => {
            return `
            <div id="loader" class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
        }; 
        
        //ОТПРАВКА ФОРМЫ 
        document.addEventListener('submit', (ev) => {
            console.log(ev);
        });
        forms.forEach((form) => {
            form.addEventListener('submit', (ev) => {
                console.log(111);
            });    
        });

    } catch(e){
        console.warn(e);
    }
};

export default sendData;