const postForma = () => {
    try{
        const forms = document.querySelectorAll('form'),
        errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successsMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
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
            const btnText = submit.innerText,
            inputs = form.querySelectorAll('input');
            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
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
                        form.insertAdjacentHTML('beforeend', preloader);
                        document.getElementById('loader').style.zIndex = 10;
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
                        postData(body)
                        .then((response) => {
                            if(response.status !== 200){
                                throw new Error(response.statusText);
                            }                 
                        })
                        .then((data) => {
                            document.getElementById('loader').remove();
                            setTimeout(() => {
                                submit.innerText = successsMessage;
                            }, 500);
                            setTimeout(() => {
                                submit.innerText = btnText;
                            }, 4000);
                            setTimeout(() => {
                                submit.closest('.popup').display = 'none';
                                inputs.forEach(input => input.value = '');
                            }, 8000);
                        })
                        .catch((err) => {
                            console.warn(err);
                            submit.innerText = errorMessage;
                            setTimeout(() => {
                                submit.innerText = `Попробуйте попозже. 
                                Или перезвоните нам!`;
                            }, 4000);
                            setTimeout(() => {
                                inputs.forEach(input => input.value = '');
                                submit.innerText = btnText;
                            }, 8000);
                        });
            });
        });
    } catch(e) {
        console.warn(e);
    }
    
}
export default postForma;