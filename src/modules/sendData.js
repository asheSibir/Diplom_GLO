'use strict';
const sendData = () => {
    try{
        const captureForm = document.querySelectorAll('.capture-form');

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
                warnDiv.textContent = 'Вы ввели некорректное значение! Пожалуйста, введите снова!'; 
                area.value = subj.slice(0, -1);         
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
                    ev.target.value = target.replace(/[\da-z\.\?\,!:;^%$#@\(\)\*_\+\=№'"!\/]/gi, '');
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

    } catch(e){
        console.warn(e);
    }
};

export default sendData;