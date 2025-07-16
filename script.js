const flipCards = document.querySelectorAll('.flip-card .container');
let countflip = 0;
let showflips = document.querySelectorAll('.flip')
let victory = 0
const victoryspot = document.querySelector('.abs')
const victoire = document.querySelector('.victoire')
victorytext = document.querySelector('.victoire h1')
const replay = document.querySelector('.abs div.replay')
let startTime;
let timerInterval;
const timer = document.querySelector('#timer')
let soundOn = true
const mute = document.querySelector('#mute')

mute.addEventListener('click', ()=>{
    if(soundOn){
        soundOn = false
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>'
    }else{
        soundOn = true
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160 64 160c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l67.8 0L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448l0-384z"/></svg>'
    }
})

const playSound = (soundName)=>{
    if(!soundOn) return;

    const son = new Audio('sound_effect/'+soundName+'.mp3')
    son.play()
}

if(!('bestTime' in localStorage)){
        localStorage.setItem('bestTime', '01:30')
    }
let bestTime = localStorage.getItem('bestTime')
const btime = document.querySelector('.btime')
btime.textContent = bestTime
const startTimer = ()=>{
    startTime = Date.now()
    timerInterval = setInterval(updateTime, 1000);
}

const convertSec = (duree)=>{
    const [minutes, seconds] = duree.split(':').map(Number)
    return minutes * 60 + seconds
}

const updateTime = ()=>{
    const now = Date.now()
    const time = Math.floor((now - startTime) / 1000)

    const min = Math.floor(time / 60)
    const sec = time % 60

    const formMin = min.toString().padStart(2,'0')
    const formSec = sec.toString().padStart(2,'0')

    timer.textContent = `${formMin}:${formSec}`
}

document.addEventListener('DOMContentLoaded', () => {
    
    console.log(bestTime)

    startTimer()

    const flipCards = document.querySelectorAll('.flip-card');

    // Étape 1 : créer une liste de paires [1,1,2,2,...,8,8]
    const values = [];
    for (let i = 1; i <= 10; i++) {
        values.push('img'+i+'.png');
        values.push('img'+i+'.png');
    }

    // Étape 2 : mélanger cette liste
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    // Étape 3 : attribuer chaque valeur aléatoire à une carte
    flipCards.forEach((card, index) => {
        const back = card.querySelector('.back img');
        back.src = 'images/'+values[index];
    });
});

replay.addEventListener('click', ()=>{

    bestTime = localStorage.getItem('bestTime')
    console.log(bestTime)
    btime.textContent = bestTime

    const flipCards = document.querySelectorAll('.flip-card .container');

    flipCards.forEach(flipCard =>{
        flipCard.classList.remove('success')
    })
    setTimeout(()=>{
        // Étape 1 : créer une liste de paires [1,1,2,2,...,8,8]
        const values = [];
        for (let i = 1; i <= 10; i++) {
            values.push('img'+i+'.png');
            values.push('img'+i+'.png');
        }
    
        // Étape 2 : mélanger cette liste
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
    
        // Étape 3 : attribuer chaque valeur aléatoire à une carte
        flipCards.forEach((card, index) => {
            const back = card.querySelector('.back img');
            back.src = 'images/'+values[index];
        });
    }, 150)

    victory = 0;
    victoryspot.style.transform = 'translate(0, -100%)'

    startTimer();

})

flipCards.forEach(flipCard => {
    flipCard.addEventListener('click', () => {
        if (countflip < 2 && !flipCard.classList.contains('flip')) {
            flipCard.classList.toggle('flip');
            playSound('card_flip')
            countflip++;
            console.log('Count:', countflip);

            if (countflip === 2) {

                setTimeout(() => {
                    const showflips = document.querySelectorAll('.flip');
                    console.log('Deux cartes retournées :', showflips[0].querySelector('img').src);
                    if(showflips[0].querySelector('img').src === showflips[1].querySelector('img').src) {
                        showflips.forEach(showflip=>{
                            showflip.classList.toggle('flip');
                            playSound('correct');
                            showflip.classList.toggle('success')
                        })
                        victory++
                        console.log(victory)
                    }else{
                        showflips.forEach(showflip=>{
                            playSound('error');
                            showflip.classList.toggle('flip')
                        })
                    }

                    if(victory === 10){
                        setTimeout(() => {
                            victoryspot.style.transform = 'translate(0, 0)'
                        }, 500)
                        clearInterval(timerInterval)
                        let newTime = timer.textContent
                        console.log(newTime)
                        if(convertSec(newTime) < convertSec(bestTime)){
                            localStorage.setItem('bestTime', newTime)
                            playSound('new_record');
                            victorytext.textContent = 'Nouveau record !'
                            victorytext.style.color = 'goldenrod'
                            victoire.style.borderColor = 'goldenrod'


                        }else{
                            playSound('victory');
                            victorytext.textContent = 'Victoire !!!'
                            victorytext.style.color = 'green'
                            victoire.style.borderColor = 'green'
                        }

                    }

                    countflip = 0;
                }, 1000);
            }
        }
    });
});


