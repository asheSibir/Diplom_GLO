const postData = () => {
try{
    const forms = document.querySelectorAll('form'),
        errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successsMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    forms.forEach(form => {
        const smallText = form.querySelector('.small');
        form.addEventListener('click', (ev) => {
            if(ev.target.name === 'submit'){
                form.querySelectorAll('input').forEach(input => {
                    if(input.value !== '' && !form.querySelector('#warn-div')){
                        ev.preventDefault();
                        smallText.textContent = loadMessage;
                        smallText.style.cssText = 'font-size: 2rem; color: #19b5fe';
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
                            console.log(852);  
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
                            }, 2000);
                            setTimeout(() => {
                                input.value = '';
                                smallText.textContent = '';
                            }, 5000);
                        });
                    }
                });
            }
        });
    });

} catch(e) {
    console.warn(e);
    } 
};
export default postData;