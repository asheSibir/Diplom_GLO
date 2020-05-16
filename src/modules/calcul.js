const calcul = () => {
    try{
        console.log('подключение калькулятора');
        const accordion = document.getElementById('accordion');
        //переключение блоков
        const getBlocks = () => {
            accordion.addEventListener('click', (ev)=> {
                ev.preventDefault();
                const target = ev.target,
                    openedEl = accordion.querySelector('.collapse.in'),
                        openBlock = openedEl.parentNode;
                if(target.innerText === 'Следующий шаг'){
                    const nextBlock = openBlock.nextElementSibling,
                        next = nextBlock.querySelector('.panel-collapse');
                    openedEl.classList.remove('in');
                    next.classList.add('in');
                }
                if(target.closest('.panel-heading')){
                    const current = target.closest('.panel-heading');
                    if (openBlock.children[0] === current){
                        return;
                    } else {
                        openedEl.classList.remove('in');
                        current.parentNode.children[1].classList.add('in');
                    }
                }
            });
        };
        getBlocks();
        //работа калькулятора
        const calc = (price) => {
            const onoffswitch = document.querySelector('.onoffswitch'),
            onoffswitchSwitch = onoffswitch.querySelector('.onoffswitch-switch'),
            onoffswitchInner = onoffswitch.querySelector('.onoffswitch-inner'),
            blockTwo = document.getElementById('collapseTwo'),
            secondSump = document.getElementById('second');

            let camera,
                diametr,
                rings,
                buttom;
            //количество камер          
            onoffswitch.addEventListener('click', (ev)=>{
                if(onoffswitchSwitch.style.right === '' || onoffswitchSwitch.style.right === '0px'){
                    onoffswitchSwitch.style.right = '82px';
                    secondSump.classList.add('hidden');
                    secondSump.style.display = 'none';
                } else {
                    onoffswitchSwitch.style.right = '0px';
                    secondSump.classList.remove('hidden');
                    secondSump.style.display = 'block';
                }
            });
            
            const stBef = getComputedStyle(onoffswitchInner, '::before');
            if(stBef.content === 'Одно'){
                camera = 1;
            }
            //Калькулятор
            const count = (price = 10000) => {
                const infoRings = blockTwo.querySelectorAll('select'),
                calcResult = document.getElementById('calc-result'),
                incomeData = document.getElementById('collapseTwo'),
                selectBoxes = incomeData.querySelectorAll('.select-box'),
                diaFst = selectBoxes[0],
                diaSnd = selectBoxes[2],
                ringsFst = selectBoxes[1],
                ringsSnd = selectBoxes[3],
                nextStepBtn = incomeData.querySelector('.construct-btn');
                //получить все поля ввода и результатное поле

                const doCount = () => {
                    let total = 0,
                        diaMarkup = 1,
                        ringsMarkup = 1;
                    //Учитываем диаметр
                    if (window.getComputedStyle(secondSump).display === 'none'){
                        if (diaFst.children[1].value === '2 метра'){
                            diaMarkup = 1.2;
                        } else {
                            diaMarkup = 1;
                        }
                    } else if (window.getComputedStyle(secondSump).display === 'block') {
                        if (diaSnd.children[1].value === '2 метра'){
                            diaMarkup = 1.8;
                        } else {
                            diaMarkup = 1.5; 
                        }
                    } 
                    //Учитываем количество колец
                    if (window.getComputedStyle(secondSump).display === 'none'){
                        if (ringsFst.children[1].value === '2 штуки'){
                            ringsMarkup = 1.3;
                        } else if (ringsFst.children[1].value === '3 штуки'){
                            ringsMarkup = 1.5;
                        }
                    } else if (window.getComputedStyle(secondSump).display === 'block') {
                        if (ringsSnd.children[1].value === '2 штуки'){
                            ringsMarkup = 1.3;
                        } else if (ringsSnd.children[1].value === '3 штуки'){
                            ringsMarkup = 1.5;
                        }
                    }
                    
                    total = price * diaMarkup * ringsMarkup;
                    calcResult.value = Math.ceil(total);
                };
                //Расчет по индивидуальным параметрам
                incomeData.addEventListener('change', (ev) => {
                    let target = ev.target;
                    target = target.closest('.form-control');
                    if (target) {
                        doCount(calcResult);
                    } 
                });
                //Расчет без изменения данных
                nextStepBtn.addEventListener('click', (ev) => {
                    if (ev.target){
                        if(calcResult.value === ''){
                            doCount(calcResult);
                        }
                    }
                });
                //Запуск расчета при изменениях
                accordion.addEventListener('click', (ev) => {
                    const target = ev.target;
                    if (calcResult.value !== ''){
                        if (target === onoffswitchSwitch){ //если вернулись к кольцам
                            doCount(calcResult);
                        }
                        console.log(target.classList.contains('onoffswitch-switch'));
                    }
                });

            };
            count(10000);

        };
        calc();

    }catch(e){
        console.warn(e);
    }

};
export default calcul;