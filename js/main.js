const musicContainer = document.getElementById('music-container')
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById("title");
const cover =  document.getElementById("cover")
const durTime = document.querySelector("#durTime");
const currTime = document.querySelector("#currTime");
const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');
const controlBtn = document.querySelector('.control-btn')
const skipBtns = document.querySelectorAll("[data-skip]");



const songs = [
    "Imagine Dragons - Sharks",
    "Lana Del Rey - High By The Beach",
    "The Weeknd - Save Your Tears"
];
let songIndex = 1;
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}
  
function play() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    audio.play();
}

function pause() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}
playBtn.addEventListener("click", () => {
    let isPlaying = musicContainer.classList.contains("play");
    isPlaying ? pause() : play();
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    play();
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    play()
}
audio.addEventListener("timeupdate", updateProgress)

function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
audio.addEventListener("ended", nextSong);

audio.addEventListener('timeupdate', setTime);

function setTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');

    const audioTime = `${minuteValue}:${secondValue}`;
    timer.textContent = audioTime;

    const barLength = timerWrapper.clientWidth * (audio.currentTime / audio.duration);
    timerBar.style.width = `${barLength}px`;
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  skipBtns.forEach((btn) => {
    btn.addEventListener("click", handleSkip);
  });
  
  function handleSkip() {
    audio.currentTime += Number(this.dataset.skip);
  }
