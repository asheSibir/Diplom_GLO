const showMore = () => {
    try {
        const more = document.querySelector('.add-sentence-btn'),
        specialOffers = document.querySelectorAll('.shadow-block'),
        offerFourth = document.querySelector('.visible-sm-block'),
        level = document.querySelectorAll('.sentence-btn')[2],
        hideBtn = more.cloneNode(true);
        
        const animatedScroll = () => { //перемещение к открывшимся предложениям
            const posY = offerFourth.getBoundingClientRect().top + window.pageYOffset;
            let count = window.pageYOffset;
            let animation;
            const movePage = () => {
                animation = requestAnimationFrame(movePage);
                if (count < posY){
                    scrollTo(760, count);
                    count+= 10;
                }
            };
            animation = requestAnimationFrame(movePage);
            
        };
        const initShow = () => { //открытие блоков
            specialOffers.forEach(offer => {
                if (offer.parentNode.classList.contains('hidden')){ //для скрытых блоков
                    offer.parentNode.classList.remove('hidden');
                }
                if (window.outerWidth > 991 || window.outerWidth < 768){
                    offerFourth.classList.remove('visible-sm-block');
                }
            });
            animatedScroll();
            specialOffers[5].children[1].children[0].style.height = '90%'; //уменьшаем картинку (странность верстки)
            more.style.display = 'none'; //убираем кнопку "больше"
            specialOffers.insertAdjacentElement('beforeend', hideBtn);
        };
        more.addEventListener('click', (ev) => {
            ev.preventDefault();
            initShow();
        });
    } catch(e) {
        console.warn(e);
    }  
};
export default showMore;