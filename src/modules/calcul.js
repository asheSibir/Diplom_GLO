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
            const result = document.getElementById('calc-result'),
            onoffswitch = document.querySelector('.onoffswitch'),
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
                    secondSump.style.display = 'none';
                } else {
                    onoffswitchSwitch.style.right = '0px';
                    secondSump.style.display = 'block';
                }
            });
            
            const stBef = getComputedStyle(onoffswitchInner, '::before');
            if(stBef.content === 'Одно'){
                camera = 1;
            }
            //Кольца
            const getRingPrice = () => {
                const infoRings = blockTwo.querySelectorAll('select');
                let factor;
                
                infoRings.forEach((select, ind) => {
                    select.addEventListener('change', (ev) => {
                        const value = select.value;
                        if(ind === 0){
                            sessionStorage.diaFst = encodeURI(value.replace(/\D*/g, ''));
                        }
                        if(ind === 1){
                            sessionStorage.qtyFst = encodeURI(value.replace(/\D*/g, ''));
                        }
                        if(ind === 2){
                            sessionStorage.diaSec = encodeURI(value.replace(/\D*/g, ''));
                        }
                        if(ind === 3){
                            sessionStorage.qtySec = encodeURI(value.replace(/\D*/g, ''));
                        }
                    });
                });

                let diaFst = decodeURI(sessionStorage.diaFst),
                    qtyFst = decodeURI(sessionStorage.qtyFst),
                    diaSec = decodeURI(sessionStorage.diaSec),
                    qtySec = decodeURI(sessionStorage.qtySec);
                
                    console.log(diaFst, qtyFst, diaSec, qtySec);

                factor = 1;
                console.log(decodeURI(sessionStorage.diaFst));
                return factor;
            };
            rings = getRingPrice();
            console.log(rings);

            result.value = price * camera;
        };
        calc(10000);

    }catch(e){
        console.warn(e);
    }

};
export default calcul;