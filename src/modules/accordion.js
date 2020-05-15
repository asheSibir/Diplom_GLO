const moveAccordion = () => {
    try{
        const accordionTwo = document.getElementById('accordion-two');
        
        accordionTwo.addEventListener('click', (ev) => {
            ev.preventDefault();
            let target = ev.target;
            target = target.closest('.panel-default');
            const openedEl = accordionTwo.querySelector('.collapse.in');
            openedEl.classList.remove('in');
            openedEl.classList.add('collapse');
            target.children[1].classList.add('in');
        });

    } catch(e){
        console.warn(e);
    }

};
export default moveAccordion;