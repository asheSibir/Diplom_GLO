const putInStorage = () => {
    try{
        const cameraSpan = document.getElementById('cameraSpan'),
            bottomExist = document.getElementById('bottomExist'),
            formControls = document.querySelectorAll('.form-control'),
            onoffswitchSwitch = document.querySelectorAll('.onoffswitch-switch');
        document.addEventListener('change', (ev) => {
            if (ev.target.matches('[name="user_quest"]')){
                sessionStorage.userQuest = encodeURI(ev.target.value);
            }
        });
        document.addEventListener('click', (ev) => {
            onoffswitchSwitch.forEach((indic, ind) => {
                if (indic !== ev.target){
                    return;
                } else {
                    switch (ind) {
                        case 0:
                            sessionStorage.qtySump = encodeURI(cameraSpan.innerText);
                            break;
                        case 1:
                            sessionStorage.qtyRings = encodeURI(bottomExist.innerText);
                            break;
                        default:
                            console.warn('Как-то не так...');
                    }
                }
            });
            formControls.forEach((select, ind) => {
                if (select !== ev.target){
                    return;
                } else {
                    switch (ind) {
                        case 0:
                            sessionStorage.fstDia = encodeURI(select.value);
                            break;
                        case 1:
                            sessionStorage.fstRings = encodeURI(select.value);
                            break;
                        case 2:
                            sessionStorage.sndDia = encodeURI(select.value);
                            break;
                        case 3:
                            sessionStorage.sndRings = encodeURI(select.value);
                            break;
                        default:
                            console.warn('Как-то не так...');
                    };
                }
            });
        });

    } catch(e) {
        console.warn(e);
    }
};
export default putInStorage;