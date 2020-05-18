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
        // forms.forEach((form) => {
        //     const submit = form.querySelector('[name="submit"]');
        //     submit.remove();
        // });
        

        //ОТПРАВКА ФОРМЫ 
        forms.forEach((form) => {
            const spinner = preloader();
            form.addEventListener('submit', (ev) => {
                event.preventDefault();
                const smallText = form.querySelector('.small'),
                smallMessage = smallText.textContent;
                smallText.textContent = loadMessage;
                smallText.style.cssText = 'font-size: 2rem; color: #19b5fe';
                if (!document.getElementById('loader')){
                    form.insertAdjacentHTML('beforeend', spinner); 
                }
                const formData = new FormData(form);
                let body = {};
                for (let val of formData.entries()) {
                body[val[0]] = val[1];
                }
                const postData = (body, form) => { 
                    return fetch('server.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body), 
                        credentials: 'include'
                    }); 
                };
                postData(body, form)
                .then((response) => {
                    if(response.status !== 200){
                        throw new Error(response.statusText);
                    }
                    return response.body;                    
                })
                .then((data) => {
                    smallText.textContent = successsMessage;
                    setTimeout(() => {
                        form.closest('.popup').style.display = 'none';
                        smallText.textContent = smallMessage;
                        smallText.style = '';
                        document.getElementById('loader').remove();
                    }, 3000);
                })
                .catch((err) => {
                    console.warn(err);
                    smallText.textContent = errorMessage;
                    
                    setTimeout(() => {
                        smallText.textContent = 'Попробуйте еще раз или позвоните нам! Мы ответим на все Ваши вопросы';
                        smallText.style.cssText = `
                        font-size: 1.5rem;
                        font-weight: bold;
                        padding: 0 3.3em;
                        color: #f3960d;
                        `;
                        //document.getElementById('loader').style.display = "none";
                    }, 3000);
                });
            });
        });

    } catch(e){
        console.warn(e);
    }
};

export default sendData;