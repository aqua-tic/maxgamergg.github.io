
document.addEventListener('DOMContentLoaded', () => {

    const defaultDisplayTime = 2000;
    const animationTime = 500;

    function initWordChanger(container) {
        const wordSpan = container.querySelector('.word-item');
        if (!wordSpan) return;

        let words = [];
        try {
            words = JSON.parse(container.dataset.words || '[]');
        } catch (e) {
            console.error("Fehler beim Parsen von data-words:", container.dataset.words, e);
            return;
        }

        if (words.length < 2) return;

        let currentIndex = 0;
        const displayTime = parseInt(container.dataset.displayTime) || defaultDisplayTime;

        function setContainerWidth() {
             setTimeout(() => {
                 if (wordSpan.offsetWidth > 0) {
                    container.style.width = wordSpan.offsetWidth + 'px';
                 } else {
                    setTimeout(setContainerWidth, 150);
                 }
             }, 50);
        }
        setContainerWidth();

        function switchWord() {
            const nextIndex = (currentIndex + 1) % words.length;
            const nextWord = words[nextIndex];

            const slideOutClass = (currentIndex % 2 === 0) ? 'slide-out-up' : 'slide-out-down';
            const slideInClassStart = (currentIndex % 2 === 0) ? 'slide-in-up-start' : 'slide-in-down-start';

            wordSpan.classList.add(slideOutClass);

            setTimeout(() => {

                wordSpan.textContent = nextWord;


                const newWidth = wordSpan.offsetWidth;
                container.style.width = newWidth + 'px';

                
                wordSpan.classList.remove(slideOutClass);
                wordSpan.classList.add(slideInClassStart);

                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        wordSpan.classList.remove(slideInClassStart);
                    });
                });

                currentIndex = nextIndex;
                setTimeout(switchWord, displayTime);

            }, animationTime);
        }

        setTimeout(switchWord, displayTime);
    }

    const wordChangers = document.querySelectorAll('.animated-word-container');
    wordChangers.forEach(initWordChanger);

});