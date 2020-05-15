'use strict';
const sendData = () => {
    try{
        const captureForm = document.querySelectorAll('.capture-form'),
         btnCaptureForm = document.querySelectorAll('.capture-form-btn');
        //ВАЛИДАЦИЯ ВВОДОВ
        const validate = (data) => {
            const showMistake = (subj, area) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: red; border: 2px solid red;`;
                const warnDiv = document.createElement('div');
                warnDiv.id = 'warn-div';
                warnDiv.style.cssText = `font-size: 11px; color: red;`;
                area.insertAdjacentElement('beforebegin', warnDiv);
                warnDiv.textContent = 'Вы ввели некорректное значение! Пожалуйста, проверьте!'; 
                //area.value = subj.slice(0, -1);         
            };
            const hideMistake = (subj, area) => {
                if (document.getElementById('warn-div')){
                    document.getElementById('warn-div').remove();
                }
                area.style.cssText = `color: ''; border: '';`;     
            };
            data.addEventListener('input', (ev) => {
                const target = ev.target.value;
                if (ev.target.matches('[name="user_name"]')){
                    if (/[\da-z\.\?\,!:;^%$#@\(\)\*_\+\=№'"!\/]/gi.test(ev.target.value)){
                        showMistake(target, ev.target);
                        //ev.target.value = target.replace(/[\da-z\.\?\,!:;^%$#@\(\)\*_\+\=№'"!\/]/gi, '');
                    } else {
                        hideMistake(target, ev.target);
                    }
                    
                }
                if (ev.target.matches('[name="user_phone"]')){
                    if(ev.target.value.length === 1){
                        if (!/[\d+]/.test(target)){
                            showMistake(target, ev.target);
                        } else {
                            hideMistake(target, ev.target);
                        }
                    }
                    if(ev.target.value.length > 1){
                        if (!/\d/.test(target.slice(-2,-1))){
                            showMistake(target, ev.target);
                        } else {
                            hideMistake(target, ev.target);
                        }
                    }
                }
            });
        };
        captureForm.forEach(form => {
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
        const sendAjax = (target, ev) => {
            ev.preventDefault();
            const forma = target.parentNode;
            const formData = new FormData(forma);
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
            postData(body)
                .then((resp) => {
                    if (resp !== 200){
                        throw new Error();
                    }
                })
                .then((data) => console.log(data))
                .catch((err) => console.warn(err.statusText));
        };
        //ИЗ POPUP
        btnCaptureForm.forEach((btn) => {
            if (btn.closest('.popup')){
                btn.addEventListener('click', (ev) =>{
                    sendAjax(btn, ev);
                });
            }
        });
    } catch(e){
        console.warn(e);
    }
};

export default sendData;