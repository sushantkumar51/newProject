let songIndex = 0;
let prevTime = 0;
let audioElement = new Audio('songs/1.mp3')
let gif = document.querySelector('#gif')
let songItem = document.querySelectorAll('.songItem')
let masterPlay = document.querySelector('#masterPlay')
let songItemPlay = document.querySelectorAll('.songItemPlay')
let myProgressBar = document.querySelector('#myProgressBar')
let currentSong = document.querySelector('.currentSong')

let songs = [
    {songName: 'Salam-e-Ishq 1', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: 'Salam-e-Ishq 2', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: 'Salam-e-Ishq 3', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: 'Salam-e-Ishq 4', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: 'Salam-e-Ishq 5', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: 'Salam-e-Ishq 6', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: 'Salam-e-Ishq 7', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: 'Salam-e-Ishq 8', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
    {songName: 'Salam-e-Ishq 9', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg'},
    {songName: 'Salam-e-Ishq 10', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg'},
]

songItem.forEach((element, i) => {
    element.querySelector('.songImg').src = songs[i].coverPath
    element.querySelector('.songName').textContent = songs[i].songName
})


const next = () => {
    if (songIndex >= 10) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        makeAllPlays();
        songItemPlay[songIndex -1].classList.remove('fa-circle-play')
        songItemPlay[songIndex -1].classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
}

const previous = () => {
    if (songIndex <= 1) {
        songIndex = 10;
    } else {
        songIndex -= 1;
    }
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        makeAllPlays();
        songItemPlay[songIndex -1].classList.remove('fa-circle-play')
        songItemPlay[songIndex -1].classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
}

const getTotalTime = (currTime, currDur) => {
    let cMin = Math.floor(currTime / 60)
    let cSec = Math.floor(currTime % 60)
    let dMin = Math.floor(currDur / 60)
    let dSec = Math.floor(currDur % 60)
    document.querySelector('.currentTime').textContent = `${cMin}:${cSec}`
    document.querySelector('.currentDuration').textContent = `${dMin}:${dSec}`
}


const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

const displayCurrentSong = (index) => {
    currentSong.textContent = songs[index -1].songName
}

masterPlay.addEventListener('click', () => {
    if (songIndex == 0) {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            songItemPlay[0].classList.remove('fa-circle-play')
            songItemPlay[0].classList.add('fa-circle-pause')
            audioElement.play();
            gif.style.opacity = 1;
            songIndex = 1;
            displayCurrentSong(songIndex)         
        }         
    } else {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            songItemPlay[songIndex -1].classList.remove('fa-circle-play')
            songItemPlay[songIndex -1].classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex}.mp3`
            audioElement.currentTime = prevTime;
            audioElement.play();
            displayCurrentSong(songIndex)
            gif.style.opacity = 1;
        } else {
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            songItemPlay[songIndex -1].classList.remove('fa-circle-pause')
            songItemPlay[songIndex -1].classList.add('fa-circle-play')
            prevTime = audioElement.currentTime
            audioElement.pause();
            gif.style.opacity = 0;
        }
    }
})

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex = parseInt(e.target.id)
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex}.mp3`
            audioElement.currentTime = prevTime;
            audioElement.play();
            displayCurrentSong(songIndex)
            gif.style.opacity = 1;         
        } else {
            if (songIndex == e.target.id) {
                masterPlay.classList.remove('fa-circle-pause')
                masterPlay.classList.add('fa-circle-play')
                e.target.classList.remove('fa-circle-pause')
                e.target.classList.add('fa-circle-play')
                prevTime = audioElement.currentTime;
                audioElement.pause();
                gif.style.opacity = 0;
            } else {
                masterPlay.classList.remove('fa-circle-play')
                masterPlay.classList.add('fa-circle-pause')
                e.target.classList.remove('fa-circle-play')
                e.target.classList.add('fa-circle-pause')
                songIndex = parseInt(e.target.id)
                audioElement.src = `songs/${songIndex}.mp3`
                audioElement.currentTime = 0;
                audioElement.play();
                displayCurrentSong(songIndex)
                gif.style.opacity = 1;
            }       
        } 
    })
})

document.querySelector('#next').addEventListener('click', next)

document.querySelector('#previous').addEventListener('click', previous)

audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = parseInt((audioElement.currentTime/audioElement.duration) * 100)
    getTotalTime(audioElement.currentTime, audioElement.duration)
    if (audioElement.currentTime == audioElement.duration) {
        next()
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = parseInt((myProgressBar.value * audioElement.duration) / 100)
})