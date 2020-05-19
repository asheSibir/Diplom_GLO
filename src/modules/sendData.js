'use strict';
const sendData = () => {
    try{
        const forms = document.querySelectorAll('form'),
            errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successsMessage = 'Спасибо! Мы скоро с Вами свяжемся!';  
        
        //ВАЛИДАЦИЯ ВВОДОВ
        const validate = (data) => {
            const showMistake = (area, form) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: red; border: 2px solid red;`;
                const warnDiv = document.createElement('div');
                warnDiv.id = 'warn-div';
                warnDiv.style.cssText = `font-size: 11px; color: red;`;
                area.insertAdjacentElement('beforebegin', warnDiv);
                warnDiv.textContent = 'Вы ввели некорректное значение! Пожалуйста, проверьте!';  
                form.querySelector('[name="submit"]').classList.add('hidden');
            };
            const hideMistake = (area, form) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: ''; border: '';`;
                form.querySelector('[name="submit"]').classList.remove('hidden');     
            };
            data.addEventListener('input', (ev) => {
                const target = ev.target.value;
                if (ev.target.matches('[name="user_name"]') || ev.target.matches('[name="user_quest"]')){
                    if (/[\da-z\.\?\,!:;^%$#@\(\)\*_\+\=№'"!\/]/gi.test(ev.target.value)){
                        showMistake(ev.target, data);
                    } else {
                        hideMistake(ev.target, data);
                    }
                }
                if (ev.target.matches('[name="user_phone"]')){
                    
                    if (/[a-zа-я\s\-\.\?\,!:;^%$#@\(\)\*_\=#'"\/]/gi.test(target) || 
                    /[a-zа-я\s\-\.\?\,!:;^%$#@\(\)\*_\=#'"\/]/gi.test(target.slice(-1))){
                        showMistake(ev.target, data);
                    } else {
                        hideMistake(ev.target, data);
                    }
                }
            });
        };
        forms.forEach(form => {
            validate(form);
        });
        //ЛОАДЕР
        const preloader = 
        `<div id="loader" class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`; 

        // ОТПРАВКА ДАННЫХ
        forms.forEach(form => {
            
                
                const submit = form.querySelector('[name="submit"]');
                const btnText = submit.innerText;
                form.addEventListener('click', (ev) => {
                    if(ev.target.name === 'submit'){
                        form.querySelectorAll('input').forEach(input => {
                            if(input.value !== '' && !form.querySelector('#warn-div')){
                                ev.preventDefault();
                                
                                if(!form.classList.contains('director-form')){
                                    form.insertAdjacentHTML('beforeend', preloader);
                                    document.getElementById('loader').style.zIndex = 10;
                                    // Сообщение статусе ЗАГРУЗКА
                                    const showMessage = () => {
                                    const textLength = loadMessage.length,
                                        textArr = loadMessage.split('');
                                    let count = 0;
                                    submit.innerText = ' ';
                                    let showStatus;
                                    let aliveStatus = () => {
                                    showStatus = requestAnimationFrame(aliveStatus);
                                        if (count < textLength){
                                            submit.innerText += textArr[count];
                                            count++;
                                        }
                                    };
                                    showStatus = requestAnimationFrame(aliveStatus);
                                };
                                showMessage();
                                }
                                
                                const formData = new FormData(form); 
                                let body = {};
                                for (let val of formData.entries()) {
                                body[val[0]] = val[1];
                                }
                                const postData = (body) => { 
                                    return fetch('server.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(body), 
                                        credentials: 'include'
                                    }); 
                                };
                                const successFin = () => {
                                    if(!form.classList.contains('director-form')){
                                        if (document.getElementById('loader')){
                                            document.getElementById('loader').remove();
                                        }
                                        setTimeout(() => {
                                            submit.innerText = successsMessage;
                                        }, 500);
                                        setTimeout(() => {
                                            submit.innerText = btnText;
                                        }, 4000);
                                        setTimeout(() => {
                                            submit.closest('.popup').display = 'none';
                                            input.value = '';
                                            form.closest('.popup').style.display = 'none';
                                        }, 8000);
                                    }                                    
                                }
                                postData(body)
                                .then((response) => {
                                    if(response.status !== 200){
                                        throw new Error(response.statusText);
                                    }              
                                })
                                .then((data) => {
                                    successFin();
                                })
                                .catch((err) => {
                                    console.warn(err);
                                    submit.innerText = errorMessage;
                                    document.getElementById('loader').remove();
                                    setTimeout(() => {
                                        submit.innerText = `Попробуйте попозже. 
                                        Или перезвоните нам!`;
                                    }, 4000);
                                    setTimeout(() => {
                                        input.value = '';
                                        submit.innerText = btnText;
                                    }, 8000);
                                });
                            }
                        });
                    }
                });
            
        });
    } catch(e){
        console.warn(e);
    }
};

export default sendData;