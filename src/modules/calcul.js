const calcul = () => {
    try{
        const accordion = document.getElementById('accordion'),
        collapseThree = document.getElementById('collapseThree'),
        calcResult = document.getElementById('calc-result'),
        constructor = document.querySelector('.constructor'),
        myonoffswitch = document.getElementById('myonoffswitch'),
        myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
        bottom = document.createElement('span'),
        qtyCam = document.createElement('span');

        
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
                if(!target.closest('.panel-three') || target.innerText === 'Следующий шаг'){
                    bottom.style.display = 'none'; 
                } else {
                    bottom.style.display = 'block';
                } 
                if(!target.closest('.panel-one') || target.innerText === 'Следующий шаг'){
                    qtyCam.style.display = 'none';
                } else {
                    qtyCam.style.display = 'block';
                }
                
            });
        };
        getBlocks();
        //Работа калькулятора
        //Анимация
        const aliveRes = () => {
            const target = calcResult.value,
            digits = target.toString().length,
            bottomExist = document.getElementById('bottomExist');
            let val = 0;
            let updTarget;
                let animTarget = () => {
                    updTarget = requestAnimationFrame(animTarget);
                    calcResult.value = val;
                    if (val < target){
                        val += digits * 100;
                    }
                };
            updTarget = requestAnimationFrame(animTarget);
        };

        const calc = (price) => {
            const onoffswitch = document.querySelector('.onoffswitch'),
            onoffswitchSwitch = onoffswitch.querySelector('.onoffswitch-switch'),
            onoffswitchInner = onoffswitch.querySelector('.onoffswitch-inner'),
            blockTwo = document.getElementById('collapseTwo'),
            secondSump = document.getElementById('second');
            secondSump.style.display = 'block';

            //Работа бегунка
            const moveEl = (el, inPos, nextPos) => {
                if (el.style.right === '' || el.style.right === `${inPos}%`){
                    el.style.right = `${nextPos}%`;
                } else if (el.style.right === `${nextPos}%`){
                    el.style.right = `${inPos}%`;
                }
            };

            //Количество колодцев    
            accordion.children[0].insertAdjacentElement('beforeend', qtyCam);
            qtyCam.id = 'cameraSpan';
            qtyCam.textContent = 'Двух';
            qtyCam.classList.add('green-label');
            qtyCam.style.cssText = `
            top: 22%;
            left: 42%;
            `;
            //Выбор количества колодцев
            onoffswitch.addEventListener('click', (ev)=>{
                moveEl(onoffswitchSwitch, 0, 67);
                if(onoffswitchSwitch.style.right === '67%'){
                    secondSump.classList.add('hidden');
                    qtyCam.textContent = 'Одно';
                    qtyCam.style.left = '48%';
                    myonoffswitch.removeAttribute('checked');
                    
                } else {
                    onoffswitchSwitch.style.right = '0%';
                    secondSump.classList.remove('hidden');
                    qtyCam.textContent = 'Двух';
                    qtyCam.style.left = '42%';
                    myonoffswitch.setAttribute('checked', 'true');
                }
                
            });
            
            //Указываем днище
            accordion.children[2].insertAdjacentElement('beforeend', bottom);
            bottom.id = 'bottomExist';
            bottom.classList.add('green-label');
            bottom.style.cssText = `
            display: none;
            margin-top: -19rem;
            margin-left: 5rem
            `;
            bottom.textContent = 'Есть';
            
            //Бегунок днища
            collapseThree.addEventListener('click', (ev) => {
                const indicator = collapseThree.querySelectorAll('span')[1];
                const target = ev.target;
                if(target === indicator){
                    moveEl(indicator, 0, 67);
                    if (indicator.style.right === '' || indicator.style.right === '0%'){
                        bottom.textContent = 'Есть';
                        bottom.style.marginLeft = '5rem';
                        myonoffswitchTwo.setAttribute('checked', 'checked');
                    } else {
                        bottom.textContent = 'Нет';
                        bottom.style.marginLeft = '8rem';
                        myonoffswitchTwo.removeAttribute('checked');
                        const extraDisc = document.createElement('p');

                    }
                }
            });
            //Калькулятор
            const count = (price = 10000) => {
                const infoRings = blockTwo.querySelectorAll('select'),
                incomeData = document.getElementById('collapseTwo'),
                selectBoxes = incomeData.querySelectorAll('.select-box'),
                diaFst = selectBoxes[0],
                diaSnd = selectBoxes[2],
                ringsFst = selectBoxes[1],
                ringsSnd = selectBoxes[3],
                nextStepBtn = incomeData.querySelector('.construct-btn');

                const doCount = () => {
                    let total = 0,
                        diaMarkup = 1,
                        ringsMarkup = 1,
                        bottomMarkup = 0;
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
                    //Учитываем днище
                    if (bottom.textContent === 'Есть'){
                        if (window.getComputedStyle(secondSump).display === 'none'){
                            bottomMarkup = 1000;
                        } else {
                            bottomMarkup = 2000;
                        }
                    }
                    
                    total = price * diaMarkup * ringsMarkup + bottomMarkup;
                    calcResult.value = Math.ceil(total);
                    constructor.addEventListener('change', (ev) => {
                        if (calcResult.value !== ''){
                            aliveRes();
                        }
                    });

                    
                };
                //Расчет по индивидуальным параметрам
                incomeData.addEventListener('change', (ev) => {
                    let target = ev.target;
                    if (target.closest('.form-control')) {
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
                        if (target === onoffswitchSwitch || //если вернулись к кольцам
                            target === collapseThree.querySelector('.onoffswitch-switch')){ //если вернулись к днищу
                            doCount(calcResult);
                        }
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